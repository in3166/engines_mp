import React, { useState, useEffect, Profiler } from 'react';
// import {useSelector} from 'react-redux'
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

  // console.log('userList: ', userList);
  // console.log('ExpertsGroup', ExpertsGroup);
  // console.log('targetKeys', targetKeys);

  // const [selectedKeys, setselectedKeys] = useState([]);
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
    // if (user?.userData?.isAdmin)
    getExpertGroups();
    getAllUsers();
    // performance.mark('target_page_mounted');
    return () => {
      // performance.measure(
      //   'reactRouterPerf',
      //   'initialize_page_change',
      //   'target_page_mounted',
      // );
      // console.log('addexpert: ', performance.getEntriesByType('measure'));
      // Finally, clean up the entries.
      // performance.clearMarks();
      // performance.clearMeasures();
      setLoading(false);
    };
  }, [user]);
  // 모든 사용자 불러오기

  //  const handleSelectChange = (sourceSelectedKeys, targetSelectedKeys) => {
  //     console.log('selectedKeys: ',selectedKeys)
  //     console.log('sourceSelectedKeys: ',sourceSelectedKeys)
  //     console.log('targetSelectedKeys: ',targetSelectedKeys)
  //     setselectedKeys(
  //         [...sourceSelectedKeys, ...targetSelectedKeys]
  //     );
  //     console.log('after selectedKeys: ',selectedKeys)
  //   };

  return (
    <Profiler
      id="add"
      onRender={(
        id,
        phase,
        actualDuration,
        baseDuration,
        startTime,
        commitTime,
      ) => {
        // we can log it to a database or render it out as a chart
        if (phase === 'mount')
          console.log({
            id,
            phase,
            actualDuration,
            baseDuration,
            startTime,
            commitTime,
          });
      }}
      // onRender={() => performance.mark('initialize_page_change')}
    >
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
                    <TabPane tab={value.id} key={key}>
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
