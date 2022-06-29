import React from 'react';
import PropTypes from 'prop-types';
import { Modal, Table } from 'antd';
import reqCol from '../data/reqCol';

const RequriedList = props => {
  const { engines, ShowRequiredParts, setShowRequiredParts } = props;

  return (
    <Modal
      visible={ShowRequiredParts}
      title="필요 부품"
      style={{ top: 100 }}
      onOk={() => setShowRequiredParts(false)}
      onCancel={() => setShowRequiredParts(false)}
      destroyOnClose
      width="80%"
    >
      <Table
        dataSource={engines}
        size="middle"
        columns={reqCol}
        rowKey={v => v.part.name}
      />
    </Modal>
  );
};

RequriedList.propTypes = {
  engines: PropTypes.arrayOf(PropTypes.any).isRequired,
  ShowRequiredParts: PropTypes.bool.isRequired,
  setShowRequiredParts: PropTypes.func.isRequired,
};

export default RequriedList;
