import React, { useEffect, useState } from 'react';
import axios from 'axios';

// import Navbar from '../NavBar/NavBar';
// //import Footer from '../Footer/Footer';
// import SideBar from '../SideBar/SideBar';
// import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';
import { Layout, Menu, Breadcrumb } from 'antd';
//import { UserOutlined, LaptopOutlined, NotificationOutlined } from '@ant-design/icons';
//const { SubMenu } = Menu;
const { Header, Content, Footer, Sider } = Layout;


function EnginePage() {
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
        <div style={{ width: '100%' }}>
            <Layout style={{ padding: '0 24px 24px', overflow: 'auto' }}>
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
                        height: '100%',
                        border: '1px solid'
                    }}
                >
                    Engine
                        </Content>
                {/* <Footer style={{ textAlign: 'center' }}>Ant Design ©2018 Created by Ant UED</Footer> */}
            </Layout>
        </div>
    )
}

export default EnginePage
