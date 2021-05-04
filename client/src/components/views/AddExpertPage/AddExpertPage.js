import React, {useState,useEffect} from 'react'
import { Layout, Breadcrumb } from 'antd';
//import {useSelector} from 'react-redux'
import { Transfer, Button } from 'antd';


const { Content } = Layout;

function AddExpertPage() {
    const [mockData, setmockData] = useState([]);
    const [targetKeys, settargetKeys] = useState([]);

    const getMock = () => {
        const targetKeys2 = [];
        const mockData2 = [];
        for (let i = 0; i < 20; i++) {
            const data = {
                key: i.toString(),
                title: `user${i + 1}`,
                //description: `description of content${i + 1}`,
                chosen: Math.random() * 2 > 1,
            };
            if (data.chosen) {
                targetKeys2.push(data.key);
            }
            mockData2.push(data);
        }
        setmockData(mockData2);
        settargetKeys(targetKeys2);
    }

    useEffect(() => {
        getMock()
    },[])

    const handleChange = targetKeys => {
        settargetKeys( targetKeys );
      };

    const renderFooter = () => (
        <Button size="small" style={{ float: 'right', margin: 5 }} onClick={getMock}>
          reload
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
                        locale={{itemUnit: `일반 사용자`, itemsUnit: `전문가`}}
                        dataSource={mockData}
                        showSearch
                        listStyle={{
                        width: 250,
                        height: 300,
                        }}
                        operations={['추가', '제거']}
                        targetKeys={targetKeys}
                        onChange={handleChange}
                        render={item => `${item.title}-${item.description}`}
                        footer={renderFooter}
                    />
              </div>

            </Content>
        </Layout>
    </div>
    )
}

export default AddExpertPage
