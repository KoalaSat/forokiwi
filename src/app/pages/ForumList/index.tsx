import { Breadcrumb, Col, List, Row, Typography, theme } from "antd";
import MonitorIcon from '@mui/icons-material/Monitor';
import VideogameAssetIcon from '@mui/icons-material/VideogameAsset';
import BusinessCenterIcon from '@mui/icons-material/BusinessCenter';
import TravelExploreIcon from '@mui/icons-material/TravelExplore';
import SportsBasketballIcon from '@mui/icons-material/SportsBasketball';
import CandlestickChartIcon from '@mui/icons-material/CandlestickChart';
import LanguageIcon from '@mui/icons-material/Language';
import TagIcon from '@mui/icons-material/Tag';
import BugReportIcon from '@mui/icons-material/BugReport';
import SvgIcon from '@mui/material/SvgIcon';
import Layout, { Content } from "antd/es/layout/layout"
import { useState } from "react";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import { ForumsButtons } from "app/components/ForumsButtons";
import { ActiveUser } from "app/components/ActiveUser";

interface ListItem {
  name: string;
  icon?: typeof SvgIcon;
  svg?: string;
  naddr: string
}

const { Text } = Typography;

export const ForumList: () => JSX.Element = () => {
  const { t } = useTranslation()
  const navigate = useNavigate();
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();
  const [list] = useState<ListItem[]>([
    {
      name: "test",
      icon: BugReportIcon,
      naddr: "naddr1qvzqqqyx7cpzq2vefk070du8cswq6gqkuhae57uywnffguglpy8xpdy946auhmpdqydhwumn8ghj7mn0wd68ytnnv968xarjv9kxjcfwvdhk6tcqzp3nzer9wdurjwt2dd5kwmfjxdkqu3yaf0"
    },
    {
      name: "all",
      icon: TagIcon,
      naddr: "all"
    },
    {
      name: "general",
      icon: LanguageIcon,
      naddr: "naddr1qvzqqqyx7cpzq2vefk070du8cswq6gqkuhae57uywnffguglpy8xpdy946auhmpdqy88wumn8ghj7mn0wvhxcmmv9uq3kamnwvaz7tmwdaehgu3wwdshgum5wfskc6tp9e3k7mf0qyfhwumn8ghj7mmxve3ksctfdch8qatz9uqpqcnj8p3xzerwxesh27r5wehxccsa329hx"
    },
    {
      name: "electronitcs",
      icon: MonitorIcon,
      naddr: "naddr1qvzqqqyx7cpzq2vefk070du8cswq6gqkuhae57uywnffguglpy8xpdy946auhmpdqy88wumn8ghj7mn0wvhxcmmv9uq3kamnwvaz7tmwdaehgu3wwdshgum5wfskc6tp9e3k7mf0qyfhwumn8ghj7mmxve3ksctfdch8qatz9uqpq6r8xemnzmfsxs6njdfn89chjmsfkk7ha"
    },
    {
      name: "videogames",
      icon: VideogameAssetIcon,
      naddr: "naddr1qvzqqqyx7cpzq2vefk070du8cswq6gqkuhae57uywnffguglpy8xpdy946auhmpdqy88wumn8ghj7mn0wvhxcmmv9uq3xamnwvaz7tm0venxx6rpd9hzuur4vghszxmhwden5te0dehhxarj9eekzarnw3exzmrfvyhxxmmd9uqpq6psx9uxvat9dejkcat8vaenquqqn36l9"
    },
    {
      name: "business",
      icon: BusinessCenterIcon,
      naddr: "naddr1qvzqqqyx7cpzq2vefk070du8cswq6gqkuhae57uywnffguglpy8xpdy946auhmpdqy88wumn8ghj7mn0wvhxcmmv9uq3xamnwvaz7tm0venxx6rpd9hzuur4vghszxmhwden5te0dehhxarj9eekzarnw3exzmrfvyhxxmmd9uqpqensdamxkvtf8q6hgvnww9c8w6svd9hyu"
    },
    {
      name: "travels",
      icon: TravelExploreIcon,
      naddr: "naddr1qvzqqqyx7cpzq2vefk070du8cswq6gqkuhae57uywnffguglpy8xpdy946auhmpdqy88wumn8ghj7mn0wvhxcmmv9uq3kamnwvaz7tmwdaehgu3wwdshgum5wfskc6tp9e3k7mf0qyfhwumn8ghj7mmxve3ksctfdch8qatz9uqpqumzxphkv7ntx46hjvmwdfenwas24urnh"
    },
    {
      name: "sports",
      icon: SportsBasketballIcon,
      naddr: "naddr1qvzqqqyx7cpzq2vefk070du8cswq6gqkuhae57uywnffguglpy8xpdy946auhmpdqy88wumn8ghj7mn0wvhxcmmv9uq3kamnwvaz7tmwdaehgu3wwdshgum5wfskc6tp9e3k7mf0qyfhwumn8ghj7mmxve3ksctfdch8qatz9uqpqdpex35nwum4x5mnxenp09jk56cygwzgl"
    },
    {
      name: "finances",
      icon: CandlestickChartIcon,
      naddr: "naddr1qvzqqqyx7cpzq2vefk070du8cswq6gqkuhae57uywnffguglpy8xpdy946auhmpdqy88wumn8ghj7mn0wvhxcmmv9uq3kamnwvaz7tmwdaehgu3wwdshgum5wfskc6tp9e3k7mf0qyfhwumn8ghj7mmxve3ksctfdch8qatz9uqpqmm4d5uky6fjwvmrwcmsdvu8w6qzd7xma"
    },
    {
      name: "bitcoin",
      svg: 'bitcoin-logo',
      naddr: "naddr1qvzqqqyx7cpzq2vefk070du8cswq6gqkuhae57uywnffguglpy8xpdy946auhmpdqy88wumn8ghj7mn0wvhxcmmv9uq3kamnwvaz7tmwdaehgu3wwdshgum5wfskc6tp9e3k7mf0qyfhwumn8ghj7mmxve3ksctfdch8qatz9uqpqdtwwycnxvr4x4kxvc35xdcnqcsjqv9yl"
    }
  ]);

  return (
    <Content>
      <Row justify='space-between'>
        <Col span='16'>
          <Row gutter={[0, 10]} >
            <Col span={24}>
              <Row>
                <Breadcrumb
                  items={[
                    {
                      title: <a>Home</a>,
                      onClick: () => navigate('/')
                    }
                  ]}
                />
              </Row>
            </Col>
            <Layout
              style={{ background: colorBgContainer, borderRadius: borderRadiusLG }}
            >
              <List
                className="demo-loadmore-list"
                itemLayout="horizontal"
                dataSource={list}
                renderItem={(item: ListItem) => (
                  <List.Item onClick={() => navigate(`/forum/${item.naddr}`)} style={{ cursor: 'pointer' }}>
                    <Col span={2}>
                      <Row justify='space-around'>
                        {item.icon && <item.icon style={{ fontSize: '25px', color: '#08c' }} />}
                        {item.svg && <img src={`/assets/${item.svg}.svg`} alt={t(`pages.forums.list.${item.name}.name`)} style={{ height: 25, width: 25 }} />}
                      </Row>
                    </Col>
                    <Col span={22}>
                      <Row justify='start'>
                        <Col span={24}>
                          <Row>
                            <Text strong>{t(`pages.forums.list.${item.name}.name`)}</Text>
                          </Row>
                          <Row>
                            <Text type="secondary">{t(`pages.forums.list.${item.name}.description`)}</Text>
                          </Row>
                        </Col>
                      </Row>
                    </Col>
                  </List.Item>
                )}
              />
            </Layout>
          </Row>
        </Col>
        <Col span='7'>
          <Row gutter={[0, 10]} >
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