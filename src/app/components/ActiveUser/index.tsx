import { Avatar, Button, Col, Layout, Modal, Row, Skeleton, Typography, theme } from "antd";
import PersonIcon from '@mui/icons-material/Person';
import { UseNostrStoreType, NostrContext } from "app/contexts/NostrContext";
import { useContext, useState } from "react";
import { useTranslation } from "react-i18next";

const { Text } = Typography;

export const ActiveUser: () => JSX.Element = () => {
  const { ndk, userProfile } = useContext<UseNostrStoreType>(NostrContext);
  const { t } = useTranslation()
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();
  const [openCreateUser, setOpenCreateUser] = useState(false);

  return (
    <Layout
      style={{ padding: '24px 0', background: colorBgContainer, borderRadius: borderRadiusLG }}
    >
      <Row justify="space-around">
        <Col span={20}>
          {userProfile !== null ? (
            <Row>
              {!userProfile ?
                <Skeleton.Avatar shape="circle" size={64} active />
                : <Avatar style={{ marginRight: 15 }} size={64} src={ndk.activeUser?.profile?.image} icon={!ndk.activeUser?.profile?.image && <PersonIcon style={{ fontSize: '45px' }} />} crossOrigin="anonymous" />
              }
              <Col>
                <Skeleton active loading={!userProfile} paragraph={{ rows: 2, style: { marginTop: 5, marginLeft: 15 } }} title={false}>
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
          ) :
            (
              <Row>
                <Col span={24}>
                  <Row justify="center">
                    <Button type="dashed" size="large" onClick={() => setOpenCreateUser(true)}>
                      {t("components.activeUser.createUser")}
                    </Button>
                  </Row>
                </Col>
              </Row>
            )
          }
        </Col>
      </Row>
      <Modal
        title={t('components.activeUser.createUser')}
        centered
        style={modalStyle}
        open={openCreateUser}
        onCancel={() => setOpenCreateUser(false)}
        width={1000}
        footer={null}
      >
        <Row>
          <Col span={24}>
            <Row justify="center" gutter={[0, 20]}>
              <Col span={24}>
                <Row justify="center">
                  <Button type="dashed" size="large">
                    {t(`shared.commingSoon`)}
                  </Button>
                </Row>
              </Col>
              <Col span={24}>
                <Row justify="center">
                  {t(`components.activeUser.tryAlby`)}
                </Row>
              </Col>
            </Row>
          </Col>
        </Row>
      </Modal>
    </Layout>
  )
}

const modalStyle: React.CSSProperties = {
  margin: 0,
  height: '500px',
};
