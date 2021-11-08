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
  EditOutlined,
  QuestionCircleOutlined,
  ReloadOutlined,
} from '@ant-design/icons';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import PropTypes from 'prop-types';
import { deleteUsers } from '../../../../_actions/user_actions';
import UpdateModal from './Sections/UpdateModal';
import './Sections/UserAuth.css';
import columns from './data/columns';

function UsersRolePage(props) {
  const { user } = props;
  const [users, setUsers] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [modalData, setModalData] = useState({});
  const [loading, setLoading] = useState(false);
  const [selectedRowKeys, setSelectedRowKeys] = useState([]);
  const [selectedUsers, setSelectedUsers] = useState([]);

  const dispatch = useDispatch();

  const getAllUsers = () => {
    const tempUser = [];
    setLoading(true);

    axios.get('/api/users/getAllUsers').then(res => {
      console.log(res.data.users);
      for (let i = 0; i < res.data.users.length; i += 1) {
        let role = '';

        if (res.data.users[i].role !== 1) {
          if (res.data.users[i].role === 0) role = '일반 사용자';
          else if (res.data.users[i].role === 2) role = '전문가';
          else if (res.data.users[i].role === 3) role = '엔지니어';

          const data = {
            key: i.toString(),
            id: `${res.data.users[i].id}`,
            name: res.data.users[i].name,
            email: res.data.users[i].email,
            department: res.data.users[i].department,
            position: res.data.users[i].position.name,
            role,
          };
          tempUser.push(data);
        }
      }

      setUsers(tempUser);
    });
    setTimeout(() => {
      setLoading(false);
    }, 500);
  };

  useEffect(() => {
    // if (user?.userData?.isAdmin) {
    getAllUsers();
    // }
    return () => {
      setLoading(false);
      performance.mark('target_page_mounted');
      // performance.measure(
      //   'reactRouterPerf',
      //   'initialize_page_change',
      //   'target_page_mounted',
      // );
      // // Pull out all of the measurements.
      // console.log('userauth: ', performance.getEntriesByType('measure'));

      // Finally, clean up the entries.
      performance.clearMarks();
      performance.clearMeasures();
    };
  }, [user]);

  // 개별 삭제 버튼
  const deleteConfirm = userDel => {
    const body = {
      id: userDel.id,
    };

    axios.post('/api/users/deleteUser', body).then(res => {
      if (res.data.success) {
        message.success('회원 탈퇴를 완료하였습니다.');
      } else {
        message.error('회원 탈퇴를 실패하였습니다.', res.data.err);
      }
    });
    getAllUsers();
  };

  // 수정 버튼 modal 열기
  const onClickUpdate = data => {
    const tempData = { ...data };
    setModalData(tempData);
    setModalVisible(true);
  };

  // 수정 모달 권한 변경
  const handleRoleChange = value => {
    // modalData.role = value; set으로 하지않으면 rerender가 안됨
    // selected = value;
    setModalData(prev => ({ ...prev, role: value }));
  };

  // 회원 탈퇴 버튼
  const deleteUsersButton = () => {
    const body = {
      id: [],
    };
    selectedUsers.forEach(userSel => {
      body.id.push(userSel.id);
    });

    if (body.id.length === 0) {
      message.error('사용자를 선택하세요.');
    } else {
      // redux post
      dispatch(deleteUsers(body))
        .then(res => {
          if (res.payload.success) {
            message.success('회원 탈퇴를 완료하였습니다.');
            setSelectedRowKeys([]);
            getAllUsers();
          } else {
            message.error('회원 탈퇴를 실패하였습니다. ', res.payload.err);
          }
        })
        .catch(err => {
          message.error(`[Error]: ${err}`);
        });
    }
  };

  const col2 = [
    {
      title: '수정',
      dataIndex: 'update',
      key: 'action',
      render: (r, userUp) => {
        return (
          <Space size="middle">
            <Button onClick={() => onClickUpdate(userUp)}>
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
      key: 'action',
      render: (r, userDel) => {
        return (
          <Space size="middle">
            <Popconfirm
              placement="leftBottom"
              title="정말로 삭제하시겠습니까?"
              onConfirm={() => deleteConfirm(userDel)}
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

  return (
    <>
      <Breadcrumb style={{ margin: '16px 0' }}>
        <Breadcrumb.Item>Home</Breadcrumb.Item>
        <Breadcrumb.Item>사용자 관리</Breadcrumb.Item>
        <Breadcrumb.Item>권한 관리</Breadcrumb.Item>
      </Breadcrumb>
      <Spin spinning={loading}>
        <div style={{ backgroundColor: 'white', padding: 20 }}>
          <div style={{ float: 'right' }}>
            <Button onClick={getAllUsers}>
              <ReloadOutlined />
            </Button>{' '}
            <Button onClick={deleteUsersButton}>
              <DeleteFilled />
            </Button>{' '}
            <br />
            <br />
          </div>

          <Table
            style={{ overflow: 'auto' }}
            rowSelection={rowSelection}
            columns={col}
            dataSource={users}
            bordered
            tableLayout="auto"
            scroll
          />
        </div>
      </Spin>

      <UpdateModal
        modalData={modalData}
        getAllUsers={getAllUsers}
        handleRoleChange={handleRoleChange}
        modalVisible={modalVisible}
        setModalVisible={setModalVisible}
      />
    </>
  );
}

UsersRolePage.propTypes = {
  user: PropTypes.objectOf(PropTypes.object).isRequired,
};

export default UsersRolePage;
