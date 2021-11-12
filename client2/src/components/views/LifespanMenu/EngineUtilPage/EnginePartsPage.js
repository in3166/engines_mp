import React, { useState, useEffect } from 'react';
import { Breadcrumb, Button, message, Spin } from 'antd';
import { ReloadOutlined } from '@ant-design/icons';
import PropTypes from 'prop-types';
import { useDispatch, useSelector } from 'react-redux';
import EngineList from './Sections/EngineList';
import { getAllEngines } from '../../../../_actions/engine_actions';
import './Sections/antdTable.css';

function EnginePartsPage(props) {
  const { user } = props;
  console.log(user);
  const [Engines, setEngines] = useState([]);
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const engine = useSelector(state => state?.engine?.engines);
  // console.log('site: ', site?.Engines);
  // console.log(site.Engines);

  const reload = () => {
    setLoading(true);
    dispatch(getAllEngines())
      .then(res => {
        if (res.payload.success) {
          setEngines(res.payload.engines);
        } else {
          message.error(res.payload.err);
        }
      })
      .catch(err => {
        message.error(`[Error]: ${err}`);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  const getEngines = () => {
    if (engine?.engines) {
      setEngines(engine.engines);
    } else {
      reload();
    }
  };

  const useMountEffect = fun => {
    useEffect(fun, []);
  };
  useMountEffect(getEngines);

  // if (!user?.userData?.isAuth) return null;

  return (
    <div style={{ width: '100%' }}>
      <Breadcrumb style={{ margin: '16px 0' }}>
        <Breadcrumb.Item>부품/자재 관리</Breadcrumb.Item>
        <Breadcrumb.Item>수명 데이터 관리</Breadcrumb.Item>
        <Breadcrumb.Item>엔진별 부품 목록</Breadcrumb.Item>
      </Breadcrumb>
      <div style={{ padding: 20, backgroundColor: 'white' }}>
        <div style={{ float: 'left' }}>
          <h3>Engines</h3>
        </div>
        <div style={{ float: 'right' }}>
          <Button onClick={reload}>
            <ReloadOutlined />
          </Button>
        </div>
        <br />
        <br />
        <Spin spinning={loading}>
          <EngineList engine={Engines} />
        </Spin>
      </div>
    </div>
  );
}

EnginePartsPage.propTypes = {
  user: PropTypes.objectOf(PropTypes.object).isRequired,
};

export default EnginePartsPage;
