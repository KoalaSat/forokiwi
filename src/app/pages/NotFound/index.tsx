import { Helmet } from 'react-helmet-async'
import { Row, Col, Typography, theme, Button } from 'antd'
import { useTranslation } from 'react-i18next'
import { useNavigate } from 'react-router-dom';

const { Text, Title } = Typography;

export const NotFound: () => JSX.Element = () => {
  const { t } = useTranslation()
  const navigate = useNavigate();
  const {
    token: { colorPrimary },
  } = theme.useToken();

  return (
    <>
      <Helmet>
        <title>{`404 ${t('Page not found')}`}</title>
        <meta name='description' content={t('Page not found')} />
      </Helmet>
      <Row justify='space-around' style={{ padding: '24px 0' }}>
        <Col span='22'>
          <Row justify='space-around' gutter={[0, 16]}>
            <Col span='24'>
              <Row justify='space-around'>
                <Col>
                  <Text strong style={{ fontFamily: 'Ubuntu', fontSize: 89, color: colorPrimary }}>40</Text>
                  <img src="/assets/kiwi-logo.svg" width={80} style={{ marginTop: -52, marginLeft: 5, transform: 'scaleX(-1)' }} />
                </Col>
              </Row>
            </Col>
            <Col span='24'>
              <Row justify='space-around'>
                <Button onClick={() => navigate('/')}>{t('pages.notFound.goMain')}</Button>
              </Row>
            </Col>
            <Col span='24'>
              <Row justify='space-around'>
                <Title>{t('pages.notFound.title')}</Title>
              </Row>
            </Col>
          </Row>
        </Col>
      </Row>
    </>
  )
}
