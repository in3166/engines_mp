import React, { useState } from 'react';
import { Table } from 'antd';
import PropTypes from 'prop-types';
import ColumnSearch from '../Data/ColumnSearch';
import PartsModal from './PartsModal';
import MaintenanceModal from './MaintenanceModal';
import columns from '../Data/Columns';

function EngineTable(props) {
  const { parts, setLineData } = props;
  // const [Engines, setEngines] = useState([]);
  const [selectedRowKeys, setselectedRowKeys] = useState([parts[0]?._id]);
  const [ShowPartsModal, setShowPartsModal] = useState(false);
  const [ShowMaintenanceModal, setShowMaintenanceModal] = useState(false);
  // const [PartsInfo, setPartsInfo] = useState([]);
  // const [MaintenanceInfo, setMaintenanceInfo] = useState([]);

  // const dispatch = useDispatch();
  console.log('모든 엔진들', parts);

  columns[0] = { ...columns[0], ...ColumnSearch('id') };

  // const handlerPartsShow = record => {
  //   setPartsInfo(record);
  //   setShowPartsModal(true);
  // };

  // const handleMaintenanceShow = record => {
  //   console.log('ma', record);
  //   setMaintenanceInfo(record);
  //   setShowMaintenanceModal(true);
  // };

  const repairCol = [
    // {
    //   title: '수리 이력',
    //   dataIndex: 'repairParts',
    //   key: '5',
    //   width: '100',
    //   render: (text, record) => {
    //     // console.log('text', text);
    //     // console.log('record', record);
    //     // console.log('index', index);
    //     return (
    //       <Button
    //         onClick={() => handleMaintenanceShow(record.maintenanceHistory)}
    //       >
    //         <SearchOutlined />
    //       </Button>
    //     );
    //   },
    // },
  ];

  const newColumns = [...columns, ...repairCol];
  // const getEngines = () => {
  //   dispatch(getAllEngines())
  //     .then(res => {
  //       if (res.payload.success) {
  //         for (let i = 0; i < res.payload.engines.length; i += 1) {
  //           res.payload.engines[i].key = i;
  //         }

  //         setEngines(res.payload.engines);
  //       } else {
  //         message.error(res.payload.err);
  //       }
  //       // if (res.payload.loginSuccess) {
  //       //   window.localStorage.setItem('userId', res.payload.userId);
  //       // } else {
  //       //   message.error(res.payload.message);
  //       // }
  //     })
  //     .catch(err => {
  //       message.error(err);
  //     });
  // };

  // const useMountEffect = fun => useEffect(fun, []);
  // useMountEffect(getEngines);

  const rowSelection = {
    selectedRowKeys,
    onChange: selectedRowKey => {
      console.log(selectedRowKey);
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
        columns={newColumns}
        dataSource={parts}
        tableLayout="fixed"
        style={{ width: '100%' }}
        rowKey="_id"
      />
      {ShowPartsModal && (
        <PartsModal
          ShowPartsModal={ShowPartsModal}
          setShowPartsModal={setShowPartsModal}
          //  PartsInfo={PartsInfo}
        />
      )}
      {ShowMaintenanceModal && (
        <MaintenanceModal
          ShowMaintenanceModal={ShowMaintenanceModal}
          setShowMaintenanceModal={setShowMaintenanceModal}
          //   MaintenanceInfo={MaintenanceInfo}
        />
      )}
    </div>
  );
}

export default EngineTable;

EngineTable.propTypes = {
  parts: PropTypes.arrayOf(PropTypes.any).isRequired,
  // LineData: PropTypes.objectOf(PropTypes.any).isRequired,
  setLineData: PropTypes.func.isRequired,
};
