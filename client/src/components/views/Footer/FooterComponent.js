import React, { useEffect, useState } from 'react';
import axios from 'axios';

import { Layout, Menu, Breadcrumb } from 'antd';
const { Header, Content, Sider, Footer } = Layout;

function FooterComponent() {


    return (
        <div style={{ display: 'inline' }}>
            <Footer style={{ textAlign: 'center', padding: '3px 3px 3px 3px', backgroundColor: 'white' }}>Ant Design ©2021 Created by Ant UED</Footer>
        </div>
    )
}

export default FooterComponent
