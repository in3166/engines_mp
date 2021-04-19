import React, { useEffect, useState } from 'react';
import axios from 'axios';

import Navbar from '../NavBar/NavBar';
//import Footer from '../Footer/Footer';
import SideBar from '../SideBar/SideBar';

import { Doughnut } from 'react-chartjs-2';

import { Layout, Menu, Breadcrumb, Row, Col } from 'antd';
import { UserOutlined, LaptopOutlined, NotificationOutlined } from '@ant-design/icons';

const { SubMenu } = Menu;
const { Header, Content, Footer, Sider } = Layout;


const data = {
    labels: [
        'Red',
        'Green',
        'Yellow'
    ],
    datasets: [{
        data: [300, 50, 100],
        backgroundColor: [
            '#FF6384',
            '#36A2EB',
            '#FFCE56'
        ],
        hoverBackgroundColor: [
            '#FF6384',
            '#36A2EB',
            '#FFCE56'
        ]
    }]
};

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
        <div style={{ width: '100%' }}>
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
            {/* <Layout>
                <Navbar />
                <Layout>
                    <SideBar /> */}
            <Layout style={{ padding: '0 24px 24px', overflow: 'auto' }}>
                <Breadcrumb style={{ margin: '16px 0' }}>
                    <Breadcrumb.Item>Home</Breadcrumb.Item>
                    <Breadcrumb.Item>List</Breadcrumb.Item>
                    <Breadcrumb.Item>App</Breadcrumb.Item>
                </Breadcrumb>
                DashBoard
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
                    <Row gutter={[16, 16]}>
                        <Col lg={12} xs={24} >
                            <div className="chart">
                                <h2>Engine1</h2>
                                <Doughnut data={data} />
                            </div>
                        </Col>

                        <Col lg={12} xs={24} >
                            <div className="chart">
                                <h2>Engine2</h2>
                                <Doughnut data={data} />
                            </div>
                        </Col>

                        <Col lg={12} xs={24} >
                            <div className="chart">
                                <h2>Engine3</h2>
                                <Doughnut data={data} />
                            </div>
                        </Col>

                        <Col lg={12} xs={24} >
                            <div className="chart">
                                <h2>Engine4</h2>
                                <Doughnut data={data} />
                            </div>
                        </Col>
                    </Row>

                </Content>
                {/* <Footer style={{ textAlign: 'center' }}>Ant Design ©2018 Created by Ant UED</Footer> */}
            </Layout>
            {/* </Layout>
            </Layout> */}
        </div>
    )
}

export default LandingPage
