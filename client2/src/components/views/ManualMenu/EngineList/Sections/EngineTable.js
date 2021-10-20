import React, { useState } from 'react';
import { Table, Button, Popconfirm, Space } from 'antd';
import PropTypes from 'prop-types';
import {
  SearchOutlined,
  DeleteFilled,
  QuestionCircleOutlined,
  EditOutlined,
} from '@ant-design/icons';

// import axios from 'axios';
import columns from '../data/columns';
import RequiredPartsModal from './RequiredPartsModal/RequiredPartsModal';
import TableButtons from '../../../../utils/TableButtons/TableButtons';
import EngineAddModal from './EngineAddModal';
import EngineUpdateModal from './EngineUpdateModal';

function EngineTable(props) {
  const { Engines, selectedRowKeys, setselectedRowKeys, getEngines } = props;

  const [ShowPartsModal, setShowPartsModal] = useState(false);
  const [PartsInfo, setPartsInfo] = useState([]);
  const [selectedEngine, setselectedEngine] = useState({});

  const [showAddConfirm, setshowAddConfirm] = useState(false);
  const [ShowEngineUpdate, setShowEngineUpdate] = useState(false);

  const handlerPartsShow = record => {
    setPartsInfo(record);
    setShowPartsModal(true);
  };

  // 개별 삭제 버튼
  const deleteConfirm = id => {
    const body = {
      id,
    };
    console.log('del: ', body);
    // axios
    //   .post('/api/engines/deleteEngines', body)
    //   .then(res => {
    //     if (res.data.success) {
    //       message.success('엔진을 삭제하였습니다.');
    //     } else {
    //       message.error(
    //         '엔진 삭제를 실패하였습니다. (다른 필드가 참조하고 있습니다.)',
    //       );
    //     }
    //   })
    //   .catch(err => {
    //     message.error(`[Error]: ${err}`);
    //   })
    //   .finally(() => getEngines());
  };

  const updateEngineButton = part => {
    // 행에 있는 수정 버튼
    setselectedEngine(...part);
    setShowEngineUpdate(true);
  };

  const columnButton = [
    {
      title: '필요 부품',
      dataIndex: 'requiredParts',
      key: '4',
      width: '100',
      render: (text, record) => {
        // console.log('text', text);
        console.log('record', record);
        // console.log('index', index);
        return (
          <Button onClick={() => handlerPartsShow(record)}>
            <SearchOutlined />
          </Button>
        );
      },
    },
    {
      title: '수정',
      key: 'action',
      render: part => {
        return (
          <Space size="middle">
            <Button onClick={() => updateEngineButton([part], true)}>
              <EditOutlined />
            </Button>
          </Space>
        );
      },
      width: 70,
      align: 'center',
      responsive: ['sm'],
    },
    {
      title: '삭제',
      key: 'action',
      render: part => {
        /* eslint no-underscore-dangle: 0 */
        return (
          <Space size="middle">
            <Popconfirm
              placement="leftBottom"
              title="정말로 삭제하시겠습니까?"
              onConfirm={() => deleteConfirm([part._id])}
              okText="Yes"
              cancelText="No"
              icon={<QuestionCircleOutlined style={{ color: 'red' }} />}
            >
              <Button>
                <DeleteFilled />
              </Button>
            </Popconfirm>
          </Space>
        );
      },
      width: 70,
      align: 'center',
      responsive: ['sm'],
    },
  ];

  const columns2 = [...columns, ...columnButton];

  const rowSelection = {
    /* eslint no-underscore-dangle: 0 */
    ...selectedRowKeys._id,
    onChange: (selectedRowKey, sel2) => {
      setselectedRowKeys(sel2);
    },
    selections: [
      Table.SELECTION_ALL,
      Table.SELECTION_NONE,
      Table.SELECTION_INVERT,
    ],
  };
  return (
    <>
      <TableButtons
        setShowAddModal={setshowAddConfirm}
        deleteConfirm={deleteConfirm}
        setShowUpdateModal={setShowEngineUpdate}
        selectedRowKeys={selectedRowKeys}
        setselectedPart={setselectedEngine}
      />
      <EngineAddModal
        showAddConfirm={showAddConfirm}
        setshowAddConfirm={setshowAddConfirm}
        getEngines={getEngines}
      />
      {selectedEngine && (
        <EngineUpdateModal
          showUpdateConfirm={ShowEngineUpdate}
          setshowUpdateConfirm={setShowEngineUpdate}
          selectedEngine={selectedEngine}
          getEngines={getEngines}
        />
      )}
      <br />
      <br />

      <Table
        rowSelection={rowSelection}
        columns={columns2}
        dataSource={Engines}
        rowKey="_id"
      />

      {ShowPartsModal && (
        <RequiredPartsModal
          ShowPartsModal={ShowPartsModal}
          setShowPartsModal={setShowPartsModal}
          PartsInfo={PartsInfo}
          getEngines={getEngines}
        />
      )}
    </>
  );
}

export default EngineTable;

EngineTable.propTypes = {
  Engines: PropTypes.arrayOf(PropTypes.object).isRequired,
  selectedRowKeys: PropTypes.arrayOf(PropTypes.any).isRequired,
  setselectedRowKeys: PropTypes.func.isRequired,
  getEngines: PropTypes.func.isRequired,
};
