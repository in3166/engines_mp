import React, { useEffect, useState } from 'react';
import axios from 'axios';

import { Layout, Menu } from 'antd';
import { UserOutlined, LaptopOutlined, NotificationOutlined } from '@ant-design/icons';

const { SubMenu } = Menu;
const { Sider } = Layout;

function SideBar() {
    const [Collapsed, setCollapsed] = useState(false);

    const onCollapse = Collapsed => {
        console.log(Collapsed);
        setCollapsed(Collapsed);
    };

    return (
        <Sider width={200} breakpoint="md" className="site-layout-background" collapsible collapsed={Collapsed} onCollapse={onCollapse}>
            <Menu
                mode="inline"
                defaultSelectedKeys={['1']}
                defaultOpenKeys={['sub1']}
                style={{ height: '100%', borderRight: 0 }}
            >
                <SubMenu key="sub1" icon={<LaptopOutlined />} title="Engines">
                    <Menu.Item key="1">Engine1</Menu.Item>
                    <Menu.Item key="2">Engine2</Menu.Item>
                    <Menu.Item key="3">Engine3</Menu.Item>
                    <Menu.Item key="4">Engine4</Menu.Item>
                </SubMenu>
                <SubMenu key="sub2" icon={<LaptopOutlined />} title="예측 결과 분석">
                    <Menu.Item key="5">기계 분석</Menu.Item>
                    <Menu.Item key="6">엔지니어 분석</Menu.Item>
                    <Menu.Item key="7">전문가 분석</Menu.Item>
                    <Menu.Item key="8">통합 분석</Menu.Item>
                </SubMenu>
                <SubMenu key="sub3" icon={<UserOutlined />} title="전문가 관리">
                    <Menu.Item key="9">전문가 등록</Menu.Item>
                    <Menu.Item key="10">전문가 그룹</Menu.Item>
                    <Menu.Item key="11">권한 관리</Menu.Item>
                </SubMenu>
                <SubMenu key="sub4" icon={<UserOutlined />} title="사용자 관리">
                    <Menu.Item key="12">권한 관리</Menu.Item>
                    <Menu.Item key="13">사이트 관리</Menu.Item>
                    <Menu.Item key="14">사이트별 엔진</Menu.Item>
                </SubMenu>
                <SubMenu key="sub5" icon={<UserOutlined />} title="부품/자재 관리">
                    <Menu.Item key="15">부품/자재 목록</Menu.Item>
                    <Menu.Item key="16">부품/자재 재고</Menu.Item>
                    <Menu.Item key="17">본사 재고</Menu.Item>
                </SubMenu>
                <SubMenu key="sub6" icon={<NotificationOutlined />} title="엔진 정비 주기 관리">
                    <Menu.Item key="18">부품별 정비 주기</Menu.Item>
                    <Menu.Item key="19">부품별 교체 시기</Menu.Item>
                    <Menu.Item key="20">정비 및 교체 이력</Menu.Item>
                </SubMenu>
                <SubMenu key="sub7" icon={<NotificationOutlined />} title="엔진 정비 메뉴얼">
                    <Menu.Item key="21">메뉴얼 입력/수정</Menu.Item>
                    <Menu.Item key="22">Import 모듈</Menu.Item>
                    <Menu.Item key="23">부품/공구 목록</Menu.Item>
                    <Menu.Item key="24">수정 이력</Menu.Item>
                    <Menu.Item key="25">검색 모듈</Menu.Item>
                </SubMenu>
            </Menu>
        </Sider>
    )
}

export default SideBar
