import { Breadcrumb, Button, Col, Input, Row, Skeleton, Typography, theme } from "antd";
import Layout, { Content } from "antd/es/layout/layout"
import { useTranslation } from "react-i18next";
import NoteAddIcon from '@mui/icons-material/NoteAdd';
import { useNavigate, useParams } from "react-router-dom";
import TextArea from "antd/es/input/TextArea";
import { useContext, useEffect, useState } from "react";
import { UseNostrStoreType, NostrContext } from "app/contexts/NostrContext";
import { NDKEvent, filterForEventsTaggingId } from "@nostr-dev-kit/ndk";
import { getUnixTime } from "date-fns";
import { ActiveUser } from "app/components/ActiveUser";

const { Title } = Typography;

export const NewTopic: () => JSX.Element = () => {
  const { ndk, saveTopics, forums, saveForums } = useContext<UseNostrStoreType>(NostrContext);
  const { t } = useTranslation()
  const { naddr } = useParams();
  const navigate = useNavigate();
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();
  const [content, setContent] = useState<string>()
  const [forumTitle, setForumTitle] = useState<string>()
  const [title, setTitle] = useState<string>()
  const [forumEvent, setForumEvent] = useState<NDKEvent>()

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
    if (forumEvent) {
      setForumTitle(forumEvent?.tagValue("name") ?? forumEvent.tagValue("d"))
    }
  }, [forumEvent])

  const createTopic = async (): Promise<void> => {
    if (naddr && content && title) {
      const forumTag = filterForEventsTaggingId(naddr)?.['#a']
      if (forumTag?.[0]) {
        const topicEvent = new NDKEvent(ndk)
        topicEvent.kind = 30023
        topicEvent.content = content
        await topicEvent.generateTags()
        topicEvent.tags.push(['a', forumTag?.[0]])
        topicEvent.tags.push(['title', title])
        topicEvent.tags.push(['published_at', getUnixTime(new Date()).toString()])
        topicEvent
          .publish()
          .then((result) => {
            if (result && topicEvent.dTag) {
              const newNaddr = topicEvent.encode()
              saveTopics({ [topicEvent.dTag]: topicEvent })
              navigate(`/topic/${newNaddr}`)
            }
          })
      }
    }
  }

  return (
    <Content>
      <Row justify='space-between'>
        <Col xs={24} md='16'>
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
                      title: forumTitle ? <a>{forumTitle}</a> : <Skeleton paragraph={{ rows: 1, width: 55, style: { marginTop: 0 } }} title={false} />,
                      onClick: () => navigate(`/forum/${forumEvent?.kind ? forumEvent.encode() : 'all'}`)
                    },
                    {
                      title: t('pages.newTopic.createTopic'),
                    },
                  ]}
                />
              </Row>
            </Col>
            <Col span='24'>
              <Layout
                style={{ background: colorBgContainer, borderRadius: borderRadiusLG, padding: '15px 0' }}
              >
                <Row justify='space-around' gutter={[0, 10]} >
                  <Col span='22'>
                    <Row>
                      <Title level={2}>{t('pages.newTopic.title')}</Title>
                    </Row>
                    <Row>
                      <Input onChange={(v) => setTitle(v.target.value)} />
                    </Row>
                  </Col>
                  <Col span='22'>
                    <Row>
                      <Title level={2}>{t('pages.newTopic.content')}</Title>
                    </Row>
                    <Row>
                      <TextArea rows={10} onChange={(v) => setContent(v.target.value)} />
                    </Row>
                  </Col>
                  <Col span='22'>
                    <Row justify="end">
                      <Button disabled={!content || content === '' || !title || title === ''} type="primary" htmlType="submit" size="large" icon={<NoteAddIcon />} iconPosition="end" onClick={createTopic}>
                        {t('pages.newTopic.createTopic')}
                      </Button>
                    </Row>
                  </Col>
                </Row>
              </Layout>
            </Col>
          </Row>
        </Col>
        <Col xs={0} md='7'>
          <Row gutter={[0, 10]} style={{ marginTop: 32 }} >
            <Col span={24}>
              <ActiveUser />
            </Col>
          </Row>
        </Col>
      </Row>
    </Content>
  )
}
