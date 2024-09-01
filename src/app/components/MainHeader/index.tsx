import { Col, Row, Typography } from "antd";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";

const { Text } = Typography;

export const MainHeader: () => JSX.Element = () => {
  const { t } = useTranslation()
  const navigate = useNavigate();
  return (
    <Col span={24} style={{ background: '#fff', height: 60 }}>
      <Row justify="space-around">
        <Col span={20}>
          <Row align="middle" style={{ height: 60, paddingLeft: 20 }} justify="start" gutter={[20, 0]} onClick={() => navigate('/')}>
            <Col>
              <img src="/assets/logo.png" width={30} />
            </Col>
            <Col>
              <Row>
                <Text strong>foro.kiwi</Text>
              </Row>
              <Row>
                <Text type="secondary">{t('components.mainHeader.description')}</Text>
              </Row>
            </Col>
          </Row>
        </Col>
      </Row>
    </Col>
  )
}
