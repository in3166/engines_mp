import React, { useState } from 'react';
import { Table, Divider, Button, Space, message, Popconfirm } from 'antd';
import PropTypes from 'prop-types';
import {
  DeleteFilled,
  EditOutlined,
  PlusOutlined,
  QuestionCircleOutlined,
} from '@ant-design/icons';
import axios from 'axios';
import { engineCol } from '../data/coulmns';
import repairCol from '../data/repairCol';
import SiteDescription from '../../../../utils/SiteDescription/SiteDescription';
import UpdateRepairList from './UpdateRepairList';
import AddRepairList from './AddRepairList';

function EngineList(props) {
  const { site, engine } = props;
  const [ShowUpdateModal, setShowUpdateModal] = useState(false);
  const [ShowAddModal, setShowAddModal] = useState(false);
  const [SelectedRepair, setSelectedRepair] = useState({});
  console.log('site: ', site);
  console.log('engine: ', engine);

  const repairUpdateHandler = part => {
    console.log(part);
    setSelectedRepair(part);
    setShowUpdateModal(true);
  };

  const repairAddHandler = v => {
    console.log('add: ', v);
    setSelectedRepair(v);
    setShowAddModal(true);
  };

  const deleteConfirm = id => {
    const body = {
      id: [id],
    };

    axios
      .post('/api/parts/deleteParts', body)
      .then(res => {
        if (res.data.success) {
          message.success('부품을 삭제하였습니다.');
        } else {
          message.error(
            '부품 삭제를 실패하였습니다. (다른 필드가 참조하고 있습니다.)',
          );
        }
      })
      .catch(err => {
        message.error(`[Error]: ${err}`);
      });
    // .finally(() => getParts());
  };

  const columnButton2 = [
    {
      title: '추가',
      key: 'action',
      render: v => {
        return (
          <Space size="middle">
            <Button onClick={() => repairAddHandler(v)}>
              <PlusOutlined />
            </Button>
          </Space>
        );
      },
      width: 70,
      align: 'center',
      responsive: ['sm'],
    },
  ];

  const columnButton = [
    {
      title: '수정',
      key: 'action',
      render: v => {
        return (
          <Space size="middle">
            <Button onClick={() => repairUpdateHandler(v)}>
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
              onConfirm={() => deleteConfirm(part._id)}
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

  const renderPartCol = [...repairCol, ...columnButton];
  const enginesCol = [...engineCol, ...columnButton2];

  const expandedRowRender = record => {
    console.log(record, 'record');
    return (
      <Table
        size="small"
        columns={renderPartCol}
        dataSource={record.repairHistory}
        rowKey={a => a.part.id}
        bordered
      />
    );
  };

  return (
    <>
      <SiteDescription site={site} />
      <Divider plain>
        <strong>Engine</strong>
      </Divider>
      <Table
        size="middle"
        columns={enginesCol}
        dataSource={engine}
        expandable={{ expandedRowRender }}
        rowKey="id"
        style={{ overflow: 'auto' }}
        scroll
      />

      <AddRepairList
        ShowAddModal={ShowAddModal}
        setShowAddModal={setShowAddModal}
        SelectedRepair={SelectedRepair}
      />
      <UpdateRepairList
        SelectedRepair={SelectedRepair}
        ShowUpdateModal={ShowUpdateModal}
        setShowUpdateModal={setShowUpdateModal}
      />
    </>
  );
}

export default EngineList;

EngineList.propTypes = {
  site: PropTypes.objectOf(PropTypes.any).isRequired,
  engine: PropTypes.arrayOf(PropTypes.object).isRequired,
};
