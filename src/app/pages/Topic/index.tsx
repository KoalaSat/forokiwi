import { NDKEvent, NDKRelaySet, NDKUserProfile, filterForEventsTaggingId, profileFromEvent } from "@nostr-dev-kit/ndk";
import PersonIcon from '@mui/icons-material/Person';
import FavoriteIcon from '@mui/icons-material/Favorite';
import SmsIcon from '@mui/icons-material/Sms';
import CommentIcon from '@mui/icons-material/Comment';
import { Avatar, Breadcrumb, Button, Col, Divider, Row, Skeleton, Typography, theme } from "antd";
import Layout, { Content } from "antd/es/layout/layout"
import { UseNostrStoreType, NostrContext } from "app/contexts/NostrContext";
import { fromUnixTime, formatDistanceToNow } from "date-fns";
import { useContext, useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useNavigate, useParams } from "react-router-dom";
import { Markdown } from "app/components/Markdown";
import TextArea from "antd/es/input/TextArea";
import { ActiveUser } from "app/components/ActiveUser";
import { ForumsButtons } from "app/components/ForumsButtons";
import { AppContext, UseAppStoreType } from "app/contexts/AppContext";
import { nip19 } from "nostr-tools";

const { Title, Text, Link } = Typography;

export const Topic: () => JSX.Element = () => {
  const { turtleMode } = useContext<UseAppStoreType>(AppContext);
  const { ndk, authors, saveAuthors, reactions, saveReactions, comments, saveComments, topics, saveTopics, forums, saveForums, getBaseRelays } = useContext<UseNostrStoreType>(NostrContext);
  const { naddr } = useParams();
  const navigate = useNavigate();
  const { t } = useTranslation()
  const {
    token: { colorBgContainer, borderRadiusLG, colorPrimary, colorBgLayout, colorTextSecondary, colorSuccess },
  } = theme.useToken();
  const [forumEvent, setForumEvent] = useState<NDKEvent>()
  const [topicEvent, setTopicEvent] = useState<NDKEvent>()
  const [rootAuthor, setRootAuthor] = useState<NDKUserProfile | null>()

  const [creatingComment, setCreatingComment] = useState<boolean>(false)
  const [loadingAuthors, setLoadingAuthors] = useState<boolean>(true)
  const [loadingComments, setLoadingComments] = useState<boolean>(true)
  const [loadingReactions, setLoadingReactions] = useState<boolean>(true)

  const [liking, setLiking] = useState<boolean>(false)
  const [content, setContent] = useState<string>()
  const [replyTo, setReplyTo] = useState<NDKEvent>()

  useEffect(() => {
    if (naddr) {
      if (topics[naddr]) {
        const pubkey = topics[naddr].pubkey
        setTopicEvent(topics[naddr])
        if (authors[pubkey]) setRootAuthor(authors[pubkey])
      }
      ndk.fetchEvent(naddr, { closeOnEose: true }, getForumRelaySet()).then((event) => {
        if (event) {
          setTopicEvent(event)
          if (event.dTag) saveTopics({ [event.dTag]: event })
          const mainReference = event.tags.find(t => t[0] === 'a' && t[1].startsWith('34550:'))
          const mainDTag = mainReference?.[1].split(':')?.[2]
          if (mainDTag) {
            if (forums[mainDTag]) setForumEvent(forums[mainDTag])
            ndk.fetchEvents({ '#d': [mainDTag] }, { closeOnEose: true }, getForumRelaySet()).then((e) => {
              const fEvent = [...e][0]
              if (fEvent) {
                setForumEvent(fEvent)
                saveForums({ [fEvent.encode()]: fEvent, [mainDTag]: fEvent })
              } else {
                setForumEvent(new NDKEvent())
              }
            })
          } else {
            setForumEvent(new NDKEvent())
          }
        } else {
          setForumEvent(new NDKEvent())
        }
      })
      const filters = filterForEventsTaggingId(naddr)
      const dTag = filters?.['#a']?.[0].split(':')[2]

      const kinds = [1]
      if (!turtleMode) kinds.push(7)

      if (dTag) {
        ndk.fetchEvents({ ...filters, kinds }, {}, getForumRelaySet()).then((eventsList) => {
          const commList: NDKEvent[] = []
          const reactList: NDKEvent[] = []
          eventsList.forEach((event) => {
            switch (event.kind) {
              case 1:
                commList.push(event)
                break;
              case 7:
                reactList.push(event)
                break;
              default:
                break;
            }
          })
          ndk
            .fetchEvents({ kinds: [0], authors: commList.map((c) => c.pubkey) }, { closeOnEose: true }, getForumRelaySet())
            .then((eventsList) => {
              const list = {}
              eventsList.forEach((event) => {
                list[event.pubkey] = profileFromEvent(event)
              })
              saveAuthors(list)
              setLoadingAuthors(false)
            })
          saveComments({ [dTag]: commList })
          saveReactions({ [dTag]: reactList })
          setLoadingReactions(false)
          setLoadingComments(false)
        })
      }
    }

    return () => {
      setTopicEvent(undefined)
    }
  }, [])

  useEffect(() => {
    if (topicEvent) {
      const dTag = topicEvent.dTag?.toString()
      if (dTag) {
        setLoadingAuthors(true)
        const list = [...topicEvent.getMatchingTags("p").map(t => t[1]), topicEvent.pubkey]
        ndk
          .fetchEvents({ kinds: [0], authors: list }, { closeOnEose: true }, getForumRelaySet())
          .then((eventsList) => {
            const list = {}
            eventsList.forEach((event) => {
              list[event.pubkey] = profileFromEvent(event)
              if (list[event.pubkey]) setRootAuthor(list[event.pubkey])
            })
            saveAuthors(list)
            setLoadingAuthors(false)
          })
      }
    }
  }, [topicEvent])

  const likeTopicEvent = (): void => {
    setLiking(true)
    const dTag = topicEvent?.dTag
    const alreadyLiked = reactions?.[topicEvent?.dTag ?? '']?.find(reaction => reaction.pubkey === ndk.activeUser?.pubkey)
    if (dTag && !alreadyLiked) {
      topicEvent
        .react('+', true)
        .then((reaction) => {
          if (reaction) saveReactions({ [dTag]: [reaction] })
          setLiking(false)
        })
    } else {
      setLiking(false)
    }
  }

  const getForumRelaySet = (): NDKRelaySet => {
    let relays: string[] = getBaseRelays()

    if (forumEvent) forumEvent.onRelays.forEach(r => relays.push(r.url))
    if (naddr) {
      const ref = nip19.decode(naddr)
      // @ts-expect-error
      relays = [...relays, ...ref.data?.relays ?? []]
    }

    return NDKRelaySet.fromRelayUrls(relays, ndk, true)
  }

  const createComment = async (): Promise<void> => {
    setCreatingComment(true)
    const dTag = topicEvent?.dTag
    if (topicEvent && dTag && naddr && content && content !== '') {
      const newComment = new NDKEvent(ndk)
      newComment.kind = 1
      newComment.content = content

      newComment.tags.push(topicEvent.tagReference())
      topicEvent.tags.forEach((t) => {
        if (t[0] === 'a') newComment.tags.push(t)
      })

      if (forumEvent?.kind) newComment.tags.push(['a', forumEvent.tagReference()[1]])
      if (replyTo) replyTo.referenceTags().forEach((t) => newComment.tags.push(t))

      newComment
        .publish(getForumRelaySet())
        .then((result) => {
          if (result) {
            saveComments({ [dTag]: [newComment] })
          }
          setReplyTo(undefined)
          setContent('')
        })
        .finally(() => setCreatingComment(false))
    } else {
      setCreatingComment(false)
    }
  }

  return (
    <Content>
      <Row justify='space-between'>
        <Col xs={24} md={16}>
          <Row gutter={[0, 10]} >
            <Col span={24}>
              <Row>
                <Breadcrumb
                  items={[
                    {
                      title: <a>Home</a>,
                      onClick: () => navigate('/')
                    },
                    {
                      title: forumEvent ? <a>{forumEvent?.tagValue("name") ?? forumEvent?.tagValue("d") ?? 'All'}</a> : <Skeleton paragraph={{ rows: 1, width: 55, style: { marginTop: 0 } }} title={false} />,
                      onClick: () => navigate(`/forum/${forumEvent?.kind ? forumEvent.encode() : 'all'}`)
                    },
                    {
                      title: topicEvent?.tagValue("title") ?? topicEvent?.tagValue("d") ?? <Skeleton paragraph={{ rows: 1, width: 55, style: { marginTop: 0 } }} title={false} />,
                    },
                  ]}
                />
              </Row>
            </Col>
            <Col span='24'>
              <Layout
                style={{ background: colorBgContainer, borderTopLeftRadius: borderRadiusLG, borderTopRightRadius: borderRadiusLG, paddingBottom: 15 }}
              >
                <Row justify='space-around'>
                  <Col span='22'>
                    <Skeleton active loading={!topicEvent} paragraph={{ rows: 0 }} style={{ marginTop: 34 }} >
                      <Title>{topicEvent?.tagValue("title")}</Title>
                    </Skeleton>
                  </Col>
                </Row>
              </Layout>
            </Col>
            <Col span='24'>
              {/* MAIN */}
              <Layout
                style={{ padding: '15px 0', background: colorBgContainer, borderLeftColor: colorPrimary, borderLeftWidth: 5, borderLeftStyle: 'solid' }}
              >
                <Row justify='space-around'>
                  <Col span='22'>
                    <Row>
                      <Col style={{ width: 80 }}>
                        <Avatar size={64} src={rootAuthor?.image} icon={!rootAuthor?.image && <PersonIcon style={{ fontSize: '45px' }} />} alt={rootAuthor?.displayName ?? rootAuthor?.name ?? t("shared.events.anonymous")} />
                      </Col>
                      <Col style={{ width: 'calc(100% - 80px)' }}>
                        <Row justify='start'>
                          <Col span={24}>
                            <Row justify='space-between'>
                              <Skeleton active loading={!rootAuthor === undefined} paragraph={{ rows: 1, width: 100 }} style={{ marginTop: -10, marginBottom: -9, width: 100 }} title={false}>
                                <Link strong href={`https://njump.me/${topicEvent?.author.npub}`} target="_blank">
                                  {rootAuthor?.displayName ?? rootAuthor?.name ?? t("shared.events.anonymous")}
                                </Link>
                              </Skeleton>
                              <Skeleton active loading={!topicEvent} paragraph={{ rows: 1, width: 100 }} style={{ marginTop: -10, marginBottom: -9, width: 100 }} title={false}>
                                <Text strong>{t("shared.events.published_at", { date: formatDistanceToNow(fromUnixTime(parseInt(topicEvent?.tagValue("published_at") ?? topicEvent?.created_at?.toString() ?? "0", 10)), { addSuffix: true }) })}</Text>
                              </Skeleton>
                            </Row>
                          </Col>
                        </Row>
                      </Col>
                    </Row>
                    <Divider />
                    <Row>
                      <Col span={24}>
                        <Skeleton active loading={!topicEvent} paragraph={{ rows: 6 }} title={false}>
                          <Markdown text={topicEvent?.content ?? ''} loadingAuthors={loadingAuthors} dTag={topicEvent?.dTag} />
                        </Skeleton>
                      </Col>
                    </Row>
                    <Divider />
                    <Row>
                      <Col span={24}>
                        <Row justify="end">
                          {!turtleMode && (
                            <Col style={{ width: 63, marginRight: 16 }}>
                              <Text type="secondary">
                                <Skeleton active loading={!reactions?.[topicEvent?.dTag ?? ''] && loadingReactions} paragraph={{ rows: 1, width: 55 }} title={false}>
                                  <Row justify="space-between">
                                    <Button
                                      icon={
                                        <FavoriteIcon color={reactions?.[topicEvent?.dTag ?? '']?.find(reaction => reaction.pubkey === ndk.activeUser?.pubkey) ? 'error' : 'inherit'} />
                                      }
                                      loading={liking}
                                      onClick={() => likeTopicEvent()}
                                    >
                                      {reactions?.[topicEvent?.dTag ?? '']?.length ?? 0}
                                    </Button>
                                  </Row>
                                </Skeleton>
                              </Text>
                            </Col>
                          )}
                          <Col style={{ width: 63, marginLeft: 16 }}>
                            <Text type="secondary">
                              <Skeleton active loading={!comments?.[topicEvent?.dTag ?? ''] && loadingComments} paragraph={{ rows: 1, width: 55 }} title={false}>
                                <Row justify="space-between">
                                  <Button
                                    icon={
                                      <SmsIcon color={comments?.[topicEvent?.dTag ?? '']?.find(comment => comment.pubkey === ndk.activeUser?.pubkey) ? 'success' : 'inherit'} />
                                    }
                                  >
                                    {comments?.[topicEvent?.dTag ?? '']?.length ?? 0}
                                  </Button>
                                </Row>
                              </Skeleton>
                            </Text>
                          </Col>
                        </Row>
                      </Col>
                    </Row>
                  </Col>
                </Row>
              </Layout>
            </Col>
            <Col span='24'>
              {/* COMMENT */}
              {!comments[topicEvent?.dTag ?? ''] && loadingComments ? (
                <></>
              ) : (
                <Row gutter={[0, 10]} >
                  {comments[topicEvent?.dTag ?? '']?.map((comment, i) => {
                    const author = authors[comment.pubkey]
                    const name = author?.displayName ?? author?.name ?? t("shared.events.anonymous")
                    const refrences = comment.getMatchingTags("e")
                    const replyId = refrences[refrences.length - 1]?.[1]
                    const reply = replyId !== topicEvent?.id ? comments[topicEvent?.dTag ?? ''].find(c => c.id === replyId) : null
                    return (
                      <Col span={24} key={i}>
                        <Layout
                          style={{ padding: '15px 0', background: colorBgContainer, borderLeftColor: colorSuccess, borderLeftWidth: comment.pubkey === ndk.activeUser?.pubkey ? 5 : 0, borderLeftStyle: 'solid' }}
                        >
                          <Row justify='space-around'>
                            <Col span='22'>
                              <Row>
                                <Col style={{ width: 80 }}>
                                  <Avatar size={64} src={author?.image} icon={!author?.image && <PersonIcon style={{ fontSize: '45px' }} />} alt={name} />
                                </Col>
                                <Col style={{ width: 'calc(100% - 80px)' }}>
                                  <Row justify='start'>
                                    <Col span={24}>
                                      <Row justify='space-between'>
                                        <Skeleton active loading={author === undefined && loadingAuthors} paragraph={{ rows: 1, width: 100 }} style={{ marginTop: -10, marginBottom: -9, width: 100 }} title={false}>
                                          <Link strong href={`https://njump.me/${comment?.author.npub}`} target="_blank">
                                            {name}
                                          </Link>
                                        </Skeleton>
                                        <Text strong>{t("shared.events.published_at", { date: formatDistanceToNow(fromUnixTime(comment.created_at ?? 0), { addSuffix: true }) })}</Text>
                                      </Row>
                                      <Row justify='end'>
                                        <Button type="link" onClick={() => setReplyTo(comment)}>{t("pages.topic.reply")}</Button>
                                      </Row>
                                    </Col>
                                  </Row>
                                </Col>
                              </Row>
                              <Divider />
                              <Row>
                                <Col span={24}>
                                  {reply && (
                                    <Layout style={{ background: colorBgLayout, padding: 25, marginBottom: 10, borderLeftColor: colorTextSecondary, borderLeftWidth: 5, borderLeftStyle: 'solid' }}>
                                      <Row>
                                        <Col>
                                          <Markdown text={reply.content} loadingAuthors={loadingAuthors} dTag={topicEvent?.dTag?.toString()} />
                                        </Col>
                                      </Row>
                                    </Layout>
                                  )}
                                  <Markdown text={comment.content ?? ''} loadingAuthors={loadingAuthors} dTag={topicEvent?.dTag?.toString()} />
                                </Col>
                              </Row>
                            </Col>
                          </Row>
                        </Layout>
                      </Col>
                    )
                  })}
                </Row>
              )}
            </Col>
            <Col span='24'>
              <Layout
                style={{ background: colorBgContainer, padding: '15px 0' }}
              >
                <Row justify='space-around' gutter={[0, 10]} >
                  <Col span='22'>
                    <Row>
                      {replyTo && (
                        <Layout style={{ background: colorBgLayout, padding: 25, marginBottom: 10, borderLeftColor: colorTextSecondary, borderLeftWidth: 5, borderLeftStyle: 'solid' }}>
                          <Row>
                            <Col>
                              <Markdown text={replyTo.content} loadingAuthors={loadingAuthors} dTag={topicEvent?.dTag} />
                            </Col>
                          </Row>
                          <Row justify="end">
                            <Col style={{ position: "relative" }}>
                              <Button type="link" onClick={() => setReplyTo(undefined)}>{t('pages.topic.removeReply')}</Button>
                            </Col>
                          </Row>
                        </Layout>
                      )}
                    </Row>
                  </Col>
                  <Col span='22'>
                    <Row>
                      <TextArea rows={6} content={content} onChange={(v) => setContent(v.target.value)} />
                    </Row>
                  </Col>
                  <Col span='22'>
                    <Row justify="end">
                      <Button loading={creatingComment} onClick={createComment} disabled={!content || content === ''} type="primary" htmlType="submit" size="large" icon={<CommentIcon />} iconPosition="end" >
                        {t('pages.topic.createComment')}
                      </Button>
                    </Row>
                  </Col>
                </Row>
              </Layout>
            </Col>
          </Row>
        </Col>
        <Col xs={0} md={7}>
          <Row gutter={[0, 10]} style={{ marginTop: 32 }}>
            <Col span={24}>
              <ActiveUser />
            </Col>
            <Col span={24}>
              <ForumsButtons />
            </Col>
          </Row>
        </Col>
      </Row>
    </Content>
  )
}
