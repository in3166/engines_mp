import React, { useState, useEffect } from 'react';
import { Breadcrumb, message, Spin } from 'antd';
import { useDispatch } from 'react-redux';
import { getAllParts } from '../../../../_actions/part_actions';
import PartTable from './Sections/PartTable';

function OrderParts() {
  const [Parts, setParts] = useState([]);
  const [selectedRowKeys, setselectedRowKeys] = useState([]);
  const [loading, setloading] = useState(false);
  const dispatch = useDispatch();

  const getParts = () => {
    setloading(true);
    dispatch(getAllParts())
      .then(res => {
        if (res.payload.success) {
          setselectedRowKeys([]);
          setParts(res.payload.parts);
        } else {
          message.error(res.payload.err);
        }
      })
      .catch(err => {
        message.error(err);
      })
      .finally(() => {
        setloading(false);
      });
  };

  const useMountEffect = fun => {
    useEffect(fun, []);
  };

  useMountEffect(getParts);

  return (
    <>
      <Breadcrumb style={{ margin: '16px 0' }}>
        <Breadcrumb.Item>부품/자재 관리</Breadcrumb.Item>
        <Breadcrumb.Item>엔진 정비 메뉴얼</Breadcrumb.Item>
        <Breadcrumb.Item>부품 목록</Breadcrumb.Item>
      </Breadcrumb>
      <div style={{ padding: 20, backgroundColor: 'white' }}>
        <div style={{ float: 'left' }}>
          <h3>
            <strong>부품 목록</strong>
          </h3>
        </div>
        <br />

        <Spin spinning={loading}>
          <PartTable
            Parts={Parts}
            selectedRowKeys={selectedRowKeys}
            setselectedRowKeys={setselectedRowKeys}
            getParts={getParts}
          />
        </Spin>
      </div>
    </>
  );
}

export default OrderParts;
