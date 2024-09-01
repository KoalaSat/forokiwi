import { Helmet } from 'react-helmet-async'
import { Row, Col, Typography } from 'antd'
import { useTranslation } from 'react-i18next'

export const NotFound: () => JSX.Element = () => {
  const { t } = useTranslation()

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
                <Typography.Title>
                  4
                  <span role='img' aria-label='Crying Face'>
                    😢
                  </span>
                  4
                </Typography.Title>
              </Row>
            </Col>
            <Col span='24'>
              <Row justify='space-around'>
                <Typography.Text>{t('Page not found')}</Typography.Text>
              </Row>
            </Col>
          </Row>
        </Col>
      </Row>
    </>
  )
}
