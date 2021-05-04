import React from 'react'
import { Layout, Breadcrumb } from 'antd';
import {useSelector} from 'react-redux'
const { Content } = Layout;

function UserPage(props) {
    let userData = props.user.userData;
    //const user = useSelector(state => state.user.userData);
    //console.log('userselect', user)
    if(userData==null) return null;
    return (
        <div style={{ width: '100%' }}>
            <Layout style={{ padding: '0 24px 24px', overflow: 'auto' }}>
                <Breadcrumb style={{ margin: '16px 0' }}>
                    <Breadcrumb.Item>User</Breadcrumb.Item>
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
                    ID: {userData.id} <br/>
                    이름: {userData.name} <br/>
                    권한: {userData.role == 0 ? '일반 사용자' : '관리자' } <br/>
                    Email: <input type="email" placeholder={userData.email}/><br/>
                    <button>비밀번호 변경</button><br/>
                    <button>저장</button>
                  </div>

                </Content>
            </Layout>
        </div>
    )
}

export default UserPage
