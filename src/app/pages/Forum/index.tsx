import { Breadcrumb, Button, Col, Empty, Row, Skeleton, Table, TableColumnsType, Typography, theme } from "antd";
import SmsIcon from '@mui/icons-material/Sms';
import MailIcon from '@mui/icons-material/Mail';
import FavoriteIcon from '@mui/icons-material/Favorite';
import NoteAddIcon from '@mui/icons-material/NoteAdd';
import WhatshotIcon from '@mui/icons-material/Whatshot';
import Layout, { Content } from "antd/es/layout/layout"
import { useTranslation } from "react-i18next";
import { formatDistanceToNow, fromUnixTime } from "date-fns";
import { useNavigate, useParams } from "react-router-dom";
import { useContext, useEffect, useMemo, useState } from "react";
import { UseNostrStoreType, NostrContext } from "app/contexts/NostrContext";
import { NDKEvent, NDKFilter, filterForEventsTaggingId, profileFromEvent } from "@nostr-dev-kit/ndk";
import { ActiveUser } from "app/components/ActiveUser";
import { ForumsButtons } from "app/components/ForumsButtons";

const { Text, Title } = Typography;

export const Forum: () => JSX.Element = () => {
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

  const [loadingPage, setLoadingPage] = useState<boolean>(true)
  const [loadingAuthors, setLoadingAuthors] = useState<boolean>(true)
  const [loadingComments, setLoadingComments] = useState<boolean>(true)
  const [loadingReactions, setLoadingReactions] = useState<boolean>(true)
  const [loadingHotTopics, setLoadingHotTopics] = useState<boolean>(true)
  const [page, setPage] = useState<number>(1)
  const pageSize = 10

  const skeletonList = useMemo(() => new Array(10).fill(new NDKEvent()), [])

  const columns: TableColumnsType<NDKEvent> = [
    {
      dataIndex: 'read',
      width: 10,
      render: () => <MailIcon />
    },
    {
      dataIndex: 'content',
      render: (_text, record, i) => {
        const date = fromUnixTime(parseInt(record.tagValue("published_at") ?? record.created_at?.toString() ?? "0", 10));
        const relativeTime = formatDistanceToNow(date, { addSuffix: true });
        const profile = authors?.[record.pubkey]
        return (
          <Col span={24}>
            <Row>
              <Skeleton loading={!record.tagValue("title") && !record.tagValue("d") && loadingPage} active paragraph={{ rows: 1, width: 300, style: { margin: 0, marginTop: 6 } }} title={false} >
                <Text strong>{record.tagValue("title") ?? record.tagValue("d") ?? '-'}</Text>
              </Skeleton>
            </Row>
            <Row>
              <Skeleton loading={!profile && loadingAuthors} active paragraph={{ rows: 1, width: 300, style: { margin: 0, marginTop: 6 } }} title={false} >
                <Text type="secondary">
                  {`@${profile?.displayName ?? profile?.name ?? t("shared.events.anonymous")} - ${t("shared.events.published_at", { date: relativeTime })}`}
                </Text>
              </Skeleton>
            </Row>
          </Col>
        )
      }
    },
    {
      width: 95,
      dataIndex: 'likes',
      render: (text, record, index) => (
        <Text type="secondary">
          <Skeleton loading={!reactions[record?.dTag ?? ''] && loadingReactions} active paragraph={{ rows: 1, width: 55, style: { margin: 0, marginTop: 6 } }} title={false} >
            <Row justify="space-between">
              <FavoriteIcon />
              {reactions[record?.dTag ?? '']?.length ?? 0}
            </Row>
          </Skeleton>
        </Text>
      ),
    },
    {
      width: 95,
      dataIndex: 'count',
      sorter: true,
      sortDirections: ['descend'],
      title: t("pages.forum.table.posted"),
      render: (text, record, index) => (
        <Text type="secondary">
          <Skeleton loading={!comments[record?.dTag ?? ''] && loadingComments} active paragraph={{ rows: 1, width: 55, style: { margin: 0, marginTop: 6 } }} title={false} >
            <Row justify="space-between">
              <SmsIcon />
              {comments[record?.dTag ?? '']?.length ?? 0}
            </Row>
          </Skeleton>
        </Text>
      ),
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
    } else if (naddr === 'all') {
      setTitle(t("pages.forums.list.all.name"))
      setDescription(t("pages.forums.list.all.description"))
    }
  }, [forumEvent])

  const getLatestComments = (): void => {
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
    } else {
      setLoadingPage(false)
      setLoadingAuthors(false)
      setLoadingComments(false)
      setLoadingReactions(false)
    }
  }

  const getTopicEventsMeta = (events: Set<NDKEvent>): void => {
    const authors: string[] = [...events].map((event) => event.pubkey)
    ndk
      .fetchEvents({ kinds: [0], authors }, { closeOnEose: true })
      .then((eventsList) => {
        const authors = {}
        eventsList.forEach((event) => {
          authors[event.pubkey] = profileFromEvent(event)
        })
        saveAuthors(authors)
        setLoadingAuthors(false)
      })
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

  return (
    <Content>
      <Row justify='space-between'>
        <Col span='16'>
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
                      title: title ?? <Skeleton paragraph={{ rows: 1, width: 55, style: { marginTop: 0 } }} title={false} />,
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
                  <Col span='2' />
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
                  <Col span='4'>
                    <Row justify="end">
                      <Button type="primary" htmlType="submit" size="large" icon={<NoteAddIcon />} iconPosition="end" onClick={() => navigate(`/forum/${naddr}/new`)}>
                        {t('pages.forum.createTopic')}
                      </Button>
                    </Row>
                  </Col>
                  <Col span='2' />
                </Row>
              </Layout>
            </Col>
            <Col span='24'>
              <Layout
                style={{ background: colorBgContainer, borderRadius: borderRadiusLG }}
              >
                <Table pagination={false} columns={columns} dataSource={loadingPage ? skeletonList : [...topicEvents ?? []].slice(((page - 1) * pageSize), page * pageSize)} onRow={(record, rowIndex) => {
                  return {
                    onClick: () => navigate(`/topic/${record.encode()}`)
                  };
                }} />
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
        <Col span='7'>
          <Row gutter={[0, 10]} >
            <Col span={24}>
              <ActiveUser />
            </Col>
            <Col span={24}>
              <ForumsButtons />
            </Col>
            {naddr !== 'all' && (
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
                        return (
                          <Row key={i} justify='space-between' onClick={() => navigate(`/topic/${topic.encode()}`)}>
                            <Col style={{ overflow: 'hidden', whiteSpace: 'nowrap', textOverflow: 'ellipsis' }}>
                              <Text strong>
                                {topic.tagValue("title") ?? topic.tagValue("d") ?? '-'}
                              </Text>
                            </Col>
                            <Col>
                              <Text>{formatDistanceToNow(fromUnixTime(parseInt(topic?.tagValue("published_at") ?? topic?.created_at?.toString() ?? "0", 10)), { addSuffix: true })}</Text>
                            </Col>
                          </Row>
                        )
                      })}
                      {!loadingHotTopics && hotRopics?.size === 0 ? <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} /> : <></>}
                    </Skeleton>
                  </Col>
                </Row>
              </Layout>
            )}
          </Row>
        </Col>
      </Row>
    </Content>
  )
}
