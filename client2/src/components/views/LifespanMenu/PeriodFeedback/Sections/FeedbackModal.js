import React from 'react';
import { Modal, Form, message, Input } from 'antd';
import PropTypes from 'prop-types';

function FeedbackModal(props) {
  const { ShowFeedbackModal, setShowFeedbackModal, part } = props;
  const [form] = Form.useForm();

  const modalOnOk = () => {
    message.success('피드백을 추가했습니다.');
    setShowFeedbackModal(false);
  };

  return (
    <div>
      <Modal
        title="부품 정보 수정"
        style={{ top: 50 }}
        visible={ShowFeedbackModal}
        destroyOnClose
        onOk={form.submit}
        onCancel={() => setShowFeedbackModal(false)}
      >
        <Form
          {...{ labelCol: { span: 6 }, wrapperCol: { span: 14 } }}
          name="userinfo-change"
          form={form}
          onFinish={modalOnOk}
          key={part}
          preserve={false}
        >
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
            label="예측 수명"
            name="expectLifespan"
            initialValue={part?.expectLifespan}
          >
            <Input
              id="expectLifespan"
              name="expectLifespan"
              className="form_input"
              type="number"
              autoComplete="on"
              readOnly
            />
          </Form.Item>
          <Form.Item
            label="실수명"
            name="actualLifespan"
            initialValue={part?.actualLifespan}
          >
            <Input
              id="actualLifespan"
              name="actualLifespan"
              className="form_input"
              type="number"
              autoComplete="on"
              readOnly
            />
          </Form.Item>
          <Form.Item
            label="실 사용 피드백"
            name="feed"
            rules={[{ required: true, message: 'Please input this field!' }]}
          >
            <Input
              id="feed"
              name="feed"
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
  ShowFeedbackModal: PropTypes.bool.isRequired,
  setShowFeedbackModal: PropTypes.func.isRequired,
  getParts: PropTypes.func.isRequired,
  part: PropTypes.objectOf(PropTypes.any).isRequired,
};
