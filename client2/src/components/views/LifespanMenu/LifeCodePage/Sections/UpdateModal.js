import React from 'react';
import { Modal, Input, Form } from 'antd';
// import { useDispatch } from 'react-redux';
import PropTypes from 'prop-types';
// import { changeRole } from '../../../../../_actions/user_actions';

function UpdateModal(props) {
  const { modalData, modalVisible, setModalVisible } = props;
  // const dispatch = useDispatch();
  // 수정 모달 OK 버튼 - redux
  const modalOnOk = () => {
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
  };

  return (
    <div>
      <Modal
        title="사용 연한 수정"
        style={{ top: 200 }}
        visible={modalVisible}
        onOk={() => modalOnOk()}
        onCancel={() => setModalVisible(false)}
      >
        <Form
          {...{ labelCol: { span: 6 }, wrapperCol: { span: 14 } }}
          name="userinfo-change"
        >
          <Form.Item label="ID">
            <Input type="text" value={modalData.id} />
          </Form.Item>
          <Form.Item label="이름">
            <Input type="text" value={modalData.name} />
          </Form.Item>
          <Form.Item label="설명">
            <Input type="text" value={modalData.desc} />
          </Form.Item>
          <Form.Item label="예상 수명">
            <Input type="text" value={modalData.lifespan} />
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
};

export default UpdateModal;
