import React, { useState, useEffect } from 'react';
// import { SearchOutlined } from '@ant-design/icons';
import PropTypes from 'prop-types';
import {
  DeleteFilled,
  EditOutlined,
  PlusOutlined,
  QuestionCircleOutlined,
  ReloadOutlined,
} from '@ant-design/icons';
import {
  Breadcrumb,
  Tabs,
  Space,
  message,
  Spin,
  Button,
  Popconfirm,
} from 'antd';
import { useDispatch, useSelector } from 'react-redux';

import { getAllSites } from '../../../../_actions/site_actions';
import EnginePartList from './Sections/EnginePartList';

function BranchStocksPage(props) {
  const { user } = props;
  const [Sites, setSites] = useState([]);
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const site = useSelector(state => state.site.sites);

  const reload = () => {
    setLoading(true);
    dispatch(getAllSites())
      .then(res => {
        if (res.payload.success) {
          setSites(res.payload.sites);
        } else {
          message.error(res.payload.err);
        }
      })
      .catch(err => {
        message.error(err);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  const getSites = () => {
    if (site?.sites) {
      setSites(site.sites);
    } else {
      reload();
    }
  };

  const useMountEffect = fun => useEffect(fun, []);
  useMountEffect(getSites);

  if (!user?.userData?.isAuth) return null;

  return (
    <>
      <Breadcrumb style={{ margin: '16px 0' }}>
        <Breadcrumb.Item>부품/자재 관리</Breadcrumb.Item>
        <Breadcrumb.Item>부품/자재 재고 관리</Breadcrumb.Item>
        <Breadcrumb.Item>사이트별 목록 관리</Breadcrumb.Item>
      </Breadcrumb>
      <Tabs
        defaultActiveKey="1"
        size="large"
        style={{ background: 'white', padding: '0 20px 10px 20px' }}
        tabBarExtraContent={
          <Button onClick={reload}>
            <ReloadOutlined />
          </Button>
        }
      >
        {Sites.length > 0 &&
          Sites.map((value, i) => {
            const key = `tabs${i}`;
            return (
              <TabPane tab={value.name} key={key}>
                <div style={{ float: 'right' }}>
                  <Space>
                    <Button onClick={() => setshowAddConfirm(true)}>
                      <PlusOutlined />
                    </Button>
                    <Button onClick>
                      <EditOutlined />
                    </Button>

                    <PartAddModal
                      showAddConfirm //= {showAddConfirm}
                      setshowAddConfirm //= {setshowAddConfirm}
                      Sites={Sites}
                      reload={reload}
                    />
                    <PartUpdateModal
                      showUpdateConfirm //= {showUpdateConfirm}
                      setshowUpdateConfirm //= {setshowUpdateConfirm}
                      Sites={Sites}
                      reload={reload}
                      selectedRowKey //= {selectedRowKey}
                    />

                    <Space size="middle">
                      <Popconfirm
                        placement="leftBottom"
                        title="정말로 삭제하시겠습니까?"
                        onConfirm={onDeleteConfirm}
                        okText="Yes"
                        cancelText="No"
                        icon={
                          <QuestionCircleOutlined style={{ color: 'red' }} />
                        }
                      >
                        <Button>
                          <DeleteFilled />
                        </Button>
                      </Popconfirm>
                    </Space>
                  </Space>
                </div>
                <br />
                <br />
                <Spin spinning={loading}>
                  <EnginePartList site={value} parts={value.partStock} />
                </Spin>
              </TabPane>
            );
          })}
      </Tabs>
    </>
  );
}

BranchStocksPage.propTypes = {
  user: PropTypes.objectOf(PropTypes.object).isRequired,
};

export default BranchStocksPage;
