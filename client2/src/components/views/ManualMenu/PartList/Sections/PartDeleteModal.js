import React from 'react';
import { Modal, message } from 'antd';
import PropTypes from 'prop-types';
import { useDispatch } from 'react-redux';
import { deletePart } from '../../../../../_actions/part_actions';

function PartDeleteModal(props) {
  const {
    showDeleteConfirm,
    setshowDeleteConfirm,
    selectedRowKey,
    setselectedRowKeys,
    getParts,
  } = props;
  const dispatch = useDispatch();

  const body = {
    id: [],
  };

  selectedRowKey.forEach(id => {
    body.id.push(id);
  });

  console.log(selectedRowKey);
  const deleteOk = () => {
    // redux post
    dispatch(deletePart(body))
      .then(res => {
        if (res.payload.success) {
          message.success('부품을 삭제하였습니다.');
          setselectedRowKeys([]);
          getParts();
        } else {
          console.log(res.payload);
          message.error(res.payload.message);
        }
      })
      .catch(err => {
        message.error(`[Error]: ${err}`);
      });
    setshowDeleteConfirm(false);
  };

  return (
    <>
      <Modal
        title="부품 삭제"
        visible={showDeleteConfirm}
        onOk={deleteOk}
        onCancel={() => setshowDeleteConfirm(false)}
        okText="Yes"
        cancelText="No"
      >
        <p>정말로 삭제하겠습니까?</p>
      </Modal>
    </>
  );
}

export default PartDeleteModal;

PartDeleteModal.propTypes = {
  showDeleteConfirm: PropTypes.bool.isRequired,
  setshowDeleteConfirm: PropTypes.func.isRequired,
  selectedRowKey: PropTypes.arrayOf(PropTypes.string).isRequired,
  setselectedRowKeys: PropTypes.func.isRequired,
  getParts: PropTypes.func.isRequired,
};
