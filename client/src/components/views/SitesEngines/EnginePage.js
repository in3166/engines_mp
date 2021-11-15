import React, { useEffect, useState } from 'react';
import { Breadcrumb, Button, Tabs, Spin } from 'antd';

import { ReloadOutlined } from '@ant-design/icons';
import { Line } from 'react-chartjs-2';
import PropTypes from 'prop-types';

import { useDispatch, useSelector } from 'react-redux';
import datas from './Data/datas';

import EngineTable from './Sections/EngineTable';
import { getAllSites } from '../../../_actions/site_actions';

function EnginePage(props) {
  const dispatch = useDispatch();
  const { user, match } = props;
  const param = match?.params.id;

  const [Loading, setLoading] = useState(false);
  const [Site, setSite] = useState({});
  const [LineData, setLineData] = useState(datas.chartData);
  const sitesEngines = useSelector(state => state.site);

  // if (!user?.userData?.isAuth) {
  //   return null;
  // }
  const getSite = () => {
    setLoading(true);
    const selectorSites = sitesEngines?.sitesEngine?.sites;
    console.log('state: ', selectorSites);

    if (selectorSites?.length > 0) {
      const site = selectorSites.filter(v => {
        return v.id === param;
      });
      setSite(...site);
    } else {
      dispatch(getAllSites())
        .then(res => {
          const site = res.payload.sites.filter(v => {
            return v.id === param;
          });
          setSite(...site);
        })
        .catch();
    }
    setTimeout(() => {
      setLoading(false);
    }, 300);
  };
  console.log('Site: ', Site);

  const useMountEffect = fun => {
    useEffect(fun, []);
  };
  useMountEffect(getSite);

  return (
    <div style={{ width: '100%', flex: '1 1 0', minWidth: '0' }}>
      <Spin spinning={Loading}>
        <Tabs
          defaultActiveKey="1"
          size="large"
          style={{ background: 'white', padding: '0 20px 10px 20px' }}
          tabBarExtraContent={
            <Button>
              <ReloadOutlined onClick={getSite} />
            </Button>
          }
        >
          {Site?.engines?.length > 0 &&
            Site.engines.map(v => (
              <Tabs.TabPane tab={v.engine.name} key={v.id}>
                <Breadcrumb style={{ margin: '16px 0' }}>
                  <Breadcrumb.Item>Home</Breadcrumb.Item>
                  <Breadcrumb.Item>Sites</Breadcrumb.Item>
                  <Breadcrumb.Item>{Site.name}</Breadcrumb.Item>
                  <Breadcrumb.Item>{v.engine.name}</Breadcrumb.Item>
                </Breadcrumb>
                <div
                  style={{
                    width: '100%',
                    backgroundColor: 'white',
                    padding: '10px',
                  }}
                >
                  <div className="chart">
                    <Line
                      data={LineData}
                      legend={datas.legend}
                      options={datas.options}
                      style={{ width: '100%' }}
                    />
                  </div>
                  <br />
                  <hr />
                  <br />
                  <EngineTable
                    user={user}
                    parts={v.engine.requiredParts}
                    setLineData={setLineData}
                  />
                </div>
              </Tabs.TabPane>
            ))}
        </Tabs>
      </Spin>
    </div>
  );
}

EnginePage.propTypes = {
  user: PropTypes.objectOf(PropTypes.object).isRequired,
  match: PropTypes.objectOf(PropTypes.any).isRequired,
};

export default EnginePage;
