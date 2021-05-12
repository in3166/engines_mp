import React, {useState,useEffect} from 'react'
import { Layout, Breadcrumb } from 'antd';
//import {useSelector} from 'react-redux'
import { Transfer, Button,message } from 'antd';
import axios from 'axios';
import {ReloadOutlined } from '@ant-design/icons';

const { Content } = Layout;

function AddExpertPage() {
    const [mockData, setmockData] = useState([]);
    const [targetKeys, settargetKeys] = useState([]);
   // const [selectedKeys, setselectedKeys] = useState([]);
 
    const getAllUsers = () => {
        const targetKeys2 = [];
        const mockData2 = [];

        axios.get('/api/users/getAllUsers')
        .then(res=>{
            for (let i = 0; i < res.data.users.length; i++) {
                const data = {
                    key: i.toString(),
                    id: `${res.data.users[i].id}`,
                    //description: `description of content${i + 1}`,
                    chosen: res.data.users[i].role,
                };
                // 전문가의 경우 타겟 오른쪽 박스
                if (data.chosen === 2) {
                    targetKeys2.push(data.key);
                }
                // 일반 사용자나 전문가일 경우 list에 넣기
                if(data.chosen === 0 || data.chosen === 2){
                    mockData2.push(data);
                }
            }
            setmockData(mockData2);
            settargetKeys(targetKeys2);
        })
    }

    useEffect(() => {
        getAllUsers()
    },[])
    // 모든 사용자 불러오기


    const handleChange = (targetKey,direction,movekey) => {
        //console.log('direction:', direction, ' / movekey: ',movekey)
        //console.log('targetKey:', targetKey)
        
        let body = {
            users:mockData.filter(user => {
                return movekey.find(o => o === user.key)
            }),
            direction: direction
        };
        //console.log(body);
        axios.post('/api/users/changeRole', body)
        .then(res=>{
            if(res.data.success){
                settargetKeys( targetKey );
                getAllUsers();
                message.success('권한이 성공적으로 변경되었습니다.');
            }
        })
        .catch(err=>{
            if(err) message.error('권한 변경 오류');
        })
      };

    //  const handleSelectChange = (sourceSelectedKeys, targetSelectedKeys) => {
    //     console.log('selectedKeys: ',selectedKeys)
    //     console.log('sourceSelectedKeys: ',sourceSelectedKeys)
    //     console.log('targetSelectedKeys: ',targetSelectedKeys)
    //     setselectedKeys(
    //         [...sourceSelectedKeys, ...targetSelectedKeys]
    //     );
    //     console.log('after selectedKeys: ',selectedKeys)
    //   };

    const renderFooter = () => (
        <Button size="small" style={{ float: 'right', margin: 5 }} onClick={getAllUsers}>
          <ReloadOutlined />
        </Button>
      );

    return (
        <div style={{ width: '100%' }}>
        <Layout style={{ padding: '0 24px 24px', overflow: 'auto' }}>
            <Breadcrumb style={{ margin: '16px 0' }}>
                <Breadcrumb.Item>Home</Breadcrumb.Item>
                <Breadcrumb.Item>전문가 관리</Breadcrumb.Item>
                <Breadcrumb.Item>전문가 등록</Breadcrumb.Item>
            </Breadcrumb>
            <Content
                className="site-layout-background"
                style={{
                    padding: 12,
                    margin: 0,
                    minHeight: 280,
                    height: '100%',
                    border: '1px solid'
                }}
            >
              <div>
                    <Transfer
                        locale={{itemUnit:'명', itemsUnit:'명'}}
                        dataSource={mockData}
                        titles={['일반 사용자', '전문가']}
                        showSearch
                        listStyle={{
                        width: '100%',
                        height: 400,
                        }}
                        operations={['추가', '제거']}
                        targetKeys={targetKeys}
                        //selectedKeys={selectedKeys}
                        //onSelectChange={handleSelectChange}
                        onChange={handleChange}
                        render={item => `${item.id}`}
                        footer={renderFooter}
                    />
              </div>

            </Content>
        </Layout>
    </div>
    )
}

export default AddExpertPage
