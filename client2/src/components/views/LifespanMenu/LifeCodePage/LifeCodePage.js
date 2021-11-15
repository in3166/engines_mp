import React, { useState } from 'react';
import {
  Table,
  Button,
  Spin,
  Breadcrumb,
  Space,
  Popconfirm,
  message,
} from 'antd';
// import { useDispatch } from 'react-redux';
// import PropTypes from 'prop-types';
// import { deleteUsers } from '../../../_actions/user_actions';
import {
  DeleteFilled,
  EditOutlined,
  PlusOutlined,
  QuestionCircleOutlined,
} from '@ant-design/icons';
import UpdateModal from './Sections/UpdateModal';
import { datas2 } from './datas/datas';
import columns from './datas/coulmns';

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
  // const deleteConfirm = userDel => {
  //   const body = {
  //     id: userDel.id,
  //   };

  //   axios.post('/api/users/deleteUser', body).then(res => {
  //     if (res.data.success) {
  //       message.success('회원 탈퇴를 완료하였습니다.');
  //     } else {
  //       message.error('회원 탈퇴를 실패하였습니다.', res.data.err);
  //     }
  //   });
  // };

  // 수정 버튼 modal 열기
  const onClickUpdate = data => {
    const tempData = { ...data };
    console.log(data);
    setModalData(tempData);
    setModalVisible(true);
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

  const rowSelection = {
    ...selectedRowKeys.id,
    onChange: (a, record) => {
      setSelectedRowKeys(record);
      // setSelectedUsers(selected);
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
        <Breadcrumb.Item>부품/자재 관리</Breadcrumb.Item>
        <Breadcrumb.Item>수명 데이터 관리</Breadcrumb.Item>
        <Breadcrumb.Item>사용 연한 기초 관리</Breadcrumb.Item>
      </Breadcrumb>
      <Spin spinning={loading}>
        <div style={{ padding: 20, backgroundColor: 'white' }}>
          <div style={{ float: 'left' }}>
            <h3>
              <strong>사용 연한 기초</strong>
            </h3>
          </div>
          <div style={{ float: 'right' }}>
            <Space>
              <Button onClick={onClickUpdate}>
                <PlusOutlined />
              </Button>
              <Button onClick={onClickUpdate}>
                <EditOutlined />
              </Button>
              <Space size="middle">
                <Popconfirm
                  placement="leftBottom"
                  title="정말로 삭제하시겠습니까?"
                  onConfirm={() => {
                    message.success('삭제 완료');
                  }}
                  okText="Yes"
                  cancelText="No"
                  icon={<QuestionCircleOutlined style={{ color: 'red' }} />}
                >
                  <Button>
                    <DeleteFilled />
                  </Button>
                </Popconfirm>
              </Space>
            </Space>
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
        </div>
      </Spin>

      <UpdateModal
        modalData={modalData}
        selectedRowKeys={selectedRowKeys}
        setselectedRowKeys={setSelectedRowKeys}
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
