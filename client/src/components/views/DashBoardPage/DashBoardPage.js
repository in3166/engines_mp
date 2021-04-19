import React, { useEffect, useState } from 'react';
import axios from 'axios';

import Navbar from '../NavBar/NavBar';
//import Footer from '../Footer/Footer';
import SideBar from '../SideBar/SideBar';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';

import { Layout, Menu, Breadcrumb } from 'antd';
import { UserOutlined, LaptopOutlined, NotificationOutlined } from '@ant-design/icons';

const { SubMenu } = Menu;
const { Header, Content, Footer, Sider } = Layout;

function DashBoardPage() {
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

            
                dash
                         

        </div>
    )
}

export default DashBoardPage
