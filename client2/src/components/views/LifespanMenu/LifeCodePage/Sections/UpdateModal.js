import React from 'react';
import { Modal, Input, Form, message } from 'antd';
import PropTypes from 'prop-types';

function UpdateModal(props) {
  const {
    modalData,
    modalVisible,
    setModalVisible,
    selectedRowKeys,
    setselectedRowKeys,
  } = props;

  const [form] = Form.useForm();

  const modalOnOk = () => {
    console.log(modalData);
    message.success('성공');

    setModalVisible(false);
    setselectedRowKeys([]);
  };

  return (
    <div>
      <Modal
        title="사용 연한"
        style={{ top: 200 }}
        visible={modalVisible}
        onOk={form.submit}
        onCancel={() => setModalVisible(false)}
        destroyOnClose
      >
        <Form
          {...{ labelCol: { span: 6 }, wrapperCol: { span: 14 } }}
          name="userinfo-change"
          preserve={false}
          form={form}
          onFinish={modalOnOk}
        >
          <Form.Item
            label="ID"
            name="id"
            initialValue={selectedRowKeys[0]?.id}
            rules={[{ required: true, message: 'Please input this field!' }]}
          >
            <Input type="text" id="id" name="id" />
          </Form.Item>
          <Form.Item
            label="이름"
            name="name"
            rules={[{ required: true, message: 'Please input this field!' }]}
            initialValue={selectedRowKeys[0]?.name}
          >
            <Input type="text" id="name" name="name" />
          </Form.Item>
          <Form.Item
            label="설명"
            name="desc"
            initialValue={selectedRowKeys[0]?.desc}
            rules={[{ required: true, message: 'Please input this field!' }]}
          >
            <Input type="text" id="desc" name="desc" />
          </Form.Item>
          <Form.Item
            label="예상 수명"
            name="lifespan"
            initialValue={selectedRowKeys[0]?.lifespan}
            rules={[{ required: true, message: 'Please input this field!' }]}
          >
            <Input type="text" id="lifespan" name="lifespan" />
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
}

UpdateModal.propTypes = {
  modalData: PropTypes.objectOf(PropTypes.object).isRequired,
  // getAllUsers: PropTypes.func.isRequired,
  handleRoleChange: PropTypes.func.isRequired,
  setModalVisible: PropTypes.func.isRequired,
  modalVisible: PropTypes.bool.isRequired,
  selectedRowKeys: PropTypes.arrayOf(PropTypes.any).isRequired,
  setselectedRowKeys: PropTypes.func.isRequired,
};

export default UpdateModal;
