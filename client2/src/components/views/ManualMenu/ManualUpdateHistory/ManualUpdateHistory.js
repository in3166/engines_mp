import React, { useState, useEffect } from 'react';
import { Breadcrumb, message, Spin, Space, Button } from 'antd';
import { useDispatch } from 'react-redux';
import { ReloadOutlined } from '@ant-design/icons';
import ManualTable from './Sections/ManualHistoryTable';
import { getAllManuals } from '../../../../_actions/manual_actions';
import DateFormat from '../../../utils/getDateFormat';

function ManualUpdateHistory() {
  const [Manuals, setManuals] = useState([]);
  const [selectedRowKeys, setselectedRowKeys] = useState([]);
  const [loading, setloading] = useState(false);
  const dispatch = useDispatch();

  const getManuals = () => {
    setloading(true);
    dispatch(getAllManuals())
      .then(res => {
        if (res.payload.success) {
          setselectedRowKeys([]);
          res.payload.manuals.map(v => {
            const newManu = v;
            newManu.updatedAt = DateFormat(new Date(v.updatedAt));
            return newManu;
          });

          setManuals(res.payload.manuals);
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

  useMountEffect(getManuals);

  return (
    <>
      <Breadcrumb style={{ margin: '16px 0' }}>
        <Breadcrumb.Item>부품/자재 관리</Breadcrumb.Item>
        <Breadcrumb.Item>엔진 정비 메뉴얼</Breadcrumb.Item>
        <Breadcrumb.Item>메뉴얼 수정 이력</Breadcrumb.Item>
      </Breadcrumb>
      <div style={{ padding: 20, backgroundColor: 'white' }}>
        <div style={{ float: 'left' }}>
          <h3>
            <strong>메뉴얼 목록</strong>
          </h3>
        </div>
        <div style={{ float: 'right' }}>
          <Space>
            <Button onClick={getManuals}>
              <ReloadOutlined />
            </Button>
          </Space>
        </div>
        <br />
        <br />

        <Spin spinning={loading}>
          <ManualTable
            Manuals={Manuals}
            selectedRowKeys={selectedRowKeys}
            setselectedRowKeys={setselectedRowKeys}
            getManuals={getManuals}
          />
        </Spin>
      </div>
    </>
  );
}

export default ManualUpdateHistory;
