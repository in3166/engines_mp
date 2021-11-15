import React from 'react';
import { Modal, Input, Form, message } from 'antd';
// import { useDispatch } from 'react-redux';
import PropTypes from 'prop-types';
// import { changeRole } from '../../../../../_actions/user_actions';

function UpdateModal(props) {
  const {
    modalData,
    modalVisible,
    setModalVisible,
    selectedRowKeys,
    setselectedRowKeys,
  } = props;
  const [form] = Form.useForm();
  // const dispatch = useDispatch();
  // 수정 모달 OK 버튼 - redux
  const modalOnOk = () => {
    console.log(modalData);
    message.success('성공');
    // const body = {
    //   id: modalData.id,
    // };

    // console.log(body);

    // dispatch(changeRole(body))
    //   .then(res => {
    //     if (res.payload.success) {
    //       message.success('권한이 수정되었습니다.');
    //       getAllUsers();
    //     } else {
    //       message.error('권한 수정을 실패하였습니다.');
    //     }
    //   })
    //   .catch(err => {
    //     message.error(`[Error]: ${err}`);
    //   });

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
