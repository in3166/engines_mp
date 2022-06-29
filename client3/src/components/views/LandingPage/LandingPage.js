import React, { useEffect, useState } from 'react';
import { Breadcrumb, Table, Button, message } from 'antd';
import axios from 'axios';
import { PlusOutlined, EditOutlined } from '@ant-design/icons';
import { useSelector } from 'react-redux';

import columns from './data/columns';
import DeleteModal from './Sections/DeleteModal';
import UserUpdateModal from './Sections/UserUpdateModal';
import UserAddModal from './Sections/UserAddModal';

function LandingPage() {
  const user = useSelector(state => state.user);
  const [getUsers, setGetUsers] = useState([]);
  const [Departments, setDepartments] = useState([]);
  const [Positions, setPositions] = useState([]);
  const [Sites, setSites] = useState([]);
  const [selectedRowKeys, setSelectedRowKeys] = useState([]);
  const [selectedUsers, setSelectedUsers] = useState([]);
  const [showDeleteConfirm, setshowDeleteConfirm] = useState(false);
  const [showUpdateConfirm, setshowUpdateConfirm] = useState(false);
  const [showAddConfirm, setshowAddConfirm] = useState(false);

  const getAllUsers = () => {
    const tempUser = [];

    axios.get('/api/users/getAllUsers').then(res => {
      for (let i = 0; i < res.data?.users?.length; i += 1) {
        if (res.data.users[i].role !== 1) {
          const data = {
            key: i.toString(),
            _id: `${res.data.users[i]._id}`,
            id: `${res.data.users[i].id}`,
            name: `${res.data.users[i].name}`,
            email: `${res.data.users[i].email}`,
            site: `${
              res.data.users[i].site ? res.data.users[i].site.name : '-'
            }`,
            department: `${
              res.data.users[i].department
                ? res.data.users[i].department.name
                : '-'
            }`,
            position: `${
              res.data.users[i].position ? res.data.users[i].position.name : '-'
            }`,
            role: res.data.users[i].role.name,
          };
          tempUser.push(data);
        }
      }
      setGetUsers(tempUser);
    });
  };

  const getAllDepartments = () => {
    axios.get('/api/departments/getAllDepartments').then(res => {
      setDepartments(res.data.departments);
    });
  };

  const getAllPositions = () => {
    axios.get('/api/positions/getAllPositions').then(res => {
      setPositions(res.data.positions);
    });
  };

  const getAllSites = () => {
    axios.get('/api/sites/getAllSites').then(res => {
      setSites(res.data.sites);
    });
  };

  useEffect(() => {
    getAllUsers();
    getAllDepartments();
    getAllPositions();
    getAllSites();
  }, [user]);

  const onSelectChange = (record, selected) => {
    setSelectedRowKeys(record);
    setSelectedUsers(selected);
  };

  const rowSelection = {
    selectedRowKeys,
    onChange: onSelectChange,
    selections: [
      Table.SELECTION_ALL,
      Table.SELECTION_NONE,
      Table.SELECTION_INVERT,
    ],
  };

  const onClickUpdate = () => {
    if (selectedUsers.length === 0) {
      message.error('사용자를 선택하세요.');
    } else if (selectedUsers.length === 1) {
      setshowUpdateConfirm(true);
    } else {
      message.error('사용자 한 명을 선택하세요.');
    }
  };

  return (
    <>
      <Breadcrumb style={{ margin: '16px 0' }}>
        <Breadcrumb.Item>Home</Breadcrumb.Item>
        <Breadcrumb.Item>DashBoard</Breadcrumb.Item>
      </Breadcrumb>
      <div style={{ background: 'white', padding: 20 }}>
        <div style={{ float: 'left' }}>
          <h3>
            <strong style={{ padding: '10px' }}>모든 사용자</strong>
          </h3>
        </div>
        <div style={{ float: 'right' }}>
          <Button onClick={() => setshowAddConfirm(true)}>
            <PlusOutlined />
          </Button>
          <Button onClick={() => onClickUpdate()}>
            <EditOutlined />
          </Button>
          <DeleteModal
            setshowDeleteConfirm={setshowDeleteConfirm}
            showDeleteConfirm={showDeleteConfirm}
            selectedUsers={selectedUsers}
            getAllUsers={getAllUsers}
            setSelectedRowKeys={setSelectedRowKeys}
          />

          {showUpdateConfirm && (
            <UserUpdateModal
              showUpdateConfirm={showUpdateConfirm}
              setshowUpdateConfirm={setshowUpdateConfirm}
              getAllUsers={getAllUsers}
              selectedUsers={selectedUsers}
              Departments={Departments}
              Positions={Positions}
              Sites={Sites}
            />
          )}
          {showAddConfirm && (
            <UserAddModal
              showAddConfirm={showAddConfirm}
              setshowAddConfirm={setshowAddConfirm}
              getAllUsers={getAllUsers}
              Departments={Departments}
              Positions={Positions}
              Sites={Sites}
            />
          )}
          <br />
          <br />
        </div>

        <Table
          style={{ overflow: 'auto' }}
          rowSelection={rowSelection}
          columns={columns}
          dataSource={getUsers}
          bordered
          tableLayout="auto"
          scroll
        />
      </div>
    </>
  );
}

export default LandingPage;
