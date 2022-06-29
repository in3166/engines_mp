import React, { useState, useEffect, Profiler } from 'react';
import { Button, Breadcrumb, Spin, Tabs } from 'antd';
import axios from 'axios';
import { ReloadOutlined } from '@ant-design/icons';
import PropTypes from 'prop-types';
import './Sections/antdTransfer.css';
import ExpertTransfer from './Sections/ExpertTransfer';

const { TabPane } = Tabs;
function AddExpertPage(props) {
  const [userList, setUserList] = useState([]);
  const [ExpertsGroup, setExpertsGroup] = useState([]);

  const [loading, setLoading] = useState(false);
  const { user } = props;

  const getExpertGroups = () => {
    axios.get('/api/experts/getAllExperts').then(res => {
      if (res.data.success) {
        setExpertsGroup(res.data.experts);
      }
    });
  };

  const getAllUsers = () => {
    setLoading(true);

    axios.get('/api/users/getAllUsers').then(res => {
      setUserList(res.data.users);
    });
    setTimeout(() => {
      setLoading(false);
    }, 500);
  };

  useEffect(() => {
    getExpertGroups();
    getAllUsers();
    return () => {
      setLoading(false);
    };
  }, [user]);

  return (
    <Profiler id="add">
      <>
        <Breadcrumb style={{ margin: '16px 0' }}>
          <Breadcrumb.Item>Home</Breadcrumb.Item>
          <Breadcrumb.Item>전문가 관리</Breadcrumb.Item>
          <Breadcrumb.Item>전문가 등록</Breadcrumb.Item>
        </Breadcrumb>
        <Spin spinning={loading}>
          <div style={{ backgroundColor: 'white', padding: 20 }}>
            <Tabs
              defaultActiveKey="1"
              size="large"
              style={{ background: 'white', padding: '0 20px 10px 20px' }}
              tabBarExtraContent={
                <Button>
                  <ReloadOutlined onClick={getAllUsers} />
                </Button>
              }
            >
              {ExpertsGroup?.length > 0 &&
                userList.length > 0 &&
                ExpertsGroup.map((value, i) => {
                  const key = `tabs${i}`;
                  return (
                    <TabPane tab={value.name} key={key}>
                      <ExpertTransfer
                        key={key}
                        userList={userList}
                        ExpertGroup={value}
                        getAllUsers={getAllUsers}
                        setUserList={setUserList}
                      />
                    </TabPane>
                  );
                })}
            </Tabs>
          </div>
        </Spin>
      </>
    </Profiler>
  );
}

AddExpertPage.propTypes = {
  user: PropTypes.objectOf(PropTypes.object).isRequired,
};

export default AddExpertPage;
