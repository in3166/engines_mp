import React, { useState } from 'react'
import { Layout, Menu, Breadcrumb, Row, Col, Progress, Space, Table, Input, Button } from 'antd';
import { SearchOutlined } from '@ant-design/icons';



const { SubMenu } = Menu;
const { Header, Content, Footer, Sider } = Layout;

function UnitListPage() {

    const columns = [
        {
            title: 'Name',
            dataIndex: 'name',
        },
        {
            title: 'Chinese Score',
            dataIndex: 'chinese',
            sorter: {
                compare: (a, b) => a.chinese - b.chinese,
                multiple: 3,
            },
        },
        {
            title: 'Math Score',
            dataIndex: 'math',
            sorter: {
                compare: (a, b) => a.math - b.math,
                multiple: 2,
            },
        },
        {
            title: 'English Score',
            dataIndex: 'english',
            sorter: {
                compare: (a, b) => a.english - b.english,
                multiple: 1,
            },
        },
    ];

    const data = [
        {
            key: '1',
            name: 'John Brown',
            chinese: 98,
            math: 60,
            english: 70,
        },
        {
            key: '2',
            name: 'Jim Green',
            chinese: 98,
            math: 66,
            english: 89,
        },
        {
            key: '3',
            name: 'Joe Black',
            chinese: 98,
            math: 90,
            english: 70,
        },
        {
            key: '4',
            name: 'Jim Red',
            chinese: 88,
            math: 99,
            english: 89,
        },
    ];

    return (
        <div style={{ width: '100%' }}>
            <Layout style={{ padding: '0 24px 24px', overflow: 'auto' }}>
                <Breadcrumb style={{ margin: '16px 0' }}>
                    <Breadcrumb.Item>Home</Breadcrumb.Item>
                    <Breadcrumb.Item>부품/자재 관리</Breadcrumb.Item>
                    <Breadcrumb.Item>부품/자재 목록</Breadcrumb.Item>
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
                    <Table columns={columns} dataSource={data} />
                </Content>
            </Layout>
        </div>
    )
}

export default UnitListPage
