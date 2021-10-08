import React, { useState, useEffect } from 'react';
import { Breadcrumb, Tabs, message } from 'antd';
import PropTypes from 'prop-types';
import { useDispatch } from 'react-redux';
import EngineList from './Sections/EngineList';
import { getAllSites } from '../../../../_actions/site_actions';
import './Sections/antdTable.css';

const { TabPane } = Tabs;

function EnginePartsPage(props) {
  const { user } = props;
  const [Sites, setSites] = useState([]);
  const dispatch = useDispatch();

  const getSites = () => {
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
      });
  };

  const useMountEffect = fun => useEffect(fun, []);
  useMountEffect(getSites);

  if (!user?.userData?.isAuth) return null;

  return (
    <div style={{ width: '100%' }}>
      <Breadcrumb style={{ margin: '16px 0' }}>
        <Breadcrumb.Item>부품/자재 관리</Breadcrumb.Item>
        <Breadcrumb.Item>수명 데이터 관리</Breadcrumb.Item>
        <Breadcrumb.Item>엔진별 부품 목록</Breadcrumb.Item>
      </Breadcrumb>
      <Tabs
        defaultActiveKey="1"
        size="large"
        style={{ background: 'white', padding: '0 20px 10px 20px' }}
      >
        {Sites.length > 0 &&
          Sites.map((value, i) => {
            const key = `tabs${i}`;
            return (
              <TabPane tab={value.name} key={key}>
                <EngineList site={value} engine={value.engines} />
              </TabPane>
            );
          })}
      </Tabs>
    </div>
  );
}

EnginePartsPage.propTypes = {
  user: PropTypes.objectOf(PropTypes.object).isRequired,
};

export default EnginePartsPage;
