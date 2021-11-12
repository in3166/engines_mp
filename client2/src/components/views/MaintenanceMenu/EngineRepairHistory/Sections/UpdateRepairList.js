import React from 'react';
import PropTypes from 'prop-types';
import { Modal } from 'antd';

const UpdateRepairList = props => {
  const { SelectedRepair, setShowUpdateModal, ShowUpdateModal } = props;
  console.log(SelectedRepair);
  return (
    <Modal
      title="부품 정보 수정"
      style={{ top: 200 }}
      visible={ShowUpdateModal}
      destroyOnClose
      // onOk={form.submit}
      onCancel={() => setShowUpdateModal(false)}
    >
      {3}
    </Modal>
  );
};

UpdateRepairList.propTypes = {
  SelectedRepair: PropTypes.objectOf(PropTypes.any).isRequired,
  setShowUpdateModal: PropTypes.func.isRequired,
  ShowUpdateModal: PropTypes.bool.isRequired,
};

export default UpdateRepairList;
