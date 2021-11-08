import React, { useState, useEffect } from 'react';
import {
  Table,
  Space,
  Button,
  message,
  Popconfirm,
  Spin,
  Breadcrumb,
  Tabs,
} from 'antd';
import {
  DeleteFilled,
  QuestionCircleOutlined,
  SearchOutlined,
  ReloadOutlined,
} from '@ant-design/icons';
import { useDispatch } from 'react-redux';
import axios from 'axios';
import { getAllSites } from '../../../../_actions/site_actions';
import col from './data/columns';
// import RequriedList from './Sections/RequriedList';
// import AddEngine from './Sections/AddEngine';
import SiteInfo from './Sections/SiteInfo';
import SiteEngineList from './Sections/SiteEngineList';

const { TabPane } = Tabs;

function SiteEngine() {
  const [Sites, setSites] = useState([]);
  const [Engines, setEngines] = useState([]);
  const [Loading, setLoading] = useState([]);
  const [selectedRowKeys, setselectedRowKeys] = useState([]);

  const [ShowAddEngine, setShowAddEngine] = useState(false);
  const [ShowRequiredParts, setShowRequiredParts] = useState(false);
  const [RequiredPartsInfo, setRequiredPartsInfo] = useState([]);
  const dispatch = useDispatch();

  console.log('site', Sites);
  console.log('engine', Engines);

  const getEngines = () => {
    axios.get('/api/engines/getAllEngines').then(res => {
      setEngines(res.data.engines);
    });
  };

  const getSites = () => {
    setLoading(true);
    getEngines();
    dispatch(getAllSites())
      .then(res => {
        if (res.payload.success) {
          setSites(res.payload.sites);
        } else {
          message.error(`[Error]: ${res.payload.err}`);
        }
      })
      .catch(err => {
        message.error(`[Error]: ${err}`);
      })
      .finally(() => {
        setTimeout(() => {
          setLoading(false);
        }, 200);
      });
  };

  const useMountEffect = fun => {
    useEffect(fun, []);
  };
  useMountEffect(getSites);

  const requiredListHandler = (text, record) => {
    console.log('text', text);
    console.log('record', record);
    setRequiredPartsInfo(text);
    setShowRequiredParts(true);
  };

  const deleteConfirm = id => {
    console.log('id', id);
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
      render: part => {
        console.log(part);
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
      <Breadcrumb style={{ margin: '16px 0' }}>
        <Breadcrumb.Item>Home</Breadcrumb.Item>
        <Breadcrumb.Item>사이트 관리</Breadcrumb.Item>
        <Breadcrumb.Item>사이트별 엔진 관리</Breadcrumb.Item>
      </Breadcrumb>
      <Spin spinning={Loading}>
        <div style={{ backgroundColor: 'white', padding: 20 }}>
          <Tabs
            defaultActiveKey="1"
            size="large"
            style={{ background: 'white', padding: '0 20px 10px 20px' }}
            tabBarExtraContent={
              <Button onClick={getSites}>
                <ReloadOutlined />
              </Button>
            }
          >
            {Sites.length > 0 &&
              Sites.map((value, i) => {
                const key = `tabs${i}`;
                return (
                  <TabPane tab={value.name} key={key}>
                    <SiteInfo site={value} />
                    <SiteEngineList
                      ShowAddEngine={ShowAddEngine}
                      setShowAddEngine={setShowAddEngine}
                      ShowRequiredParts={ShowRequiredParts}
                      RequiredPartsInfo={RequiredPartsInfo}
                      setShowRequiredParts={setShowRequiredParts}
                    />
                    <br />
                    <br />
                    <Table
                      size="middle"
                      columns={columns2}
                      dataSource={value.engines}
                      // expandable={{ expandedRowRender }}
                      rowSelection={rowSelection}
                      rowKey="name"
                    />
                  </TabPane>
                );
              })}
          </Tabs>
        </div>
      </Spin>
    </>
  );
}

export default SiteEngine;
