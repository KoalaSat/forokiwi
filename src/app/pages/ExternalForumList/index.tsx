import { Avatar, Breadcrumb, Button, Col, Input, Row, Select, Skeleton, Table, TableColumnsType, Typography, theme } from "antd";
import Layout, { Content } from "antd/es/layout/layout"
import PeopleAltIcon from '@mui/icons-material/PeopleAlt';
import { useContext, useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import LanguageIcon from '@mui/icons-material/Language';
import { ForumsButtons } from "app/components/ForumsButtons";
import { NDKEvent, NDKFilter } from "@nostr-dev-kit/ndk";
import { UseNostrStoreType, NostrContext } from "app/contexts/NostrContext";
import { useTranslation } from "react-i18next";
import { ActiveUser } from "app/components/ActiveUser";
import { UseAppStoreType, AppContext } from "app/contexts/AppContext";
import { languages } from "../../../constants";
import ReactCountryFlag from "react-country-flag";

const { Text, Title } = Typography;
const { Search } = Input;

export const ExternalForumList: () => JSX.Element = () => {
  const navigate = useNavigate();
  const { t } = useTranslation()
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();
  const { turtleMode, topicLanguage, setTopicLanguage } = useContext<UseAppStoreType>(AppContext);
  const { ndk, saveForums } = useContext<UseNostrStoreType>(NostrContext);
  const skeletonList = useMemo(() => new Array(10).fill(new NDKEvent()), [])
  const [externalForums, setExternalForums] = useState<NDKEvent[]>();
  const [loadingPage, setLoadingPage] = useState<boolean>(true)
  const [page, setPage] = useState<number>(1)
  const pageSize = 10

  const columns: TableColumnsType<NDKEvent> = [
    {
      dataIndex: 'read',
      width: 10,
      render: (_text, record, i) => <Avatar src={turtleMode ? undefined : record.tagValue('image')} icon={<PeopleAltIcon style={{ fontSize: '20px' }} />} />
    },
    {
      dataIndex: 'content',
      render: (_text, record, i) => {
        return (
          <Col span={24}>
            <Skeleton active loading={!record.id} paragraph={{ rows: 1, style: { margin: 0, marginTop: -5 } }} title={{ style: { marginTop: 0 } }}>
              <Row justify='start'>
                <Col span={24}>
                  <Row>
                    <Text strong>{record.tagValue("name") ?? record.tagValue("d")}</Text>
                  </Row>
                  <Row>
                    <Col span={24}>
                      <Text type="secondary">{record?.tagValue("description") === "" ? "-" : record?.tagValue("description") ?? "-"}</Text>
                    </Col>
                  </Row>
                </Col>
              </Row>
            </Skeleton>
          </Col>
        )
      }
    },
  ]

  useEffect(() => {
    getForumEvents()
  }, [page])

  const getForumEvents = (newLang?: string): void => {
    setLoadingPage(true)

    // let filters: NDKFilter = { kinds: [34550, 39000], limit: pageSize }
    let filters: NDKFilter = { kinds: [39000], limit: pageSize }

    if (externalForums && !newLang) {
      const array = Array.from(externalForums);
      const until = array[array.length - 1]?.created_at ?? 0
      filters.until = until + 1
    }

    if (newLang && newLang !== 'all') filters = { ...filters, '#l': [newLang.split("-")[0]] }

    ndk.fetchEvents(filters, { closeOnEose: true }).then((newEvents) => {
      setExternalForums(events => {
        return newLang ? [...newEvents] : [...events ?? [], ...newEvents]
      })
      saveForums([...newEvents].reduce((accumulator, event) => {
        if (event.dTag) {
          accumulator[event.encode()] = event
          accumulator[event.dTag] = event
        }
        return accumulator;
      }, {}))
      setLoadingPage(false)
    })
  }

  const changeTopicLanguage = (value: string): void => {
    setTopicLanguage(value)
    getForumEvents(value)
  }

  return (
    <Content>
      <Row justify='space-between'>
        <Col xs={24} md={16}>
          <Row gutter={[0, 10]} >
            <Col span={24}>
              <Row justify="space-between">
                <Breadcrumb
                  items={[
                    {
                      title: <a>Home</a>,
                      onClick: () => navigate('/')
                    },
                    {
                      title: t("pages.externalForumList.title"),
                    },
                  ]}
                />
                <Col>
                  {topicLanguage === 'all' ? (
                    <LanguageIcon style={{ fontSize: 16, marginRight: 10 }} />
                  ) : (
                    <ReactCountryFlag
                      countryCode={topicLanguage.split('-')[1]}
                      style={{ fontSize: 16, marginRight: 10 }}
                    />
                  )}
                  <Select
                    showSearch
                    style={{ width: 100 }}
                    size="small"
                    onChange={changeTopicLanguage}
                    defaultValue={topicLanguage}
                    filterOption={(input, option) =>
                      (option?.label as string ?? '').toLowerCase().includes(input.toLowerCase())
                    }
                    options={
                      [
                        { value: 'all', label: t('shared.all') },
                        ...languages
                          .filter((item, index, self) =>
                            index === self.findIndex((t) => t.label === item.label)
                          )
                          .map(lang => {
                            return { ...lang, label: t(`language.${lang.label}`) }
                          }),
                      ]
                    }
                  />
                </Col>
              </Row>
            </Col>
            <Col span='24'>
              <Layout
                style={{ background: colorBgContainer, borderTopLeftRadius: borderRadiusLG, borderTopRightRadius: borderRadiusLG, paddingBottom: 15 }}
              >
                <Row justify='space-around' align="middle">
                  <Col span='20'>
                    <Row>
                      <Title>{t("pages.externalForumList.title")}</Title>
                    </Row>
                  </Col>
                </Row>
              </Layout>
            </Col>
            <Col span='24'>
              <Search placeholder="input search text" allowClear disabled/>
            </Col>
            <Layout
              style={{ background: colorBgContainer, borderRadius: borderRadiusLG }}
            >
              <Table pagination={false} columns={columns} dataSource={loadingPage ? skeletonList : [...externalForums ?? []].slice(((page - 1) * pageSize), page * pageSize)} onRow={(record, rowIndex) => {
                return {
                  onClick: () => navigate(`/forum/${record.encode()}`)
                };
              }} />
            </Layout>
            <Col span='24'>
              <Row justify="space-between">
                <Button type="link" disabled={page < 2} onClick={() => setPage(p => p - 1)}>{t("shared.previous")}</Button>
                <Button type="link">{page}</Button>
                <Button type="link" disabled={(externalForums?.length ?? Infinity) < page * pageSize} onClick={() => setPage(p => p + 1)}>{t("shared.next")}</Button>
              </Row>
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
