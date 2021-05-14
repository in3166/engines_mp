import React, { useState, useEffect } from 'react';
import {
  Layout,
  Breadcrumb,
  Table,
  Space,
  Button,
  message,
  Popconfirm,
  Modal,
  Select,
  Spin,
  Form,
} from 'antd';
import {
  DeleteFilled,
  EditOutlined,
  QuestionCircleOutlined,
} from '@ant-design/icons';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { deleteUsers, changeRole } from '../../../_actions/user_actions';

// const { SubMenu } = Menu;
const { Content } = Layout;
const { Option } = Select;

function UsersRolePage(props) {
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

    axios.get('/api/users/getAllUsers').then((res) => {
      for (let i = 0; i < res.data.users.length; i++) {
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
    getAllUsers();
  }, []);

  const columns = [
    {
      title: 'ID',
      dataIndex: 'id',
      sorter: {
        compare: (a, b) => a.id.localeCompare(b.id),
        multiple: 1,
      },
      width: 100,
      align: 'center',
    },
    {
      title: '이름',
      dataIndex: 'name',
      sorter: {
        compare: (a, b) => a.name.localeCompare(b.name),
        multiple: 2,
      },
      width: 160,
      align: 'center',
    },
    {
      title: 'Email',
      dataIndex: 'email',
      sorter: {
        compare: (a, b) => a.email.localeCompare(b.email),
        multiple: 3,
      },
      width: 240,
      align: 'center',
    },
    {
      title: '권한',
      dataIndex: 'role',
      filters: [
        { text: '일반 사용자', value: '일반 사용자' },
        { text: '전문가', value: '전문가' },
        { text: '엔지니어', value: '엔지니어' },
      ],
      onFilter: (value, record) => {
        return record.role.indexOf(value) === 0;
      },
      width: 110,
      align: 'center',
    },
    {
      title: '수정',
      dataIndex: 'update',
      key: 'action',
      render: (r, user) => {
        return (
          <Space size="middle">
            <a onClick={() => onClickUpdate(user)}>
              <EditOutlined />
            </a>
          </Space>
        );
      },
      width: 70,
      align: 'center',
    },
    {
      title: '삭제',
      key: 'action',
      render: (r, user) => {
        return (
          <Space size="middle">
            <Popconfirm
              placement="leftBottom"
              title="정말로 삭제하시겠습니까?"
              onConfirm={() => deleteConfirm(user)}
              okText="Yes"
              cancelText="No"
              icon={<QuestionCircleOutlined style={{ color: 'red' }} />}
            >
              <a>
                <DeleteFilled />
              </a>
            </Popconfirm>
          </Space>
        );
      },
      width: 70,
      align: 'center',
    },
  ];

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

  // 수정 버튼
  const onClickUpdate = (data) => {
    const tempData = { ...data };
    setModalData(tempData);
    setModalVisible(true);
  };

  // 수정 모달 권한 변경
  const handleRoleChange = (value) => {
    // modalData.role = value; set으로 하지않으면 rerender가 안됨
    // selected = value;
    setModalData((prev) => ({ ...prev, role: value }));
  };

  // 수정 모달 OK 버튼 - redux
  const modalOnOk = () => {
    const newRole =
      modalData.role === '일반 사용자'
        ? 0
        : modalData.role === '전문가'
        ? 2
        : 3;

    const body = {
      id: modalData.id,
      role: newRole,
    };

    console.log(body);

    dispatch(changeRole(body))
      .then((res) => {
        if (res.payload.success) {
          message.success('권한이 수정되었습니다.');
          getAllUsers();
        } else {
          message.error('권한 수정을 실패하였습니다.');
        }
      })
      .catch((err) => {
        alert(`[Error]: ${err}`);
      });

    setModalVisible(false);
  };

  // 개별 삭제 버튼
  const deleteConfirm = (user) => {
    console.log(user);

    const body = {
      id: user.id,
    };

    axios.post('/api/users/deleteUser', body).then((res) => {
      if (res.data.success) {
        message.success('회원 탈퇴를 완료하였습니다.');
      } else {
        message.error('회원 탈퇴를 실패하였습니다.', res.data.err);
      }
    });
    getAllUsers();
  };

  // 회원 탈퇴 버튼
  const deleteUsersButton = () => {
    const body = {
      id: [],
    };
    selectedUsers.forEach((user) => {
      body.id.push(user.id);
    });

    // redux post
    dispatch(deleteUsers(body))
      .then((res) => {
        if (res.payload.success) {
          message.success('회원 탈퇴를 완료하였습니다.');
          setSelectedRowKeys([]);
          getAllUsers();
        } else {
          message.error('회원 탈퇴를 실패하였습니다. ', res.payload.err);
        }
      })
      .catch((err) => {
        alert(`[Error]: ${err}`);
      });
  };

  return (
    <div style={{ width: '100%' }}>
      <Layout style={{ padding: '0 24px 24px', overflow: 'auto' }}>
        <Breadcrumb style={{ margin: '16px 0' }}>
          <Breadcrumb.Item>Home</Breadcrumb.Item>
          <Breadcrumb.Item>사용자 관리</Breadcrumb.Item>
          <Breadcrumb.Item>권한 관리</Breadcrumb.Item>
        </Breadcrumb>
        <Content
          className="site-layout-background"
          style={{
            padding: 24,
            margin: 0,
            minHeight: 280,
            height: '100%',
            border: '1px solid',
          }}
        >
          <Spin spinning={loading}>
            <div style={{ float: 'right' }}>
              <Button onClick={getAllUsers}>새로고침</Button>{' '}
              <Button onClick={deleteUsersButton}>회원 탈퇴</Button> <br />
              <br />
            </div>

            <Table
              rowSelection={rowSelection}
              columns={columns}
              dataSource={users}
              bordered
            />
          </Spin>

          <Modal
            title="권한 수정"
            style={{ top: 200 }}
            visible={modalVisible}
            onOk={() => modalOnOk()}
            onCancel={() => setModalVisible(false)}
          >
            <Form
              {...{ labelCol: { span: 6 }, wrapperCol: { span: 14 } }}
              name="userinfo-change"
            >
              <Form.Item label="ID">
                <label className="userpage_label">{modalData.id}</label>
              </Form.Item>
              <Form.Item label="이름">
                <label className="userpage_label">{modalData.name}</label>
              </Form.Item>
              <Form.Item label="Email">
                <label className="userpage_label">{modalData.email}</label>
              </Form.Item>
              <Form.Item label="권한">
                <Select
                  value={modalData.role}
                  style={{ width: 120 }}
                  onChange={(value) => handleRoleChange(value)}
                >
                  <Option value="일반 사용자">일반 사용자</Option>
                  <Option value="전문가">전문가</Option>
                  <Option value="엔지니어">엔지니어</Option>
                </Select>
              </Form.Item>
            </Form>
          </Modal>
        </Content>
      </Layout>
    </div>
  );
}

export default UsersRolePage;
