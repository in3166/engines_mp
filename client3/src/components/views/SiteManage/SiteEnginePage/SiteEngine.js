import React, { useState, useEffect } from 'react';
import { Button, message, Spin, Breadcrumb, Tabs } from 'antd';
import { ReloadOutlined } from '@ant-design/icons';
import { useDispatch } from 'react-redux';
import axios from 'axios';
import {
  getAllSites,
  // deleteSiteEngines,
} from '../../../../_actions/site_actions';

// import RequriedList from './Sections/RequriedList';
// import AddEngine from './Sections/AddEngine';
import SiteInfo from './Sections/SiteInfo';
import SiteEngineList from './Sections/SiteEngineList';

const { TabPane } = Tabs;

function SiteEngine() {
  const [Sites, setSites] = useState([]);
  const [Engines, setEngines] = useState([]);
  const [Loading, setLoading] = useState([]);

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
                      // ShowAddEngine={ShowAddEngine}
                      // setShowAddEngine={setShowAddEngine}
                      // ShowRequiredParts={ShowRequiredParts}
                      // RequiredPartsInfo={RequiredPartsInfo}
                      // setShowRequiredParts={setShowRequiredParts}
                      site={value}
                      getSites={getSites}
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
