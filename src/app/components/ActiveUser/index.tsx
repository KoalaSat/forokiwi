import { Avatar, Col, Layout, Row, Skeleton, Typography, theme } from "antd";
import PersonIcon from '@mui/icons-material/Person';
import { UseNostrStoreType, NostrContext } from "app/contexts/NostrContext";
import { useContext } from "react";
import { useTranslation } from "react-i18next";

const { Text } = Typography;

export const ActiveUser: () => JSX.Element = () => {
  const { ndk, userProfile } = useContext<UseNostrStoreType>(NostrContext);
  const { t } = useTranslation()
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();

  return (
    <Layout
      style={{ padding: '24px 0', marginTop: 32, background: colorBgContainer, borderRadius: borderRadiusLG }}
    >
      <Row justify="space-around">
        <Col span={20}>
          <Row>
            <Avatar style={{ marginRight: 15 }} size={64} src={ndk.activeUser?.profile?.image} icon={!ndk.activeUser?.profile?.image && <PersonIcon style={{ fontSize: '45px' }} />} />
            <Col>
              <Skeleton active loading={userProfile !== null && !userProfile} paragraph={{ rows: 1 }}>
                <Row>
                  <Text strong>{userProfile?.displayName ?? userProfile?.name ?? t("shared.events.anonymous")}</Text>
                </Row>
                <Row>
                  <Text type="secondary">
                    {userProfile?.nip05 ?? '-'}
                  </Text>
                </Row>
              </Skeleton>
            </Col>
          </Row>
        </Col>
      </Row>

    </Layout>
  )
}

