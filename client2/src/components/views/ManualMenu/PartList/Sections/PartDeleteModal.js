import React from 'react';
import { Modal, message } from 'antd';
import PropTypes from 'prop-types';
import { useDispatch, useSelector } from 'react-redux';
import { deleteParts } from '../../../../../_actions/part_actions';

function PartDeleteModal(props) {
  const { showDeleteConfirm, setshowDeleteConfirm, selectedRowKeys, getParts } =
    props;
  const dispatch = useDispatch();
  const parts = useSelector(state => state?.part?.parts?.parts);

  const body = {
    id: [],
  };

  selectedRowKeys.forEach(part => {
    body.id.push(part._id);
  });

  const deleteOk = () => {
    // redux post
    dispatch(deleteParts(body))
      .then(res => {
        const oktem = [];
        const failtem = [];

        res.payload.fail.forEach(v => {
          parts.forEach(e => {
            if (e._id === v) failtem.push(e.id);
          });
        });

        if (res.payload.success) {
          /* eslint no-underscore-dangle: 0 */
          res.payload.ok.forEach(v => {
            parts.forEach(e => {
              if (e._id === v) oktem.push(e.id);
            });
          });

          if (oktem.length) message.success(`삭제 완료: ${oktem}`);
          if (failtem.length) message.warning(`삭제 실패: ${failtem}`);
        } else {
          message.error(`삭제 실패: ${failtem}`);
          message.error('엔진이나 사이트 목록에 사용되고 있습니다.');
        }
      })
      .catch(err => {
        message.error(`[Error]: ${err}`);
      })
      .finally(() => {
        getParts();
        setshowDeleteConfirm(false);
      });
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
  selectedRowKeys: PropTypes.arrayOf(PropTypes.any).isRequired,
  getParts: PropTypes.func.isRequired,
};
