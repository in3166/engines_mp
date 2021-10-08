import React, { useState } from 'react';
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
} from '@ant-design/icons';
import axios from 'axios';
// import { useDispatch } from 'react-redux';
// import PropTypes from 'prop-types';
// import { deleteUsers } from '../../../_actions/user_actions';
import UpdateModal from './Sections/UpdateModal';
import { datas2 } from './Sections/datas';

function LifeCodePage() {
  // const { user } = props;
  // const [users] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [modalData, setModalData] = useState({});
  const [loading] = useState(false);
  const [selectedRowKeys, setSelectedRowKeys] = useState([]);
  // const [selectedUsers, setSelectedUsers] = useState([]);

  // const dispatch = useDispatch();

  //   const getAllUtils = () => {
  //     const tempUser = [];
  //     setLoading(true);

  //     axios.get('/api/users/getAllUsers').then(res => {
  //       for (let i = 0; i < res.data.users.length; i += 1) {
  //         let role = '';

  //         if (res.data.users[i].role !== 1) {
  //           if (res.data.users[i].role === 0) role = '일반 사용자';
  //           else if (res.data.users[i].role === 2) role = '전문가';
  //           else if (res.data.users[i].role === 3) role = '엔지니어';

  //           const data = {
  //             key: i.toString(),
  //             id: `${res.data.users[i].id}`,
  //             name: res.data.users[i].name,
  //             email: res.data.users[i].email,
  //             role,
  //           };
  //           tempUser.push(data);
  //         }
  //       }

  //       setUsers(tempUser);
  //     });
  //     setTimeout(() => {
  //       setLoading(false);
  //     }, 500);
  //   };

  //   useEffect(() => {
  //     if (user?.userData?.isAdmin) {
  //       getAllUtils();
  //     }
  //     return () => setLoading(false); // cleanup function 메모리 누수 방지
  //   }, [user]);

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
  };

  // 수정 버튼 modal 열기
  const onClickUpdate = data => {
    const tempData = { ...data };
    console.log(data);
    setModalData(tempData);
    setModalVisible(true);
  };

  // 수정 모달 권한 변경
  const handleRoleChange = value => {
    // modalData.role = value; set으로 하지않으면 rerender가 안됨
    // selected = value;
    setModalData(prev => ({ ...prev, role: value }));
  };

  //   // 회원 탈퇴 버튼
  //   const deleteUsersButton = () => {
  //     const body = {
  //       id: [],
  //     };
  //     selectedUsers.forEach(userSel => {
  //       body.id.push(userSel.id);
  //     });

  //     // redux post
  //     dispatch(deleteUsers(body))
  //       .then(res => {
  //         if (res.payload.success) {
  //           message.success('회원 탈퇴를 완료하였습니다.');
  //           setSelectedRowKeys([]);
  //           getAllUsers();
  //         } else {
  //           message.error('회원 탈퇴를 실패하였습니다. ', res.payload.err);
  //         }
  //       })
  //       .catch(err => {
  //         message.error(`[Error]: ${err}`);
  //       });
  //   };

  const columns = [
    {
      title: 'ID',
      dataIndex: 'id',
      sorter: {
        compare: (a, b) => a.id.localeCompare(b.id),
        multiple: 1,
      },
      width: 100,
      minWidth: 10,
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
      minWidth: 10,
      align: 'center',
      responsive: ['sm'],
    },
    {
      title: '설명',
      dataIndex: 'desc',
      sorter: {
        compare: (a, b) => a.desc.localeCompare(b.desc),
        multiple: 3,
      },
      width: 240,
      minWidth: 10,
      align: 'center',
      responsive: ['md'],
    },
    {
      title: '예상 수명',
      dataIndex: 'lifespan',
      sorter: {
        compare: (a, b) => a - b,
        multiple: 3,
      },
      width: 110,
      minWidth: 10,
      align: 'center',
    },
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
      width: 70,
      minWidth: 10,
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
      width: 70,
      minWidth: 10,
      align: 'center',
      responsive: ['sm'],
    },
  ];

  const onSelectChange = record => {
    setSelectedRowKeys(record);
    // setSelectedUsers(selected);
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
        <Breadcrumb.Item>부품/자재 관리</Breadcrumb.Item>
        <Breadcrumb.Item>수명 데이터 관리</Breadcrumb.Item>
        <Breadcrumb.Item>사용 연한 기초 관리</Breadcrumb.Item>
      </Breadcrumb>
      <Spin spinning={loading}>
        <div style={{ float: 'right' }}>
          <Button onClick={onClickUpdate}>추가</Button>
          <Button onClick>삭제</Button>
          <Button onClick>새로고침</Button>
          <br />
          <br />
        </div>

        <Table
          style={{ overflow: 'auto' }}
          rowSelection={rowSelection}
          columns={columns}
          dataSource={datas2}
          bordered
          tableLayout="auto"
          scroll
        />
      </Spin>

      <UpdateModal
        modalData={modalData}
        handleRoleChange={handleRoleChange}
        modalVisible={modalVisible}
        setModalVisible={setModalVisible}
      />
    </>
  );
}

// LifeCodePage.propTypes = {
//   user: PropTypes.objectOf(PropTypes.object).isRequired,
// };

export default LifeCodePage;
