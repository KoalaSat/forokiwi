import { Button, Col, Drawer, Row, Switch, Tooltip, Typography, theme } from "antd";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import NightlightRoundIcon from '@mui/icons-material/NightlightRound';
import Brightness5Icon from '@mui/icons-material/Brightness5';
import MenuIcon from '@mui/icons-material/Menu';
import { UseAppStoreType, AppContext } from "app/contexts/AppContext";
import { useContext, useState } from "react";
import { ActiveUser } from "../ActiveUser";
import { ForumsButtons } from "../ForumsButtons";

const { Text } = Typography;

interface MainHeaderProps {
  setIsDarkMode: (darkMode: boolean) => void
  isDarkMode
}

export const MainHeader: React.FC<MainHeaderProps> = ({ setIsDarkMode, isDarkMode }) => {
  const { turtleMode, setTurtleMode } = useContext<UseAppStoreType>(AppContext);
  const { t } = useTranslation()
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const {
    token: { colorPrimary, colorBgContainer },
  } = theme.useToken();

  const switchMode = (): void => {
    setIsDarkMode(!isDarkMode)
    document.body.style.backgroundColor = isDarkMode ? 'rgb(245, 245, 245)' : "rgb(0, 0, 0)"
  }

  return (
    <Col span={24} style={{ background: colorBgContainer, height: 60 }}>
      <Row justify="space-around">
        <Col span={20}>
          <Row justify="space-between">
            <Col>
              <Row align="middle" style={{ height: 60, paddingLeft: 0 }} onClick={() => navigate('/')}>
                <Col>
                  <Text strong style={{ fontFamily: 'Ubuntu', fontSize: 29, color: colorPrimary }}>40</Text>
                  <img src="/assets/kiwi-logo.svg" width={25} style={{ marginTop: -12, marginLeft: 3, transform: 'scaleX(-1)' }} />
                </Col>
                <Col style={{ marginLeft: 15 }}>
                  <Row>
                    <Text strong>foro.kiwi</Text>
                  </Row>
                  <Row>
                    <Text type="secondary">{t('components.mainHeader.description')}</Text>
                  </Row>
                </Col>
                <Col style={{ marginLeft: 15 }}>
                  <Row>
                  <Text strong style={{ fontFamily: 'Ubuntu', fontSize: 29, color: colorPrimary }}>ALPHA</Text>
                  </Row>
                </Col>
              </Row>
            </Col>
            <Col>
              <Row align="middle" justify="end" style={{ height: 60, paddingRight: 0 }} gutter={[10, 0]}>
                <Col xs={0} md={12}>
                  <Tooltip title={t("components.mainHeader.turtleMode")}>
                    <Switch
                      checkedChildren={<img src='/assets/nostr-logo.svg' style={{ height: 15, width: 15 }} />}
                      unCheckedChildren={<img src='/assets/turtle-logo.svg' style={{ height: 20, width: 20 }} />}
                      value={!turtleMode}
                      onChange={(value) => setTurtleMode(!value)}
                    />
                  </Tooltip>
                </Col>
                <Col xs={0} md={12}>
                  <Button onClick={switchMode}>
                    {isDarkMode ? <NightlightRoundIcon /> : <Brightness5Icon />}
                  </Button>
                </Col>
                <Col xs={24} md={0}>
                  <Button onClick={() => setOpen(true)}>
                    <MenuIcon />
                  </Button>
                </Col>
              </Row>
            </Col>
          </Row>
        </Col>
      </Row>
      <Drawer
        title={
          <Col>
            <Row align="middle" justify="space-between" style={{ paddingLeft: 0 }}>
              <Col>
                <Text strong style={{ fontFamily: 'Ubuntu', fontSize: 29, color: colorPrimary }}>40</Text>
                <img src="/assets/kiwi-logo.svg" width={25} style={{ marginTop: -12, marginLeft: 3, transform: 'scaleX(-1)' }} />
              </Col>
              <Col>
                <Row gutter={[10, 10]}>
                  <Col>
                    <Tooltip title={t("components.mainHeader.turtleMode")}>
                      <Switch
                        checkedChildren={<img src='/assets/nostr-logo.svg' style={{ height: 15, width: 15 }} />}
                        unCheckedChildren={<img src='/assets/turtle-logo.svg' style={{ height: 20, width: 20 }} />}
                        value={!turtleMode}
                        onChange={(value) => setTurtleMode(!value)}
                        style={{ marginTop: 5 }}
                      />
                    </Tooltip>
                  </Col>
                  <Col>
                    <Button onClick={switchMode}>
                      {isDarkMode ? <NightlightRoundIcon /> : <Brightness5Icon />}
                    </Button>
                  </Col>
                </Row>
              </Col>
            </Row>
          </Col>
        }
        onClose={() => setOpen(false)}
        open={open}
      >
        <Row gutter={[0, 10]}>
          <Col span={24}>
            <ActiveUser />
          </Col>
          <Col span={24}>
            <ForumsButtons onClick={() => setOpen(false)} />
          </Col>
        </Row>
      </Drawer>
    </Col>
  )
}
