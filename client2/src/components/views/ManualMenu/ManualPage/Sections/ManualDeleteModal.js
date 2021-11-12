import React from 'react';
import { Modal, message } from 'antd';
import PropTypes from 'prop-types';
import { useDispatch, useSelector } from 'react-redux';
import { deleteManuals } from '../../../../../_actions/manual_actions';

function ManualDeleteModal(props) {
  const {
    showDeleteConfirm,
    setshowDeleteConfirm,
    selectedRowKeys,
    getManuals,
  } = props;
  const dispatch = useDispatch();
  const manuals = useSelector(state => state?.manual?.manuals?.manuals);

  const body = {
    id: [],
  };

  selectedRowKeys.forEach(manual => {
    body.id.push(manual._id);
  });

  const deleteOk = () => {
    // redux post
    dispatch(deleteManuals(body))
      .then(res => {
        const oktem = [];
        const failtem = [];

        res.payload.fail.forEach(v => {
          manuals.forEach(e => {
            if (e._id === v) failtem.push(e.id);
          });
        });

        if (res.payload.success) {
          /* eslint no-underscore-dangle: 0 */
          res.payload.ok.forEach(v => {
            manuals.forEach(e => {
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
        console.log('지우고 새로');
        getManuals();
        console.log('지우고 새로 끗');
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

export default ManualDeleteModal;

ManualDeleteModal.propTypes = {
  showDeleteConfirm: PropTypes.bool.isRequired,
  setshowDeleteConfirm: PropTypes.func.isRequired,
  selectedRowKeys: PropTypes.arrayOf(PropTypes.any).isRequired,
  getManuals: PropTypes.func.isRequired,
};
