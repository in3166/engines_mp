import React, { useState } from 'react';
import { Table } from 'antd';
import PropTypes from 'prop-types';
import ColumnSearch from '../Data/ColumnSearch';
import PartsModal from './PartsModal';
import MaintenanceModal from './MaintenanceModal';
import columns from '../Data/Columns';

function EngineTable(props) {
  const { parts, setLineData } = props;
  const [selectedRowKeys, setselectedRowKeys] = useState([parts[0]?._id]);
  const [ShowPartsModal, setShowPartsModal] = useState(false);
  const [ShowMaintenanceModal, setShowMaintenanceModal] = useState(false);

  columns[0] = { ...columns[0], ...ColumnSearch('id') };

  const rowSelection = {
    selectedRowKeys,
    onChange: selectedRowKey => {
      setselectedRowKeys(selectedRowKey);
      const rand = [];
      const temp = {
        labels: ['', '', '', '', '', '', '', '', '', '', ''],
        datasets: [
          {
            label: 'First dataset',
            fill: true,
            backgroundColor: 'rgba(75,192,192,0.2)',
            borderColor: 'rgba(75,192,192,1)',
          },
        ],
      };
      const max = 95;
      const min = 15;
      for (let i = 0; i < 20; i += 1) {
        const randomNum = Math.random() * (max - min + 1) + min;
        const randomNumFloor = Math.floor(randomNum);
        rand.push(randomNumFloor);
      }
      temp.datasets[0].data = rand;
      setLineData(temp);
    },
  };

  return (
    <div>
      <Table
        rowSelection={{
          type: 'radio',
          ...rowSelection,
        }}
        columns={columns}
        dataSource={parts}
        tableLayout="fixed"
        style={{ width: '100%' }}
        rowKey="_id"
      />
      {ShowPartsModal && (
        <PartsModal
          ShowPartsModal={ShowPartsModal}
          setShowPartsModal={setShowPartsModal}
        />
      )}
      {ShowMaintenanceModal && (
        <MaintenanceModal
          ShowMaintenanceModal={ShowMaintenanceModal}
          setShowMaintenanceModal={setShowMaintenanceModal}
        />
      )}
    </div>
  );
}

export default EngineTable;

EngineTable.propTypes = {
  parts: PropTypes.arrayOf(PropTypes.any).isRequired,
  setLineData: PropTypes.func.isRequired,
};
