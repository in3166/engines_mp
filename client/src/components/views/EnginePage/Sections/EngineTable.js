import React, { useState, useEffect } from 'react';
import { Table, message, Button } from 'antd';
import PropTypes from 'prop-types';
import { useDispatch } from 'react-redux';
import { SearchOutlined } from '@ant-design/icons';
import { getAllEngines } from '../../../../_actions/engine_actions';
import ColumnSearch from '../Data/ColumnSearch';
import PartsModal from './PartsModal';

function EngineTable(props) {
  const { columns } = props;
  const [Engines, setEngines] = useState([]);
  const [ShowPartsModal, setShowPartsModal] = useState(false);
  const [PartsInfo, setPartsInfo] = useState([]);

  const dispatch = useDispatch();
  console.log(Engines);

  columns[0] = { ...columns[0], ...ColumnSearch('id') };
  const handlerPartsShow = record => {
    setPartsInfo(record);
    setShowPartsModal(true);
  };
  const repairCol = [
    {
      title: '수리 이력',
      dataIndex: 'repairParts',
      key: '5',
      width: '100',
      render: () => {
        // console.log('text', text);
        // console.log('record', record);
        // console.log('index', index);
        return (
          <Button onClick>
            <SearchOutlined />
          </Button>
        );
      },
    },
    {
      title: '필요 부품',
      dataIndex: 'requiredParts',
      key: '4',
      width: '100',
      render: (text, record) => {
        //   console.log('text', text);
        // console.log('record', record);
        // console.log('index', index);
        return (
          <Button onClick={() => handlerPartsShow(record.requiredParts)}>
            <SearchOutlined />
          </Button>
        );
      },
    },
  ];

  const newColumns = [...columns, ...repairCol];
  const getEngines = () => {
    dispatch(getAllEngines())
      .then(res => {
        if (res.payload.success) {
          for (let i = 0; i < res.payload.engines.length; i += 1) {
            res.payload.engines[i].key = i;
          }

          setEngines(res.payload.engines);
        } else {
          message.error(res.payload.err);
        }
        // if (res.payload.loginSuccess) {
        //   window.localStorage.setItem('userId', res.payload.userId);
        // } else {
        //   message.error(res.payload.message);
        // }
      })
      .catch(err => {
        message.error(err);
      });
  };

  const useMountEffect = fun => useEffect(fun, []);
  useMountEffect(getEngines);

  return (
    <div>
      <Table columns={newColumns} dataSource={Engines} />
      <PartsModal
        ShowPartsModal={ShowPartsModal}
        setShowPartsModal={setShowPartsModal}
        PartsInfo={PartsInfo}
      />
    </div>
  );
}

export default EngineTable;

EngineTable.propTypes = {
  columns: PropTypes.arrayOf(PropTypes.object).isRequired,
};
