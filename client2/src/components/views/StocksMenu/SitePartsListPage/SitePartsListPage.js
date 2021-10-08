import React, { useState, useEffect } from 'react';

import { Breadcrumb, Tabs, message } from 'antd';
import { useDispatch } from 'react-redux';
import PropTypes from 'prop-types';
import { getAllSites } from '../../../../_actions/site_actions';
// import { SearchOutlined } from '@ant-design/icons';
import EnginePartList from './Sections/EnginePartList';
// const { SubMenu } = Menu;
const { TabPane } = Tabs;

function SitePartsListPage(props) {
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
      >
        {Sites.length > 0 &&
          Sites.map((value, i) => {
            const key = `tabs${i}`;
            return (
              <TabPane tab={value.name} key={key}>
                <EnginePartList site={value} parts={value.partStock} />
              </TabPane>
            );
          })}
      </Tabs>
    </>
  );
}

SitePartsListPage.propTypes = {
  user: PropTypes.objectOf(PropTypes.object).isRequired,
};

export default SitePartsListPage;
