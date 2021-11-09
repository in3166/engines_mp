import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Space, Button, Popconfirm, Table, message } from 'antd';
import {
  DeleteFilled,
  PlusOutlined,
  QuestionCircleOutlined,
  SearchOutlined,
} from '@ant-design/icons';

import { useDispatch } from 'react-redux';
import RequriedList from './RequriedList';
import AddEngine from './AddEngine';
// import UpdateSiteEngine from './UpdateSiteEngine';
import col from '../data/columns';
import { deleteSiteEngines } from '../../../../../_actions/site_actions';

const SiteEngineList = props => {
  const { site, getSites } = props;

  const [selectedRowKeys, setselectedRowKeys] = useState([]);
  const [ShowAddEngine, setShowAddEngine] = useState(false);
  const [ShowRequiredParts, setShowRequiredParts] = useState(false);
  const [RequiredPartsInfo, setRequiredPartsInfo] = useState([]);

  // const [ShowUpdateSiteEngine, setShowUpdateSiteEngine] = useState(false);
  const dispatch = useDispatch();

  const deleteConfirm = id => {
    // dispatch(deleteSiteEngines())
    //   .then(res => {
    //     console.log(res);
    //   })
    //   .catch();
    let ids = id;
    console.log('site', site);
    if (!id) {
      ids = selectedRowKeys.map(v => v.id);
      console.log('selectedRowKeys: ', ids);
    }
    const body = {
      site: site._id,
      engines: ids,
    };
    console.log(body);
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
    console.log('text', text);
    console.log('record', record?.engine?.requiredParts);
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
        // console.log('index', index);
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
          {/* <Button onClick={() => setShowUpdateSiteEngine(true)}>
          <EditOutlined />
        </Button> */}
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

          {/* {ShowUpdateSiteEngine && (
          <UpdateSiteEngine
            ShowUpdateSiteEngine={ShowUpdateSiteEngine}
            setShowUpdateSiteEngine={setShowUpdateSiteEngine}
            site={site}
            getSites={getSites}
          />
        )} */}
        </Space>
      </div>

      <br />
      <br />
      <Table
        size="middle"
        columns={columns2}
        dataSource={site.engines}
        // expandable={{ expandedRowRender }}
        rowSelection={rowSelection}
        rowKey="id"
      />
    </>
  );
};

SiteEngineList.propTypes = {
  // setShowAddEngine: PropTypes.func.isRequired,
  // ShowAddEngine: PropTypes.bool.isRequired,
  // setShowRequiredParts: PropTypes.func.isRequired,
  getSites: PropTypes.func.isRequired,
  // ShowRequiredParts: PropTypes.bool.isRequired,
  // RequiredPartsInfo: PropTypes.arrayOf(PropTypes.any).isRequired,
  site: PropTypes.objectOf(PropTypes.any).isRequired,
};

export default SiteEngineList;
