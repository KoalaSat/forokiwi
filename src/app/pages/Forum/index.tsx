import { Avatar, Breadcrumb, Button, Col, Empty, Row, Skeleton, Table, TableColumnsType, Typography, theme } from "antd";
import SmsIcon from '@mui/icons-material/Sms';
import MailIcon from '@mui/icons-material/Mail';
import FavoriteIcon from '@mui/icons-material/Favorite';
import NoteAddIcon from '@mui/icons-material/NoteAdd';
import PeopleAltIcon from '@mui/icons-material/PeopleAlt';
import WhatshotIcon from '@mui/icons-material/Whatshot';
import AdminPanelSettingsIcon from '@mui/icons-material/AdminPanelSettings';
import Layout, { Content } from "antd/es/layout/layout"
import { useTranslation } from "react-i18next";
import { format, formatDistanceToNow, fromUnixTime } from "date-fns";
import { useNavigate, useParams } from "react-router-dom";
import { useContext, useEffect, useMemo, useState } from "react";
import { UseNostrStoreType, NostrContext } from "app/contexts/NostrContext";
import { NDKEvent, NDKFilter, NDKUser, filterForEventsTaggingId, profileFromEvent } from "@nostr-dev-kit/ndk";
import { ActiveUser } from "app/components/ActiveUser";
import { ForumsButtons } from "app/components/ForumsButtons";
import { AppContext, UseAppStoreType } from "app/contexts/AppContext";

const { Text, Title, Link } = Typography;

export const Forum: () => JSX.Element = () => {
  const { turtleMode } = useContext<UseAppStoreType>(AppContext);
  const { ndk, authors, saveAuthors, comments, saveComments, reactions, saveReactions, saveTopics, saveForums, forums } = useContext<UseNostrStoreType>(NostrContext);
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();
  const { naddr } = useParams();
  const { t } = useTranslation()
  const navigate = useNavigate();

  const [forumEvent, setForumEvent] = useState<NDKEvent>()
  const [title, setTitle] = useState<string>()
  const [description, setDescription] = useState<string>()
  const [topicEvents, setTopicEvents] = useState<Set<NDKEvent>>()

  const [hotRopics, setHotTopics] = useState<Set<NDKEvent>>()
  const [acceptedTopics, setAcceptedTopics] = useState<string[]>()
  const [isModerated, setIsModerated] = useState<boolean>(true)

  const [loadingPage, setLoadingPage] = useState<boolean>(true)
  const [loadingAuthors, setLoadingAuthors] = useState<boolean>(true)
  const [loadingComments, setLoadingComments] = useState<boolean>(true)
  const [loadingReactions, setLoadingReactions] = useState<boolean>(true)
  const [loadingHotTopics, setLoadingHotTopics] = useState<boolean>(true)
  const [loadingModerators, setLoadingModerators] = useState<boolean>(true)
  const [page, setPage] = useState<number>(1)
  const pageSize = 10

  const skeletonList = useMemo(() => new Array(10).fill(new NDKEvent()), [])

  const columns: TableColumnsType<NDKEvent> = [
    {
      dataIndex: 'content',
      render: (_text, record, i) => {
        const date = fromUnixTime(parseInt(record.tagValue("published_at") ?? record.created_at?.toString() ?? "0", 10));
        const relativeTime = formatDistanceToNow(date, { addSuffix: true });
        const profile = authors?.[record.pubkey]
        const loadingModerations = isModerated && !acceptedTopics
        return (
          <Col span={24}>
            <Row>
              <Col xs={0} md={3} style={{ maxWidth: 40 }}>
                <Row align="middle">
                  <MailIcon />
                </Row>
              </Col>
              <Col xs={24} md={21}>
                <Row>
                  <Col span={24}>
                    <Skeleton loading={(!record.tagValue("title") && !record.tagValue("d")) || loadingModerations} active paragraph={{ rows: 1, style: { margin: 0 } }} title={false} >
                      <Text strong>{record.tagValue("title") ?? record.tagValue("d") ?? '-'}</Text>
                    </Skeleton>
                  </Col>
                </Row>
                <Row>
                  <Col span={24}>
                    <Skeleton loading={loadingAuthors || loadingModerations} active paragraph={{ rows: 1, style: { margin: 0, marginTop: 8 } }} title={false} >
                      <Col xs={0} md={24}>
                        <Text type="secondary">
                          {`@${profile?.displayName ?? profile?.name ?? t("shared.events.anonymous")} - ${t("shared.events.published_at", { date: relativeTime })}`}
                        </Text>
                      </Col>
                      <Col xs={24} md={0}>
                        <Text type="secondary">
                          {`@${profile?.displayName ?? profile?.name ?? t("shared.events.anonymous")} - ${format(date, 'yy/MM/dd')}`}
                        </Text>
                      </Col>
                    </Skeleton>
                  </Col>
                </Row>
              </Col>
            </Row>
          </Col>

        )
      }
    },
    {
      dataIndex: 'likes',
      width: 15,
      render: (text, record, index) => {
        if (turtleMode) return <></>
        const loadingModerations = isModerated && !acceptedTopics
        return (
          <Row>
            <Col span={24}>
              <Row justify="center">
                <FavoriteIcon />
              </Row>
              <Row justify="center">
                <Skeleton loading={(!reactions[record?.dTag ?? ''] && loadingReactions) || loadingModerations} active paragraph={{ rows: 1, style: { margin: 0, marginTop: 6 }, width: 25 }} title={false} >
                  {reactions[record?.dTag ?? '']?.length ?? 0}
                </Skeleton>
              </Row>
            </Col>
          </Row>
        )
      },
    },
    {
      dataIndex: 'count',
      width: 15,
      render: (text, record, index) => {
        if (turtleMode) return <></>
        const loadingModerations = isModerated && !acceptedTopics
        return (
          <Row justify="space-between">
            <Col span={24}>
              <Row justify="center">
                <SmsIcon />
              </Row>
              <Row justify="center">
                <Skeleton loading={(!comments[record?.dTag ?? ''] && loadingComments) || loadingModerations} active paragraph={{ rows: 1, style: { margin: 0, marginTop: 6 }, width: 25 }} title={false} >
                  {comments[record?.dTag ?? '']?.length ?? 0}
                </Skeleton>
              </Row>
            </Col>
          </Row>
        )
      },
    },
  ]

  useEffect(() => {
    if (naddr && naddr !== 'all') {
      if (forums[naddr]) setForumEvent(forums[naddr])
      ndk.fetchEvent(naddr, { closeOnEose: true }).then((event) => {
        if (event?.dTag) {
          setForumEvent(event)
          saveForums({ [naddr]: event, [event.dTag]: event })
        }
      })
    }


    return () => {
      setForumEvent(undefined)
    }
  }, [])

  useEffect(() => {
    getTopicEvents()
  }, [page])

  useEffect(() => {
    if (forumEvent) {
      setTitle(forumEvent?.tagValue("name") ?? forumEvent.tagValue("d"))
      setDescription(forumEvent?.tagValue("description") ?? "")
      getLatestComments()
      getModerators()
    } else if (naddr === 'all') {
      setTitle(t("pages.forums.list.all.name"))
      setDescription(t("pages.forums.list.all.description"))
      setIsModerated(false)
    }
  }, [forumEvent])

  const getLatestComments = (): void => {
    if (turtleMode) return

    setLoadingHotTopics(true)
    if (forumEvent) {
      ndk.fetchEvents({ kinds: [1], '#a': [forumEvent.tagReference()[1]], limit: 10 }, { closeOnEose: true }).then((newEvents) => {
        const hotRopicsTags = [...newEvents].map(e => e.tags.find(t => t[0] === 'a' && t[1].startsWith('30023:')))
        const hotTopicD: string[] = hotRopicsTags.map(t => t?.[1].split(':')?.[2] ?? '')
        const uniqueDTags = Array.from(new Set(hotTopicD))
        ndk.fetchEvents({ kinds: [30023], '#d': uniqueDTags }).then((newEvents) => {
          setHotTopics(newEvents)
          setLoadingHotTopics(false)
          saveTopics([...newEvents].reduce((accumulator, event) => {
            if (event.dTag) accumulator[event.encode()] = event
            return accumulator;
          }, {}))
        })
      })
    } else {
      setLoadingHotTopics(false)
    }
  }

  const getTopicEvents = (): void => {
    setLoadingPage(true)
    setLoadingAuthors(true)
    setLoadingComments(true)
    setLoadingReactions(true)
    if (page * pageSize > (topicEvents?.size ?? 0)) {
      let filters: NDKFilter = { kinds: [30023], limit: pageSize }

      if (topicEvents) {
        const array = Array.from(topicEvents);
        const until = array[array.length - 1]?.created_at ?? 0
        filters.until = until + 1
      }

      if (naddr) filters = { ...filters, ...filterForEventsTaggingId(naddr) }

      ndk.fetchEvents(filters, { closeOnEose: true }).then((newEvents) => {
        setTopicEvents(events => new Set<NDKEvent>([...events ?? [], ...newEvents]))
        saveTopics([...newEvents].reduce((accumulator, event) => {
          if (event.dTag) accumulator[event.encode()] = event
          return accumulator;
        }, {}))
        getTopicEventsMeta(newEvents)
        setLoadingPage(false)
      })
        .catch(() => {
          setLoadingPage(false)
          setTopicEvents(new Set())
        })
    } else {
      setLoadingPage(false)
      setLoadingAuthors(false)
      setLoadingComments(false)
      setLoadingReactions(false)
    }
  }

  const getModerators = (): void => {
    if (forumEvent) {
      setLoadingModerators(true)
      const pets = forumEvent.getMatchingTags('p')
      if (pets.length > 0) {
        setIsModerated(true)
        const authors = pets.map(p => p[1])
        if (!turtleMode) {
          ndk
            .fetchEvents({ kinds: [0], authors }, { closeOnEose: true, groupable: true })
            .then((eventsList) => {
              const authors = {}
              eventsList.forEach((event) => {
                authors[event.pubkey] = profileFromEvent(event)
              })
              saveAuthors(authors)
              setLoadingModerators(false)
            })
        } else {
          setLoadingModerators(false)
        }
        ndk
          // @ts-expect-error
          .fetchEvents({ kinds: [4550], authors }, { closeOnEose: true })
          .then((eventsList) => {
            const eventIds: string[] = []
            if (eventsList) {
              [...eventsList].forEach(e => {
                // @ts-expect-error
                const aTag: string[] = e.getMatchingTags('a')
                if (aTag[1]) eventIds.push(aTag[1])
              })
            }
            setAcceptedTopics(eventIds)
          })
          .catch(() => setAcceptedTopics([]))
      } else {
        setIsModerated(false)
      }
    }
  }

  const getTopicEventsMeta = (events: Set<NDKEvent>): void => {
    const authors: string[] = []
    if (authors.length > 0) {
      ndk
        .fetchEvents({ kinds: [0], authors }, { closeOnEose: true, groupable: true })
        .then((eventsList) => {
          const authors = {}
          eventsList.forEach((event) => {
            authors[event.pubkey] = profileFromEvent(event)
          })
          saveAuthors(authors)
          setLoadingAuthors(false)
        })
    } else {
      setLoadingAuthors(false)
    }
    if (!turtleMode) {
      events.forEach(event => {
        const dTag = event.dTag?.toString()
        if (dTag) {
          ndk
            .fetchEvents({ kinds: [1, 7], "#a": [`30023:${event.pubkey}:${dTag}`] }, { groupable: true })
            .then((events) => {
              const commList: NDKEvent[] = []
              const reactList: NDKEvent[] = []
              events.forEach(event => {
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
              saveComments({ [dTag]: commList })
              saveReactions({ [dTag]: reactList })
              setLoadingReactions(false)
              setLoadingComments(false)
            })
        }
      })
    }
  }

  return (
    <Content>
      <Row justify='space-between' gutter={[0, 10]}>
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
                      title: title ?? <Skeleton paragraph={{ rows: 1, style: { marginTop: 0 } }} title={false} />,
                    },
                  ]}
                />
              </Row>
            </Col>
            <Col span='24'>
              <Layout
                style={{ background: colorBgContainer, borderTopLeftRadius: borderRadiusLG, borderTopRightRadius: borderRadiusLG, paddingBottom: 15 }}
              >
                <Row justify='space-between' align="middle">
                  <Col span='1' />
                  <Col span='16'>
                    <Skeleton active loading={!title && !description} paragraph={{ rows: 1 }} style={{ marginTop: 26 }} >
                      <Row>
                        <Title>{title}</Title>
                      </Row>
                      <Row>
                        <Text type="secondary">{description}</Text>
                      </Row>
                    </Skeleton>
                  </Col>
                  <Col xs={0} md={4}>
                    <Row justify="end">
                      <Button type="primary" htmlType="submit" size="large" icon={<NoteAddIcon />} iconPosition="end" onClick={() => navigate(`/forum/${naddr}/new`)}>

                        <Col xs={0} md={20}>
                          {t('pages.forum.createTopic')}
                        </Col>
                      </Button>
                    </Row>
                  </Col>
                  <Col span='1' />
                </Row>
              </Layout>
            </Col>
            <Col span='24'>
              <Layout
                style={{ background: colorBgContainer, borderRadius: borderRadiusLG }}
              >
                <Table
                  pagination={false}
                  columns={columns}
                  dataSource={loadingPage || (isModerated && !acceptedTopics)
                    ? skeletonList
                    : [...topicEvents ?? []]
                      .filter(e => !isModerated || acceptedTopics?.includes(e.dTag ?? ''))
                      .slice(((page - 1) * pageSize), page * pageSize)}
                  onRow={(record, _rowIndex) => {
                    return {
                      onClick: () => navigate(`/topic/${record.encode()}`)
                    };
                  }}
                />
              </Layout>
            </Col>
            <Col span='24'>
              <Row justify="space-between">
                <Button type="link" disabled={page < 2} onClick={() => setPage(p => p - 1)}>{t("shared.previous")}</Button>
                <Button type="link">{page}</Button>
                <Button type="link" disabled={(topicEvents?.size ?? Infinity) < page * pageSize} onClick={() => setPage(p => p + 1)}>{t("shared.next")}</Button>
              </Row>
            </Col>
          </Row>
        </Col>
        <Col xs={24} md={7}>
          <Row gutter={[0, 10]} style={{ marginTop: 32 }} >
            <Col xs={0} md={24}>
              <ActiveUser />
            </Col>
            <Col  xs={0} md={24}>
              <ForumsButtons />
            </Col>
            <Col span={24}>
              {!turtleMode && naddr !== 'all' && (
                <Layout
                  style={{ padding: '24px 0', background: colorBgContainer, borderRadius: borderRadiusLG }}
                >
                  <Row justify="space-around">
                    <Col span='16'>
                      <Title level={2}>
                        <WhatshotIcon />
                        {t('pages.forum.hotRopics')}
                      </Title>
                    </Col>
                  </Row>
                  <Row justify="space-around">
                    <Col span='16'>
                      <Skeleton active loading={loadingHotTopics} title={false} paragraph={{ rows: 5 }}>
                        {[...(hotRopics ?? [])].map((topic, i) => {
                          if (!topic.tagValue("title")) return <></>
                          return (
                            <Row key={i} justify='space-between' onClick={() => navigate(`/topic/${topic.encode()}`)}>
                              <Col style={{ overflow: 'hidden', whiteSpace: 'nowrap', textOverflow: 'ellipsis' }}>
                                <Link strong>
                                  {topic.tagValue("title") ?? topic.tagValue("d") ?? '-'}
                                </Link>
                              </Col>
                              <Col>
                                <Text>{formatDistanceToNow(fromUnixTime(parseInt(topic?.tagValue("published_at") ?? topic?.created_at?.toString() ?? "0", 10)), { addSuffix: true })}</Text>
                              </Col>
                            </Row>
                          )
                        })}
                        {hotRopics?.size === 0 ? <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} /> : <></>}
                      </Skeleton>
                    </Col>
                  </Row>
                </Layout>
              )}
            </Col>
            <Col span={24}>
              {!turtleMode && naddr !== 'all' && (
                <Layout
                  style={{ padding: '24px 0', background: colorBgContainer, borderRadius: borderRadiusLG }}
                >
                  <Row justify="space-around">
                    <Col span='16'>
                      <Title level={2}>
                        <AdminPanelSettingsIcon />
                        {t('pages.forum.moderators')}
                      </Title>
                    </Col>
                  </Row>
                  <Row justify="space-around">
                    <Col span='16'>
                      <Skeleton active loading={!forumEvent && loadingModerators} title={false} paragraph={{ rows: 3 }}>
                        {[...(forumEvent?.getMatchingTags('p') ?? [])].map((tag, i) => {
                          if (!tag[1]) return <></>

                          const profile = authors[tag[1]]
                          const author = new NDKUser({ hexpubkey: tag[1] })
                          return (
                            <Row key={i} justify='space-between'>
                              <Col style={{ overflow: 'hidden', whiteSpace: 'nowrap', textOverflow: 'ellipsis' }}>
                                <Avatar src={profile?.image} icon={<PeopleAltIcon style={{ fontSize: '20px' }} />} />
                                <Link strong href={`https://njump.me/${author.npub}`} target="_blank" style={{ marginLeft: 5 }}>
                                  {profile?.name ?? tag[1] ?? '-'}
                                </Link>
                              </Col>
                            </Row>
                          )
                        })}
                        {!isModerated ?
                          <Text strong style={{ marginLeft: 5 }}>
                            {t('pages.forum.noModerators')}
                          </Text>
                          : <></>}
                      </Skeleton>
                    </Col>
                  </Row>
                </Layout>
              )}
            </Col>
          </Row>
        </Col>
      </Row>
    </Content>
  )
}
