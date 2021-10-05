import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { Layout, Breadcrumb, Table, Button, message } from 'antd';
import axios from 'axios';
import { PlusOutlined, EditOutlined } from '@ant-design/icons';
import columns from './data/columns';
// import { deleteUsers } from '../../../_actions/user_actions';
import DeleteModal from './Sections/DeleteModal';
import UserUpdateModal from './Sections/UserUpdateModal';
import UserAddModal from './Sections/UserAddModal';
import getRole from './Sections/getRole';

const { Content } = Layout;

function LandingPage() {
  const user = useSelector(state => state.user);
  // const dispatch = useDispatch();
  const [getUsers, setGetUsers] = useState([]);
  const [selectedRowKeys, setSelectedRowKeys] = useState([]);
  const [selectedUsers, setSelectedUsers] = useState([]);
  const [showDeleteConfirm, setshowDeleteConfirm] = useState(false);
  const [showUpdateConfirm, setshowUpdateConfirm] = useState(false);
  const [showAddConfirm, setshowAddConfirm] = useState(false);
  // const [PredictMessage, setPredictMessage] = useState({})

  const getAllUsers = () => {
    const tempUser = [];

    axios.get('/api/users/getAllUsers').then(res => {
      for (let i = 0; i < res.data.users.length; i += 1) {
        const trole = getRole(res.data.users[i].role);

        if (res.data.users[i].role !== 1) {
          const data = {
            key: i.toString(),
            id: `${res.data.users[i].id}`,
            name: `${res.data.users[i].name}`,
            email: `${res.data.users[i].email}`,
            department: `${res.data.users[i].department}`,
            position: `${res.data.users[i].position}`,
            role: trole,
          };
          tempUser.push(data);
        }
      }
      setGetUsers(tempUser);
    });
  };

  useEffect(() => {
    if (user?.userData?.isAdmin) getAllUsers();
  }, [user]);

  if (user?.userData?.role !== 1) {
    return <div>You are not admin.</div>;
  }

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
      message.error('사용자 한 명만 선택하세요.');
    }
  };

  return (
    <div style={{ width: '100%' }}>
      <Layout style={{ padding: '0 24px 24px', overflow: 'auto' }}>
        <Breadcrumb style={{ margin: '16px 0' }}>
          <Breadcrumb.Item>Home</Breadcrumb.Item>
          <Breadcrumb.Item>DashBoard</Breadcrumb.Item>
        </Breadcrumb>
        <Content
          className="site-layout-background"
          style={{
            padding: 12,
            margin: 0,
            minHeight: 280,
            height: '100%',
            border: '1px solid',
          }}
        >
          {user?.userData?.role === 1 && (
            <>
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
                <UserUpdateModal
                  showUpdateConfirm={showUpdateConfirm}
                  setshowUpdateConfirm={setshowUpdateConfirm}
                  getAllUsers={getAllUsers}
                  selectedUsers={selectedUsers}
                />
                <UserAddModal
                  showAddConfirm={showAddConfirm}
                  setshowAddConfirm={setshowAddConfirm}
                  getAllUsers={getAllUsers}
                />
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
            </>
          )}
        </Content>
      </Layout>
    </div>
  );
}

export default LandingPage;
