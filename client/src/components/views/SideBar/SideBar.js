import React, {  useState } from 'react';
import {  Link } from 'react-router-dom';
import { Layout, Menu } from 'antd';
import { TeamOutlined, LaptopOutlined, NotificationOutlined, DashboardOutlined, SettingFilled, ProfileOutlined, HddOutlined, IdcardOutlined } from '@ant-design/icons';
import { useSelector } from "react-redux";

const { SubMenu } = Menu;
const { Sider } = Layout;

function SideBar() {
    const [Collapsed, setCollapsed] = useState(false);
    let user = useSelector(state => state.user);
    //console.log("user: ",user);
    const onCollapse = Collapsed => {
        setCollapsed(Collapsed);
    };

    return (
        <Sider width={200} breakpoint="md" className="site-layout-background" collapsible collapsed={Collapsed} onCollapse={onCollapse}>
            <Menu
                mode="inline"
                defaultSelectedKeys={['1']}
                // defaultOpenKeys={['sub1']}
                style={{ height: '100%', borderRight: 0 }}

            >
                <Menu.Item key="1" icon={<DashboardOutlined />}>
                    <Link to="/">
                        DashBoard
                    </Link>
                </Menu.Item>
                <SubMenu key="sub1" icon={<SettingFilled />} title="Engines">
                    <Menu.Item key="2">
                        <Link to="/engine/1">
                            Engine-1
                        </Link>
                    </Menu.Item>
                    <Menu.Item key="3">Engine-2</Menu.Item>
                    <Menu.Item key="4">Engine-3</Menu.Item>
                    <Menu.Item key="5">Engine-4</Menu.Item>
                </SubMenu>
                <SubMenu key="sub2" icon={<LaptopOutlined />} title="예측 결과 분석">
                    <Menu.Item key="6">기계 분석</Menu.Item>
                    <Menu.Item key="7">엔지니어 분석</Menu.Item>
                    <Menu.Item key="8">전문가 분석</Menu.Item>
                    <Menu.Item key="9">통합 분석</Menu.Item>
                </SubMenu>
                {user?.userData?.role === 1 &&
                <SubMenu key="sub3" icon={<TeamOutlined />} title="전문가 관리">
                    <Menu.Item key="10">
                        <Link to="/addExpert">
                        전문가 등록
                        </Link>
                        </Menu.Item>
                    <Menu.Item key="11">전문가 그룹</Menu.Item>
                    <Menu.Item key="12">권한 관리</Menu.Item>
                </SubMenu>
                }
                <SubMenu key="sub4" icon={<IdcardOutlined />} title="사용자 관리">
                    <Menu.Item key="13">
                        <Link to="/usersAuth">
                            권한 관리
                        </Link>
                    </Menu.Item>
                    <Menu.Item key="14">사이트 관리</Menu.Item>
                    <Menu.Item key="15">사이트별 엔진</Menu.Item>
                </SubMenu>
                <SubMenu key="sub5" icon={<HddOutlined />} title="부품/자재 관리">
                    <Menu.Item key="16">
                        <Link to="/unitlist">
                            부품/자재 목록
                        </Link>
                    </Menu.Item>
                    <Menu.Item key="17">부품/자재 재고</Menu.Item>
                    <Menu.Item key="18">본사 재고</Menu.Item>
                </SubMenu>
                <SubMenu key="sub6" icon={<ProfileOutlined />} title="정비 주기 관리">
                    <Menu.Item key="19">부품별 정비 주기</Menu.Item>
                    <Menu.Item key="20">부품별 교체 시기</Menu.Item>
                    <Menu.Item key="21">정비 및 교체 이력</Menu.Item>
                </SubMenu>
                <SubMenu key="sub7" icon={<NotificationOutlined />} title="엔진 정비 메뉴얼">
                    <Menu.Item key="22">메뉴얼 입력/수정</Menu.Item>
                    <Menu.Item key="23">Import 모듈</Menu.Item>
                    <Menu.Item key="24">부품/공구 목록</Menu.Item>
                    <Menu.Item key="25">수정 이력</Menu.Item>
                    <Menu.Item key="26">검색 모듈</Menu.Item>
                </SubMenu>
            </Menu>
        </Sider>
    )
}

export default SideBar
