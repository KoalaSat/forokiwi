import { Button, Modal, Row, Typography } from "antd";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";

const { Text } = Typography;

export const ForumsButtons: () => JSX.Element = () => {
  const { t } = useTranslation()
  const navigate = useNavigate();
  const [openCreateForum, setOpenCreateForum] = useState(false);

  // const onFinish: FormProps<CreateFields>['onFinish'] = async (values) => {
  //   if (values.name && values.description) {
  //     const communityEvent = new NDKEvent(ndk);
  //     communityEvent.kind = 34550
  //     await communityEvent.generateTags()
  //     communityEvent.tags.push(["name", values.name])
  //     communityEvent.tags.push(["description", values.description])

  //     await communityEvent.publish()

  //     const newNaddr = communityEvent.encode()
  //     saveForums({ [newNaddr]: communityEvent, [communityEvent.dTag]: communityEvent })
  //     navigate(`/forum/${newNaddr}`)
  //   }
  // };

  return (
    <Row gutter={[0, 10]} >
      <Button type="primary" block size="large" onClick={() => setOpenCreateForum(true)}>
        <Text strong>{t(`pages.forums.myForums`)}</Text>
      </Button>
      <Button block size="large" onClick={() => navigate('/forums')}>
        <Text strong>{t(`pages.forums.searchForum`)}</Text>
      </Button>
      <Modal
        title={t('pages.forums.createModal.title')}
        centered
        style={modalStyle}
        open={openCreateForum}
        onCancel={() => setOpenCreateForum(false)}
        width={1000}
        footer={null}
      >
        <Text strong>{t(`shared.commingSoon`)}</Text>
      </Modal>
    </Row>
  )
}

// const carrouselStyle: React.CSSProperties = {
//   margin: 0,
//   height: '260px',
//   color: '#fff',
//   lineHeight: '160px',
//   textAlign: 'center',
//   background: '#364d79',
// };
const modalStyle: React.CSSProperties = {
  margin: 0,
  height: '500px',
};

