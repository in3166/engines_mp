import React, { useEffect, useState } from 'react';
import { Table, Space, Button, message, Spin, Breadcrumb } from 'antd';
import { EditOutlined, ReloadOutlined } from '@ant-design/icons';
// import axios from 'axios';
import { useDispatch } from 'react-redux';
import PropTypes from 'prop-types';
import columns from './data/columns';
import { getAllExperts } from '../../../../_actions/expert_actions';
import ExpertAuthUpdateModal from './Sections/ExpertAuthUpdateModal';

function ExpertAuth(props) {
  const dispatch = useDispatch();
  const { user } = props;
  const [Experts, setExperts] = useState([]);
  // const [selectedRowKeys, setselectedRowKeys] = useState([]);
  const [Loading, setLoading] = useState(false);
  const [ShowUpdateModal, setShowUpdateModal] = useState(false);
  const [SelectedExpert, setSelectedExpert] = useState({});
  console.log(user);
  // console.log(Experts);
  // console.log('selectedRowKeys; ', ...selectedRowKeys);

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
    console.log('expertGroup up: ', expertGroup);
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

  //   const rowSelection = {
  //     ...selectedRowKeys._id,
  //     onChange: (selectedRowKey, sel2) => {
  //       setselectedRowKeys(sel2);
  //     },
  //     selections: [
  //       Table.SELECTION_ALL,
  //       Table.SELECTION_NONE,
  //       Table.SELECTION_INVERT,
  //     ],
  //   };

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
            // rowSelection={rowSelection}
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

ExpertAuth.propTypes = {
  user: PropTypes.objectOf(PropTypes.object).isRequired,
};
