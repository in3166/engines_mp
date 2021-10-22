import React from 'react';
import {
  //   Table,
  //  Space,
  Button,
  //   message,
  //   Popconfirm,
  Spin,
  Breadcrumb,
} from 'antd';
import {
  DeleteFilled,
  //   EditOutlined,
  //   QuestionCircleOutlined,
  ReloadOutlined,
} from '@ant-design/icons';
// import axios from 'axios';
// import { useDispatch } from 'react-redux';
// import PropTypes from 'prop-types';

function PositionManagePage() {
  return (
    <>
      <Breadcrumb style={{ margin: '16px 0' }}>
        <Breadcrumb.Item>Home</Breadcrumb.Item>
        <Breadcrumb.Item>사용자 관리</Breadcrumb.Item>
        <Breadcrumb.Item>직급 관리</Breadcrumb.Item>
      </Breadcrumb>
      <Spin spinning={false}>
        <div style={{ backgroundColor: 'white', padding: 20 }}>
          <div style={{ float: 'right' }}>
            <Button onClick>
              <ReloadOutlined />
            </Button>
            <Button onClick>
              <DeleteFilled />
            </Button>
            <br />
            <br />
          </div>

          {/* <Table
            style={{ overflow: 'auto' }}
            rowSelection
            columns
            dataSource
            bordered
            tableLayout="auto"
            scroll
          /> */}
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
