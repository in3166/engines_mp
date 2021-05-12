import React from 'react'
import { Layout, Breadcrumb, Tabs, PageHeader  } from 'antd';
import PasswordChange from './Sections/PasswordChange'
import UserInfo from './Sections/UserInfo'
//import {useSelector} from 'react-redux'

const { Content } = Layout;
const { TabPane } = Tabs;

const layout = {
    labelCol: { span: 4 },
    wrapperCol: { span: 14 },
};

function UserPage(props) {
    let userData = props.user.userData;
    //const user = useSelector(state => state.user.userData);
    //console.log('userselect', user)
    

    if(userData==null) {return null;}

    return (
        <div style={{ width: '100%' }}>
            <Layout style={{ padding: '0 24px 24px', overflow: 'auto' }}>
                <PageHeader
                    title="User Page"
                    />
                   
                <Content
                    className="site-layout-background"
                    style={{
                        padding: 12,
                        margin: 0,
                        minHeight: 280,
                        height: '100%',
                       
                    }}
                >
                 
                    <Tabs defaultActiveKey="1"  size='large' style={{background:'white', padding: '0 20px 10px 20px'}} >
                        <TabPane tab="개인정보" key="1" >
                            <UserInfo userData={userData} layout={layout}/>
                        </TabPane>
                        <TabPane tab="비밀번호 변경" key="2">
                            <PasswordChange userData={userData} layout={layout}/>
                        </TabPane>
                    </Tabs>
                </Content>
            </Layout>
        </div>
    )
}

export default UserPage
