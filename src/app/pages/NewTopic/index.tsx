import { Breadcrumb, Button, Col, Input, Row, Select, Skeleton, Tabs, Typography, theme } from "antd";
import Layout, { Content } from "antd/es/layout/layout"
import { useTranslation } from "react-i18next";
import NoteAddIcon from '@mui/icons-material/NoteAdd';
import { useNavigate, useParams } from "react-router-dom";
import { useContext, useEffect, useMemo, useState } from "react";
import { UseNostrStoreType, NostrContext } from "app/contexts/NostrContext";
import { NDKEvent, NDKRelaySet, filterForEventsTaggingId } from "@nostr-dev-kit/ndk";
import { getUnixTime } from "date-fns";
import { ActiveUser } from "app/components/ActiveUser";
import { nip19 } from "nostr-tools";
import ReactMde from "react-mde";
import { AppContext, UseAppStoreType } from "app/contexts/AppContext";
import ReactCountryFlag from "react-country-flag";
import { languages } from "../../../constants";
import { Markdown } from "app/components/Markdown";

const { Title } = Typography;

export const NewTopic: () => JSX.Element = () => {
  const { language, setLanguage, isDarkMode } = useContext<UseAppStoreType>(AppContext);
  const { ndk, saveTopics, forums, saveForums, getBaseRelays } = useContext<UseNostrStoreType>(NostrContext);
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
    } else if (naddr === 'all') {
      setForumTitle(t("pages.forums.list.all.name"))
    }
  }, [forumEvent])

  const getForumRelaySet = (): NDKRelaySet => {
    let relays: string[] = getBaseRelays()

    if (forumEvent) {
      forumEvent.onRelays.forEach(r => relays.push(r.url))
    }
    if (naddr) {
      const ref = nip19.decode(naddr)
      // @ts-expect-error
      relays = [...relays, ...ref.data?.relays ?? []]
    }

    return NDKRelaySet.fromRelayUrls(relays, ndk, true)
  }

  const createTopic = async (): Promise<void> => {
    if (naddr && content && title) {
      const topicEvent = new NDKEvent(ndk)
      topicEvent.kind = 30023
      topicEvent.content = content

      await topicEvent.generateTags()

      if (naddr !== 'all') {
        const forumTag = filterForEventsTaggingId(naddr)?.['#a']
        if (forumTag) topicEvent.tags.push(['a', forumTag[0]])
      }

      topicEvent.tags.push(['title', title])
      topicEvent.tags.push(['published_at', getUnixTime(new Date()).toString()])
      topicEvent.tags.push(['L', "ISO-639-1"])
      topicEvent.tags.push(['l', language.value.split("-")[0], "ISO-639-1"])

      topicEvent
        .publish(getForumRelaySet())
        .then((result) => {
          if (result && topicEvent.dTag) {
            const newNaddr = topicEvent.encode()
            saveTopics({ [topicEvent.dTag]: topicEvent })
            navigate(`/topic/${newNaddr}`)
          }
        })
    }
  }

  const changeLanguage = (langCode: string): void => {
    const selected = languages.find((lang) => langCode === lang.value)
    if (selected) {
      setLanguage(selected)
    }
  }

  const editor = (
    <Row>
      <Col span={24}>
        <ReactMde
          disablePreview
          classes={{
            reactMde: 'mde-box',
            toolbar: 'mde-toolbar',
            textArea: isDarkMode ? 'mde-textarea-dark' : 'mde-textarea-light'
          }}
          value={content}
          onChange={setContent}
        />
      </Col>
    </Row>
  )

  const preview = useMemo(() => (
    <Markdown text={content ?? ''} />
  ), [content])

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
                    <Tabs
                      defaultActiveKey="editor"
                      size="large"
                      items={[
                        {
                          key: 'editor',
                          label: t('pages.newTopic.editor'),
                          children: editor
                        },
                        {
                          key: '2',
                          label: t('pages.newTopic.preview'),
                          children: preview
                        }
                      ]}
                    />
                  </Col>
                  <Col span='22'>
                    <Row justify="end" align="middle" gutter={[10, 0]}>
                      <Col xs={0} md={2}>
                        <Row justify="end">
                          <ReactCountryFlag
                            countryCode={language.value.split('-')[1]}
                            style={{ fontSize: 26 }}
                          />
                        </Row>
                      </Col>
                      <Col>
                        <Row justify="space-between" gutter={[10, 0]}>
                          <Col>
                            <Select
                              showSearch
                              size="large"
                              style={{ width: 120 }}
                              onChange={changeLanguage}
                              defaultValue={language.value}
                              filterOption={(input, option) =>
                                (option?.label as string ?? '').toLowerCase().includes(input.toLowerCase())
                              }
                              options={languages
                                .filter((item, index, self) =>
                                  index === self.findIndex((t) => t.label === item.label)
                                )
                                .map(lang => {
                                  return { ...lang, label: t(`language.${lang.label}`) }
                                })}
                            />
                          </Col>
                          <Col>
                            <Button
                              disabled={!content || content === '' || !title || title === ''}
                              type="primary"
                              htmlType="submit"
                              size="large"
                              icon={<NoteAddIcon />}
                              iconPosition="end"
                              onClick={createTopic}
                            >
                              {t('pages.newTopic.createTopic')}
                            </Button>
                          </Col>
                        </Row>
                      </Col>
                    </Row>
                  </Col>
                </Row>
              </Layout>
            </Col>
          </Row>
        </Col >
        <Col xs={0} md={7}>
          <Row gutter={[0, 10]} style={{ marginTop: 32 }} >
            <Col span={24}>
              <ActiveUser />
            </Col>
          </Row>
        </Col>
      </Row >
    </Content >
  )
}
