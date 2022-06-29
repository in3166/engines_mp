import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import PropTypes from 'prop-types';
import { Space, Button, Popconfirm, Table, message } from 'antd';
import {
  DeleteFilled,
  PlusOutlined,
  QuestionCircleOutlined,
  SearchOutlined,
} from '@ant-design/icons';

import RequriedList from './RequriedList';
import AddEngine from './AddEngine';
import col from '../data/columns';
import { deleteSiteEngines } from '../../../../../_actions/site_actions';

const SiteEngineList = props => {
  const { site, getSites } = props;

  const [selectedRowKeys, setselectedRowKeys] = useState([]);
  const [ShowAddEngine, setShowAddEngine] = useState(false);
  const [ShowRequiredParts, setShowRequiredParts] = useState(false);
  const [RequiredPartsInfo, setRequiredPartsInfo] = useState([]);
  const dispatch = useDispatch();

  const deleteConfirm = id => {
    let ids = id;
    if (!id) {
      ids = selectedRowKeys.map(v => v.id);
    }
    const body = {
      site: site._id,
      engines: ids,
    };
    dispatch(deleteSiteEngines(body))
      .then(res => {
        if (res.payload.success) {
          message.success('엔진을 삭제하였습니다.');
        } else {
          message.warning(res.payload.message);
        }
      })
      .catch(err => {
        message.error(`[Error]: ${err}`);
      })
      .finally(() => getSites());
  };

  const requiredListHandler = (text, record) => {
    setRequiredPartsInfo(record?.engine?.requiredParts);
    setShowRequiredParts(true);
  };

  const columnButton = [
    {
      title: '필요 부품',
      dataIndex: 'requiredParts',
      key: '4',
      width: 70,
      align: 'center',
      render: (text, record) => {
        return (
          <Button onClick={() => requiredListHandler(text, record)}>
            <SearchOutlined />
          </Button>
        );
      },
    },
    {
      title: '삭제',
      key: 'action',
      render: engine => {
        return (
          <Space size="middle">
            <Popconfirm
              placement="leftBottom"
              title="정말로 삭제하시겠습니까?"
              onConfirm={() => deleteConfirm([engine.id])}
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
      responsive: ['md'],
    },
  ];

  const columns2 = [...col, ...columnButton];

  const rowSelection = {
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
      <div style={{ float: 'right' }}>
        <Space>
          <Button onClick={() => setShowAddEngine(true)}>
            <PlusOutlined />
          </Button>
          <Space size="middle">
            <Popconfirm
              placement="leftBottom"
              title="정말로 삭제하시겠습니까?"
              onConfirm={() => deleteConfirm()}
              okText="Yes"
              cancelText="No"
              icon={<QuestionCircleOutlined style={{ color: 'red' }} />}
            >
              <Button>
                <DeleteFilled />
              </Button>
            </Popconfirm>
          </Space>
          {ShowRequiredParts && (
            <RequriedList
              engines={RequiredPartsInfo}
              ShowRequiredParts={ShowRequiredParts}
              setShowRequiredParts={setShowRequiredParts}
            />
          )}
          <AddEngine
            ShowAddEngine={ShowAddEngine}
            setShowAddEngine={setShowAddEngine}
            site={site}
            getSites={getSites}
          />
        </Space>
      </div>

      <br />
      <br />
      <Table
        size="middle"
        columns={columns2}
        dataSource={site.engines}
        rowSelection={rowSelection}
        rowKey="id"
      />
    </>
  );
};

SiteEngineList.propTypes = {
  getSites: PropTypes.func.isRequired,
  site: PropTypes.objectOf(PropTypes.any).isRequired,
};

export default SiteEngineList;
