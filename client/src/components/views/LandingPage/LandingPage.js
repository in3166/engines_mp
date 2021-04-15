import React, { useEffect, useState } from 'react';
import axios from 'axios';

import Navbar from '../NavBar/NavBar';
//import Footer from '../Footer/Footer';
import SideBar from '../SideBar/SideBar';


import { Layout, Menu, Breadcrumb } from 'antd';
import { UserOutlined, LaptopOutlined, NotificationOutlined } from '@ant-design/icons';

const { SubMenu } = Menu;
const { Header, Content, Footer, Sider } = Layout;

function LandingPage() {
    const [getMessage, setGetMessage] = useState({})
    const [PredictMessage, setPredictMessage] = useState({})

    // useEffect(() => {
    //     axios.get('/api/test').then(response => {
    //         console.log("test", response)
    //         setGetMessage(response)
    //     }).catch(error => {
    //         console.log(error)
    //     })

    //     axios.post('/api/predict').then(response => {
    //         console.log("predict", response)
    //         setPredictMessage(response)
    //     }).catch(error => {
    //         console.log(error)
    //     })

    // }, [])

    return (
        <div>
            {/* <div>
                {getMessage.status === 200 ?
                    <h3>{getMessage.data.message}</h3>
                    :
                    <h3>/test/LOADING</h3>}
                <hr />
                {PredictMessage.status === 200 ?
                    <h3>{PredictMessage.data.message}</h3>
                    :
                    <h3>/predict/LOADING</h3>}
            </div> */}
            <Layout>
                <Navbar />

                <Layout>
                    <SideBar />

                    <Layout style={{ padding: '0 24px 24px', height: '95vh', overflow: 'auto' }}>
                        <Breadcrumb style={{ margin: '16px 0' }}>
                            <Breadcrumb.Item>Home</Breadcrumb.Item>
                            <Breadcrumb.Item>List</Breadcrumb.Item>
                            <Breadcrumb.Item>App</Breadcrumb.Item>
                        </Breadcrumb>
                        <Content
                            className="site-layout-background"
                            style={{
                                padding: 24,
                                margin: 0,
                                minHeight: 280,
                                height: '100%'
                            }}
                        >
                            Content
        </Content>
                        <Footer style={{ textAlign: 'center' }}>Ant Design ©2018 Created by Ant UED</Footer>
                    </Layout>
                </Layout>
            </Layout>
        </div>
    )
}

export default LandingPage
