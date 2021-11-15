import React from 'react';
import PropTypes from 'prop-types';
import { Modal, Form, Input, message } from 'antd';

const PredictModal = props => {
  const { part, site, ShowModal, setShowModal } = props;
  const [form] = Form.useForm();

  const modalOnOk = () => {
    console.log(site);
    console.log(part);
    message.success('성공');
    setShowModal(false);
  };

  return (
    <Modal
      title="예측 분석"
      style={{ top: 50 }}
      visible={ShowModal}
      destroyOnClose
      onOk={form.submit}
      onCancel={() => setShowModal(false)}
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
          label="사이트 이름"
          name="siteName"
          initialValue={site?.name}
        >
          <Input id="siteName" name="siteName" readOnly />
        </Form.Item>
        <Form.Item
          label="부품 이름"
          name="name"
          initialValue={part?.part?.name}
        >
          <Input id="name" name="name" readOnly />
        </Form.Item>
        <Form.Item
          label="예상 수명 분석"
          name="expectLifespan"
          rules={[{ required: true, message: '예측 수명을 입력해주세요.' }]}
        >
          <Input id="expectLifespan" name="expectLifespan" />
        </Form.Item>
      </Form>
    </Modal>
  );
};

PredictModal.propTypes = {
  setShowModal: PropTypes.func.isRequired,
  ShowModal: PropTypes.bool.isRequired,
  site: PropTypes.objectOf(PropTypes.any).isRequired,
  part: PropTypes.objectOf(PropTypes.any).isRequired,
};

export default PredictModal;
