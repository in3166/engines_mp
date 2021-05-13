import React,{ useState , useEffect } from 'react'
import { Layout, Breadcrumb, Table, Space, Button, message, Popconfirm, Modal } from 'antd';
import { DeleteFilled ,EditOutlined } from '@ant-design/icons';
import axios from 'axios';

//const { SubMenu } = Menu;
const {  Content } = Layout;

// const data = [
//     {
//     id: 2,
//     name: 3,
//     email: 4,
//     auth: 5,
//     },
// ];

function UsersAuthPage() {
    const [selectedRowKeys, setselectedRowKeys] = useState([]);
    const [users, setUsers] = useState([]);
    const [modalVisible, setModalVisible] = useState(false);
    const [modalData, setModalData] = useState({});

    const getAllUsers = () => {
        const tempUser = [];

        axios.get('/api/users/getAllUsers')
        .then(res=>{
            for (let i = 0; i < res.data.users.length; i++) {
                let role = '';
                if(res.data.users[i].role !== 1){
                    if(res.data.users[i].role === 0) role = '일반 사용자'; else if(res.data.users[i].role === 2)  role = '전문가'; else if(res.data.users[i].role === 3)  role = '엔지니어';
                    const data = {
                        key: i.toString(),
                        id: `${res.data.users[i].id}`,
                        name: res.data.users[i].name,
                        email: res.data.users[i].email,
                        auth: role,
                    };
                    tempUser.push(data);
                }
            }
            setUsers(tempUser);
        })
    }

    useEffect(() => {
        getAllUsers()
    },[])

    const confirm = () => {
        message.info('Clicked on Yes.');
    }

    const onClickUpdate = (data) => {
        setModalData(data);
        setModalVisible(true);
    }

    const columns = [
        {
            title: 'ID',
            dataIndex: 'id',
            sorter: {
                compare: (a, b) => a.id.localeCompare(b.id),
                multiple: 1,
            },
            width: 100,
            align: 'center'
        },
        {
            title: '이름',
            dataIndex: 'name',
            sorter: {
                compare: (a, b) => a.name.localeCompare(b.name),
                multiple: 2,
            },
            width: 160,
            align: 'center'
        },
        {
            title: 'Email',
            dataIndex: 'email',
            sorter: {
                compare: (a, b) => a.email.localeCompare(b.email),
                multiple: 3,
            },
            width: 240,
            align: 'center'
        },
        {
            title: '권한',
            dataIndex: 'auth',
            filters: [
                { text: '일반 사용자', value: '일반 사용자' },
                { text: '전문가', value: '전문가' },
                { text: '엔지니어', value: '엔지니어' },
              ],
            onFilter: (value, record) => {return record.auth.indexOf(value) === 0},
            width: 110,
            align: 'center'
        },
        {
            title: '수정',
            dataIndex: 'update',
            key: 'action',
            render: (r, user) => {
                return (
                    <Space size="middle">
                        <a onClick={() => onClickUpdate(user)}><EditOutlined /></a>
                    </Space>
                    )
            },
            width: 70,
            align: 'center'
        },
        {
            title: '삭제',
            key: 'action',
            render: (r,data) => {
                return (
                    <Space size="middle">
                        <Popconfirm
                            placement="leftBottom"
                            title='정말로 삭제하시겠습니까?'
                            onConfirm={confirm}
                            okText="Yes"
                            cancelText="No"
                        >
                            <a><DeleteFilled /></a>
                        </Popconfirm>
                    </Space>
                );
            }
            ,
            width: 70,
            align: 'center'
        },
    ];

    const onSelectChange = selectedRowKeys => {
        console.log('selectedRowKeys changed: ', selectedRowKeys);
        setselectedRowKeys( selectedRowKeys );
      };

    const rowSelection = {
        selectedRowKeys,
        onChange: onSelectChange,
        selections: [
          Table.SELECTION_ALL,
          Table.SELECTION_NONE,
          Table.SELECTION_INVERT,
        ]
    }

    
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
                        border: '1px solid'
                    }}
                >   
                    <div style={{float:'right'}}>
                        <Button>새로고침</Button>  <Button>회원 탈퇴</Button> <br/><br/>
                    </div>

                    <Table rowSelection={rowSelection} columns={columns} dataSource={users} bordered/>

                    <Modal
                        title="권한 수정"
                        style={{ top: 200 }}
                        visible={modalVisible}
                        onOk={() => setModalVisible(false)}
                        onCancel={() => setModalVisible(false)}
                    >
                        <p>{modalData.id}</p>
                        <p>{modalData.name}</p>
                        <p>{modalData.email}</p>
                        <p>{modalData.auth}</p>

                    </Modal>
                </Content>
            </Layout>
        </div>
    )
}

export default UsersAuthPage