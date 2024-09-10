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
import { Col, ConfigProvider, Layout, Row, Typography, theme } from 'antd'
import { NostrContextProvider } from './contexts/NostrContext';

import { MainHeader } from './components/MainHeader'
import { NotFound } from './pages/NotFound/Loadable'
import { Topic } from './pages/Topic/Loadable'
import { NewTopic } from './pages/NewTopic/Loadable'
import { ExternalForumList } from './pages/ExternalForumList/Loadable'
import { useEffect, useState } from 'react'
import { AppContextProvider } from './contexts/AppContext'
import GithubOutlined from '@ant-design/icons/lib/icons/GithubOutlined'

const lightTheme = {
  colorPrimary: '#08c',
  colorBgContainer: '#FFF',
  colorSuccess: '#00b96b',
  colorError: '#F71735',
  colorInfo: '#3772FF',
  colorLink: '#08c'
}

const darkTheme = {
  "colorPrimary": "#08c",
  "colorBgContainer": "#1f1f1f",
  "colorSuccess": "#2e8b57",
  "colorError": "#e74c3c",
  "colorInfo": "#3498db",
  "colorLink": "#08c"
}

const { Link } = Typography;

export const App: () => JSX.Element = () => {
  const [isDarkMode, setIsDarkMode] = useState(true);

  useEffect(() => {
    document.body.style.backgroundColor = isDarkMode ? "rgb(0, 0, 0)" : 'rgb(245, 245, 245)'
  }, [])

  return (
    <ConfigProvider
      theme={{
        algorithm: isDarkMode ? theme.darkAlgorithm : theme.defaultAlgorithm,
        token: isDarkMode ? darkTheme : lightTheme,
      }}
    >
      <BrowserRouter>
        <Helmet
          titleTemplate='%s - foro.kiwi'
          defaultTitle='foro.kiwi'
          htmlAttributes={{ lang: i18n.language }}
        >
          <meta name='description' content='foro.kiwi' />
        </Helmet>
        <I18nextProvider i18n={i18n}>
          <AppContextProvider isDarkMode={isDarkMode}>
            <NostrContextProvider>
              <Layout>
                <Row justify='space-around'>
                  <MainHeader setIsDarkMode={setIsDarkMode} isDarkMode={isDarkMode} />
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
                    <Row justify='end' style={{ marginTop: 5 }}>
                      <Link
                        href='https://github.com/KoalaSat/forokiwi'
                        target='_blank'
                      >
                        <GithubOutlined onPointerEnterCapture={undefined} onPointerLeaveCapture={undefined} />
                      </Link>
                    </Row>
                  </Col>
                </Row>
              </Layout>
            </NostrContextProvider>
          </AppContextProvider>
        </I18nextProvider>
        <GlobalStyle />
      </BrowserRouter>
    </ConfigProvider>
  )
}
