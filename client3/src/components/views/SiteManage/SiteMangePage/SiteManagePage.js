import React, { useState, useEffect } from 'react';
import {
  Table,
  Space,
  Button,
  message,
  Popconfirm,
  Spin,
  Breadcrumb,
} from 'antd';
import {
  DeleteFilled,
  PlusOutlined,
  EditOutlined,
  QuestionCircleOutlined,
  ReloadOutlined,
} from '@ant-design/icons';
import { useDispatch } from 'react-redux';

import columns from './data/columns';
import { getAllSites, deleteSite } from '../../../../_actions/site_actions';
import SiteAddModal from './Sections/SiteAddModal';
import SiteUpdateModal from './Sections/SiteUpdateModal';

function SiteManagePage() {
  const dispatch = useDispatch();
  const [Sites, setSites] = useState([]);
  const [selectedRowKeys, setselectedRowKeys] = useState([]);
  const [Loading, setLoading] = useState(false);
  const [ShowAddModal, setShowAddModal] = useState(false);
  const [ShowUpdateModal, setShowUpdateModal] = useState(false);
  const [SelectedSite, setSelectedSite] = useState({});

  const getSites = () => {
    setLoading(true);
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

  const onClickUpdate = site => {
    setSelectedSite(site);
    setShowUpdateModal(true);
  };

  const deleteConfirm = site => {
    let body;
    if (site) {
      if (site[0] === '본사') {
        message.warning('본사는 삭제할 수 없습니다.');
        return;
      }
      body = {
        _id: site,
      };
    } else {
      const selID = selectedRowKeys
        .filter(v => {
          if (v.name === '본사') {
            message.warning('본사는 삭제할 수 없습니다.');
            return false;
          }
          return true;
        })
        .map(v => {
          return v._id;
        });
      body = {
        _id: selID,
      };
    }

    dispatch(deleteSite(body))
      .then(res => {
        const oktem = [];
        const failtem = [];

        if (res.payload.success) {
          res.payload.ok.forEach(v => {
            Sites.forEach(e => {
              if (e._id === v) oktem.push(e.id);
            });
          });

          message.success('사이트를 삭제했습니다.');
          message.success(`[성공]: ${oktem}`);

          if (res.payload.fail.length !== 0) {
            res.payload.fail.forEach(v => {
              Sites.forEach(e => {
                if (e._id === v) failtem.push(e.name);
              });
            });

            message.warning('사용자 필드가 참조하고 있습니다.');
            message.warning(`[실패]: ${failtem}`);
          }
        } else {
          message.error('사이트 삭제 실패: 사용자 필드가 참조하고 있습니다.');
        }
      })
      .catch(err => {
        message.error(`[Error]: `, err);
      })
      .finally(() => {
        getSites();
      });
  };

  const col2 = [
    {
      title: '수정',
      dataIndex: 'update',
      key: '4',
      render: (r, site) => {
        return (
          <Space size="middle">
            <Button onClick={() => onClickUpdate(site)}>
              <EditOutlined />
            </Button>
          </Space>
        );
      },
      width: 50,
      align: 'center',
    },
    {
      title: '삭제',
      key: '5',
      render: (r, site) => {
        let id = site._id;
        if (site.name === '본사') {
          id = '본사';
        }

        return (
          <Space size="middle">
            <Popconfirm
              placement="leftBottom"
              title="정말로 삭제하시겠습니까?"
              onConfirm={() => deleteConfirm([id])}
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
      width: 50,
      align: 'center',
      responsive: ['lg'],
    },
  ];
  const col = [...columns, ...col2];

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
        <Breadcrumb.Item>사이트 관리</Breadcrumb.Item>
      </Breadcrumb>
      <Spin spinning={Loading}>
        <div style={{ backgroundColor: 'white', padding: 20 }}>
          <div style={{ float: 'left', paddingLeft: '7px' }}>
            <h3>
              <strong>사이트 목록</strong>
            </h3>
          </div>
          <div style={{ float: 'right' }}>
            <Space>
              <Button onClick={() => setShowAddModal(true)}>
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
              <Button onClick={getSites}>
                <ReloadOutlined />
              </Button>
            </Space>
            <SiteAddModal
              ShowAddModal={ShowAddModal}
              setShowAddModal={setShowAddModal}
              getSites={getSites}
            />
            <SiteUpdateModal
              ShowUpdateModal={ShowUpdateModal}
              setShowUpdateModal={setShowUpdateModal}
              getSites={getSites}
              Site={SelectedSite}
            />
            <br />
            <br />
          </div>

          <Table
            style={{ overflow: 'auto' }}
            rowSelection={rowSelection}
            columns={col}
            dataSource={Sites}
            bordered
            scroll
            rowKey="_id"
          />
        </div>
      </Spin>
    </>
  );
}

export default SiteManagePage;
