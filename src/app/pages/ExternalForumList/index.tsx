import { Avatar, Breadcrumb, Button, Col, Row, Skeleton, Table, TableColumnsType, Typography, theme } from "antd";
import Layout, { Content } from "antd/es/layout/layout"
import PeopleAltIcon from '@mui/icons-material/PeopleAlt';
import { useContext, useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { ForumsButtons } from "app/components/ForumsButtons";
import { NDKEvent, NDKFilter } from "@nostr-dev-kit/ndk";
import { UseNostrStoreType, NostrContext } from "app/contexts/NostrContext";
import { useTranslation } from "react-i18next";
import { ActiveUser } from "app/components/ActiveUser";
import { UseAppStoreType, AppContext } from "app/contexts/AppContext";

const { Text, Title } = Typography;

export const ExternalForumList: () => JSX.Element = () => {
  const navigate = useNavigate();
  const { t } = useTranslation()
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();
  const { turtleMode } = useContext<UseAppStoreType>(AppContext);
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
            <Skeleton active loading={!record.id} paragraph={{ rows: 1, width: 300, style: { margin: 0, marginTop: -5 } }} title={{ style: { marginTop: 0 } }}>
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

  const getForumEvents = (): void => {
    setLoadingPage(true)
    if (page * pageSize > (externalForums?.length ?? 0)) {
      // @ts-expect-error
      const filters: NDKFilter = { kinds: [34550], limit: pageSize }

      if (externalForums) {
        const array = Array.from(externalForums);
        const until = array[array.length - 1]?.created_at ?? 0
        filters.until = until + 1
      }

      ndk.fetchEvents(filters, { closeOnEose: true }).then((newEvents) => {
        setExternalForums(events => [...events ?? [], ...newEvents])
        saveForums([...newEvents].reduce((accumulator, event) => {
          if (event.dTag) {
            accumulator[event.encode()] = event
            accumulator[event.dTag] = event
          }
          return accumulator;
        }, {}))
        setLoadingPage(false)
      })
    } else {
      setLoadingPage(false)
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
                      title: t("pages.externalForumList.title"),
                    },
                  ]}
                />
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
