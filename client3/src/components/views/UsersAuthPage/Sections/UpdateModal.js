import React from 'react';
import { Modal, Select, Form, message } from 'antd';
import { useDispatch } from 'react-redux';
import PropTypes from 'prop-types';
import { changeRole } from '../../../../_actions/user_actions';

const { Option } = Select;

function UpdateModal(props) {
  const {
    modalData,
    getAllUsers,
    handleRoleChange,
    modalVisible,
    setModalVisible,
  } = props;
  const dispatch = useDispatch();
  // 수정 모달 OK 버튼 - redux
  const modalOnOk = () => {
    let newRole = modalData.role;
    // modalData.role === '일반 사용자'
    //   ? 0
    //   : modalData.role === '전문가'
    //   ? 2
    //   : 3;
    switch (newRole) {
      case '일반 사용자':
        newRole = 0;
        break;
      case '전문가':
        newRole = 2;
        break;
      case '엔지니어':
        newRole = 3;
        break;
      default:
        newRole = 0;
        break;
    }

    const body = {
      id: modalData.id,
      role: newRole,
    };

    // console.log(body);

    dispatch(changeRole(body))
      .then(res => {
        if (res.payload.success) {
          message.success('권한이 수정되었습니다.');
          getAllUsers();
        } else {
          message.error('권한 수정을 실패하였습니다.');
        }
      })
      .catch(err => {
        message.error(`[Error]: ${err}`);
      });

    setModalVisible(false);
  };

  return (
    <div>
      <Modal
        title="권한 수정"
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
            <p className="userpage_label">{modalData.id}</p>
          </Form.Item>
          <Form.Item label="이름">
            <p className="userpage_label">{modalData.name}</p>
          </Form.Item>
          <Form.Item label="Email">
            <p className="userpage_label">{modalData.email}</p>
          </Form.Item>
          <Form.Item label="권한">
            <Select
              value={modalData.role}
              style={{ width: 120 }}
              onChange={value => handleRoleChange(value)}
            >
              <Option value="일반 사용자">일반 사용자</Option>
              <Option value="전문가">전문가</Option>
              <Option value="엔지니어">엔지니어</Option>
            </Select>
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
}

UpdateModal.propTypes = {
  modalData: PropTypes.objectOf(PropTypes.object).isRequired,
  getAllUsers: PropTypes.func.isRequired,
  handleRoleChange: PropTypes.func.isRequired,
  setModalVisible: PropTypes.func.isRequired,
  modalVisible: PropTypes.bool.isRequired,
};

export default UpdateModal;
