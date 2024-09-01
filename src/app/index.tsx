/**
 *
 * App
 *
 * This component is the skeleton around the actual pages, and should only
 * contain code that should be seen on all pages. (e.g. navigation bar)
 */

import { Helmet } from 'react-helmet-async'
import { BrowserRouter, Route, Routes } from 'react-router-dom'

import { GlobalStyle } from 'styles/global-styles'

import { ForumList } from './pages/ForumList/Loadable'
import { Forum } from './pages/Forum/Loadable'
import { I18nextProvider } from 'react-i18next'
import i18n from 'locales/i18n'
import { Col, ConfigProvider, Layout, Row, theme } from 'antd'
import { NostrContextProvider } from './contexts/NostrContext';

import { MainHeader } from './components/MainHeader'
import { NotFound } from './pages/NotFound/Loadable'
import { Topic } from './pages/Topic/Loadable'
import { NewTopic } from './pages/NewTopic/Loadable'
import { ExternalForumList } from './pages/ExternalForumList/Loadable'


export const App: () => JSX.Element = () => {
  return (
    <ConfigProvider
      theme={{
        algorithm: theme.defaultAlgorithm,
        token: {
          colorPrimary: '#F7931A',
          colorBgContainer: '#FFF',
          colorSuccess: '#00b96b',
          colorError: '#F71735',
          colorInfo: '#3772FF',
          colorLink: '#FEB95F'
        },
      }}
    >
      <BrowserRouter>
        <Helmet
          titleTemplate='%s - Satstralia'
          defaultTitle='Satstralia'
          htmlAttributes={{ lang: i18n.language }}
        >
          <meta name='description' content='Satstralia' />
        </Helmet>
        <I18nextProvider i18n={i18n}>
          <NostrContextProvider>
            <Layout>
              <Row justify='space-around'>
                <MainHeader />
              </Row>
              <Row justify='space-around' style={{ padding: '20px 0' }}>
                <Col span='20'>
                  <Row justify='space-around' gutter={[0, 16]}>
                    <Routes>
                      <Route path='*' element={<NotFound />} />
                      <Route path='/' element={<ForumList />} />
                      <Route path='/forum/:naddr/new' element={<NewTopic />} />
                      <Route path='/forum/:naddr' element={<Forum />} />
                      <Route path='/topic/:naddr' element={<Topic />} />
                      <Route path='/forums' element={<ExternalForumList />} />
                    </Routes>
                  </Row>
                </Col>
              </Row>
            </Layout>
          </NostrContextProvider>
        </I18nextProvider>
        <GlobalStyle />
      </BrowserRouter>
    </ConfigProvider>
  )
}
