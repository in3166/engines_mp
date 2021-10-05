import React from 'react';
import { Modal, Button, message } from 'antd';
import { DeleteFilled } from '@ant-design/icons';
import PropTypes from 'prop-types';
import { useDispatch } from 'react-redux';
import { deleteUsers } from '../../../../_actions/user_actions';

function DeleteModal(props) {
  const {
    setshowDeleteConfirm,
    showDeleteConfirm,
    selectedUsers,
    setSelectedRowKeys,
    getAllUsers,
  } = props;

  const body = {
    id: [],
  };

  selectedUsers.forEach(userSel => {
    body.id.push(userSel.id);
  });

  const dispatch = useDispatch();
  // 회원 탈퇴 버튼
  const deleteUsersButton = () => {
    if (body.id.length === 0) {
      message.error('사용자를 선택하세요.');
    } else {
      setshowDeleteConfirm(true);
    }
  };

  const deleteOk = () => {
    // redux post
    dispatch(deleteUsers(body))
      .then(res => {
        if (res.payload.success) {
          message.success('회원 탈퇴를 완료하였습니다.');
          setSelectedRowKeys([]);
          getAllUsers();
        } else {
          message.error('회원 탈퇴를 실패하였습니다. ', res.payload.err);
        }
      })
      .catch(err => {
        message.error(`[Error]: ${err}`);
      });
    setshowDeleteConfirm(false);
  };

  return (
    <>
      <Button onClick={deleteUsersButton}>
        <DeleteFilled />
      </Button>
      <Modal
        title="회원 탈퇴"
        visible={showDeleteConfirm}
        onOk={deleteOk}
        onCancel={() => setshowDeleteConfirm(false)}
        okText="Yes"
        cancelText="No"
      >
        <p>정말 탈퇴시키겠습니까?</p>
      </Modal>
    </>
  );
}

export default DeleteModal;

DeleteModal.propTypes = {
  setshowDeleteConfirm: PropTypes.elementType.isRequired,
  showDeleteConfirm: PropTypes.bool.isRequired,
  selectedUsers: PropTypes.arrayOf(
    PropTypes.shape({
      user: PropTypes.string,
    }),
  ).isRequired,
  setSelectedRowKeys: PropTypes.elementType.isRequired,
  getAllUsers: PropTypes.elementType.isRequired,
};
