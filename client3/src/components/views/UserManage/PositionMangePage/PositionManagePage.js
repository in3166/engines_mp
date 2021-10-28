import React, { useState, useEffect } from 'react';
import {
  Table,
  Space,
  Button,
  message,
  Popconfirm,
  Spin,
  Breadcrumb,
} from 'antd';
import {
  DeleteFilled,
  PlusOutlined,
  EditOutlined,
  QuestionCircleOutlined,
  ReloadOutlined,
} from '@ant-design/icons';

import { useDispatch } from 'react-redux';
import PropTypes from 'prop-types';
import columns from './data/columns';
import { getAllPositions } from '../../../../_actions/position_actions';
import PositionAddModal from './Sections/PositionAddModal';
import PositionUpdateModal from './Sections/PositionUpdateModal';

function PositionManagePage(props) {
  const dispatch = useDispatch();
  const { user } = props;
  const [Positions, setPositions] = useState([]);
  const [selectedRowKeys, setselectedRowKeys] = useState([]);
  const [Loading, setLoading] = useState(false);
  const [ShowAddModal, setShowAddModal] = useState(false);
  const [ShowUpdateModal, setShowUpdateModal] = useState(false);
  const [SelectedPosition, setSelectedPosition] = useState({});
  console.log(user);
  // console.log(Departments);
  console.log('selectedRowKeys; ', ...selectedRowKeys);

  const getPositions = () => {
    setLoading(true);
    dispatch(getAllPositions())
      .then(res => {
        if (res.payload.success) {
          setPositions(res.payload.positions);
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
  useMountEffect(getPositions);

  const onClickUpdate = position => {
    setSelectedPosition(position);
    setShowUpdateModal(true);
  };

  const deleteConfirm = position => {
    console.log('depart del: ', position);
  };

  const col2 = [
    {
      title: '수정',
      dataIndex: 'update',
      key: '4',
      render: (r, departUp) => {
        return (
          <Space size="middle">
            <Button onClick={() => onClickUpdate(departUp)}>
              <EditOutlined />
            </Button>
          </Space>
        );
      },
      width: 50,
      align: 'center',
    },
    {
      title: '삭제',
      key: '5',
      render: (r, departDel) => {
        return (
          <Space size="middle">
            <Popconfirm
              placement="leftBottom"
              title="정말로 삭제하시겠습니까?"
              onConfirm={() => deleteConfirm(departDel)}
              okText="Yes"
              cancelText="No"
              icon={<QuestionCircleOutlined style={{ color: 'red' }} />}
            >
              <Button>
                <DeleteFilled />
              </Button>
            </Popconfirm>
          </Space>
        );
      },
      width: 50,
      align: 'center',
      responsive: ['sm'],
    },
  ];
  const col = [...columns, ...col2];

  const rowSelection = {
    ...selectedRowKeys._id,
    onChange: (selectedRowKey, sel2) => {
      setselectedRowKeys(sel2);
    },
    selections: [
      Table.SELECTION_ALL,
      Table.SELECTION_NONE,
      Table.SELECTION_INVERT,
    ],
  };
  return (
    <>
      <Breadcrumb style={{ margin: '16px 0' }}>
        <Breadcrumb.Item>Home</Breadcrumb.Item>
        <Breadcrumb.Item>사용자 관리</Breadcrumb.Item>
        <Breadcrumb.Item>직급 관리</Breadcrumb.Item>
      </Breadcrumb>
      <Spin spinning={Loading}>
        <div style={{ backgroundColor: 'white', padding: 20 }}>
          <div style={{ float: 'left', paddingLeft: '7px' }}>
            <h3>
              <strong>직급 목록</strong>
            </h3>
          </div>
          <div style={{ float: 'right' }}>
            <Space>
              <Button onClick={() => setShowAddModal(true)}>
                <PlusOutlined />
              </Button>
              <Space size="middle">
                <Popconfirm
                  placement="leftBottom"
                  title="정말로 삭제하시겠습니까?"
                  onConfirm={() => deleteConfirm()}
                  okText="Yes"
                  cancelText="No"
                  icon={<QuestionCircleOutlined style={{ color: 'red' }} />}
                >
                  <Button>
                    <DeleteFilled />
                  </Button>
                </Popconfirm>
              </Space>
              <Button onClick={getPositions}>
                <ReloadOutlined />
              </Button>
            </Space>
            <PositionAddModal
              ShowAddModal={ShowAddModal}
              setShowAddModal={setShowAddModal}
              getPositions={getPositions}
            />
            <PositionUpdateModal
              ShowUpdateModal={ShowUpdateModal}
              setShowUpdateModal={setShowUpdateModal}
              getPositions={getPositions}
              Position={SelectedPosition}
            />
            <br />
            <br />
          </div>

          <Table
            style={{ overflow: 'auto' }}
            rowSelection={rowSelection}
            columns={col}
            dataSource={Positions}
            bordered
            tableLayout="auto"
            scroll
            rowKey="_id"
          />
        </div>
      </Spin>

      {/* <UpdateModal
          modalData={modalData}
          getAllUsers={getAllUsers}
          handleRoleChange={handleRoleChange}
          modalVisible={modalVisible}
          setModalVisible={setModalVisible}
        /> */}
    </>
  );
}

export default PositionManagePage;

PositionManagePage.propTypes = {
  user: PropTypes.objectOf(PropTypes.object).isRequired,
};
