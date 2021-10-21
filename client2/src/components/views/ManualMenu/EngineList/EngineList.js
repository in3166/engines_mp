import React, { useState, useEffect } from 'react';
import { Breadcrumb, message, Spin } from 'antd';
import PropTypes from 'prop-types';
// import { DeleteFilled, PlusOutlined, EditOutlined } from '@ant-design/icons';
import { useDispatch } from 'react-redux';
import { getAllEngines } from '../../../../_actions/engine_actions';
import EngineTable from './Sections/EngineTable';

function EngineList(props) {
  const { user } = props;

  const [Engines, setEngines] = useState([]);
  const [selectedRowKeys, setselectedRowKeys] = useState([]);

  const [loading, setloading] = useState(false);
  const dispatch = useDispatch();

  const getEngines = () => {
    setloading(true);
    dispatch(getAllEngines())
      .then(res => {
        if (res.payload.success) {
          setselectedRowKeys([]);
          setEngines(res.payload.engines);
        } else {
          message.error(res.payload.err);
        }
      })
      .catch(err => {
        message.error(`[Error]: ${err}`);
      })
      .finally(() => {
        setloading(false);
      });
  };

  const useMountEffect = fun => {
    useEffect(fun, []);
  };

  useMountEffect(getEngines);

  if (!user?.userData?.isAuth) return null;

  return (
    <>
      <Breadcrumb style={{ margin: '16px 0' }}>
        <Breadcrumb.Item>부품/자재 관리</Breadcrumb.Item>
        <Breadcrumb.Item>엔진 정비 메뉴얼</Breadcrumb.Item>
        <Breadcrumb.Item>엔진 목록</Breadcrumb.Item>
      </Breadcrumb>
      <div style={{ padding: 20, backgroundColor: 'white' }}>
        <div style={{ float: 'left' }}>
          <h3>
            <strong>엔진 목록</strong>
          </h3>
        </div>

        <Spin spinning={loading}>
          <EngineTable
            Engines={Engines}
            selectedRowKeys={selectedRowKeys}
            setselectedRowKeys={setselectedRowKeys}
            getEngines={getEngines}
          />
        </Spin>
      </div>
    </>
  );
}

export default EngineList;

EngineList.propTypes = {
  user: PropTypes.objectOf(PropTypes.object).isRequired,
};
