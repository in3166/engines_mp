import React, { useEffect, useState } from 'react';
import axios from 'axios';

import { Layout, Menu, Breadcrumb } from 'antd';
const { Header, Content, Sider, Footer } = Layout;

function FooterComponent() {


    return (
        <div>
            <Footer style={{ textAlign: 'center', padding: '0 0 10px 10px' }}>Ant Design ©2018 Created by Ant UED</Footer>
        </div>
    )
}

export default FooterComponent
