import React from 'react';
import { Modal, Form, message, Input } from 'antd';
import PropTypes from 'prop-types';

function FeedbackModal(props) {
  const { ShowOrderModal, setShowOrderModal, part } = props;
  //   const [part, setpart] = useState({});
  //   console.log(part);
  const [form] = Form.useForm();

  //   useEffect(() => {
  //     setpart(selectedPart);
  //     return () => {
  //       setpart({});
  //     };
  //   }, [selectedPart]);

  const modalOnOk = () => {
    message.success('주문을 완료했습니다.');
    setShowOrderModal(false);
  };

  return (
    <div>
      <Modal
        title="부품 정보 수정"
        style={{ top: 50 }}
        visible={ShowOrderModal}
        destroyOnClose
        onOk={form.submit}
        onCancel={() => setShowOrderModal(false)}
      >
        <Form
          {...{ labelCol: { span: 6 }, wrapperCol: { span: 14 } }}
          name="userinfo-change"
          form={form}
          onFinish={modalOnOk}
          key={part}
          preserve={false}
        >
          <Form.Item
            label="Section.1"
            name="section1"
            initialValue={part?.section1}
          >
            <Input
              id="section1"
              name="section1"
              className="form_input"
              type="text"
              readOnly
            />
          </Form.Item>
          <Form.Item
            label="Section.2"
            name="section2"
            initialValue={part?.section2}
          >
            <Input
              id="section2"
              name="section2"
              className="form_input"
              type="text"
              readOnly
            />
          </Form.Item>
          <Form.Item label="부품 이름" name="name" initialValue={part?.name}>
            <Input
              id="name"
              name="name"
              className="form_input"
              type="text"
              readOnly
            />
          </Form.Item>
          <Form.Item
            label="기본 수명"
            initialValue={part?.defaultLifespan}
            name="defaultLifespan"
          >
            <Input
              id="defaultLifespan"
              name="defaultLifespan"
              className="form_input"
              type="number"
              autoComplete="on"
              readOnly
            />
          </Form.Item>
          <Form.Item
            label="수량"
            name="number"
            rules={[{ required: true, message: 'Please input this field!' }]}
          >
            <Input
              id="number"
              name="number"
              className="form_input"
              type="number"
              autoComplete="on"
            />
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
}

export default FeedbackModal;

FeedbackModal.propTypes = {
  ShowOrderModal: PropTypes.bool.isRequired,
  setShowOrderModal: PropTypes.func.isRequired,
  // selectedPart: PropTypes.objectOf(PropTypes.any).isRequired,
  getParts: PropTypes.func.isRequired,
  part: PropTypes.objectOf(PropTypes.any).isRequired,
};
