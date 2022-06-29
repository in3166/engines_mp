import React, { useEffect, useState } from 'react';
import { Table, Space, Button, message, Spin, Breadcrumb } from 'antd';
import { EditOutlined, ReloadOutlined } from '@ant-design/icons';
import { useDispatch } from 'react-redux';
import columns from './data/columns';
import { getAllExperts } from '../../../../_actions/expert_actions';
import ExpertAuthUpdateModal from './Sections/ExpertAuthUpdateModal';

function ExpertAuth() {
  const dispatch = useDispatch();
  const [Experts, setExperts] = useState([]);
  const [Loading, setLoading] = useState(false);
  const [ShowUpdateModal, setShowUpdateModal] = useState(false);
  const [SelectedExpert, setSelectedExpert] = useState({});

  const getExperts = () => {
    setLoading(true);
    dispatch(getAllExperts())
      .then(res => {
        if (res.payload.success) {
          setExperts(res.payload.experts);
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
  useMountEffect(getExperts);

  const onClickUpdate = expertGroup => {
    setSelectedExpert(expertGroup);
    setShowUpdateModal(true);
  };

  const col2 = [
    {
      title: '수정',
      dataIndex: 'update',
      key: '4',
      render: (r, expertGroupUp) => {
        return (
          <Space size="middle">
            <Button onClick={() => onClickUpdate(expertGroupUp)}>
              <EditOutlined />
            </Button>
          </Space>
        );
      },
      width: 50,
      align: 'center',
    },
  ];

  const col = [...columns, ...col2];

  return (
    <>
      <Breadcrumb style={{ margin: '16px 0' }}>
        <Breadcrumb.Item>Home</Breadcrumb.Item>
        <Breadcrumb.Item>전문가 관리</Breadcrumb.Item>
        <Breadcrumb.Item>전문가 그룹 권한 관리</Breadcrumb.Item>
      </Breadcrumb>
      <Spin spinning={Loading}>
        <div style={{ backgroundColor: 'white', padding: 20 }}>
          <div style={{ float: 'left', paddingLeft: '7px' }}>
            <h3>
              <strong>전문가 그룹 목록</strong>
            </h3>
          </div>
          <div style={{ float: 'right' }}>
            <Space>
              <Button onClick={getExperts}>
                <ReloadOutlined />
              </Button>
            </Space>
            <ExpertAuthUpdateModal
              getExperts={getExperts}
              ShowUpdateModal={ShowUpdateModal}
              setShowUpdateModal={setShowUpdateModal}
              Expert={SelectedExpert}
            />
            <br />
            <br />
          </div>

          <Table
            style={{ overflow: 'auto' }}
            columns={col}
            dataSource={Experts}
            tableLayout="auto"
            rowKey="_id"
          />
        </div>
      </Spin>
    </>
  );
}

export default ExpertAuth;
