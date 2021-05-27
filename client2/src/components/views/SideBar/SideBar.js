import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Layout, Menu } from 'antd';
import {
  // TeamOutlined,
  // LaptopOutlined,
  NotificationOutlined,
  DashboardOutlined,
  // SettingFilled,
  ProfileOutlined,
  HddOutlined,
  // IdcardOutlined,
} from '@ant-design/icons';
// import { useSelector } from 'react-redux';
import useWindowDimensions from '../../utils/WindowSize/useWindowDimensions';

const { SubMenu } = Menu;
const { Sider } = Layout;

function SideBar() {
  const [Collapse, setCollapsed] = useState(false);
  const { width } = useWindowDimensions(Collapse);
  // const user = useSelector(state => state.user);

  const onCollapse = Collapsed => {
    setCollapsed(Collapsed);
  };

  return (
    <Sider
      width={200}
      breakpoint="md"
      className="site-layout-background"
      collapsible
      collapsed={Collapse}
      onCollapse={onCollapse}
      collapsedWidth={width < 420 && Collapse ? 0 : 80}
    >
      <Menu
        mode="inline"
        defaultSelectedKeys={['1']}
        defaultOpenKeys={['sub5', 'sub6', 'sub7']}
        style={{ height: '100%', borderRight: 0 }}
      >
        <Menu.Item key="1" icon={<DashboardOutlined />}>
          <Link to="/">DashBoard</Link>
        </Menu.Item>
        <SubMenu key="sub5" icon={<HddOutlined />} title="부품/자재 관리">
          <Menu.Item key="16">
            <Link to="/utilList">부품/자재 목록</Link>
          </Menu.Item>
          <Menu.Item key="17">부품/자재 재고</Menu.Item>
          <Menu.Item key="18">본사 재고</Menu.Item>
        </SubMenu>
        <SubMenu key="sub6" icon={<ProfileOutlined />} title="정비 주기 관리">
          <Menu.Item key="19">부품별 정비 주기</Menu.Item>
          <Menu.Item key="20">부품별 교체 시기</Menu.Item>
          <Menu.Item key="21">정비 및 교체 이력</Menu.Item>
        </SubMenu>
        <SubMenu
          key="sub7"
          icon={<NotificationOutlined />}
          title="엔진 정비 메뉴얼"
        >
          <Menu.Item key="22">메뉴얼 입력/수정</Menu.Item>
          <Menu.Item key="23">Import 모듈</Menu.Item>
          <Menu.Item key="24">부품/공구 목록</Menu.Item>
          <Menu.Item key="25">수정 이력</Menu.Item>
          <Menu.Item key="26">검색 모듈</Menu.Item>
        </SubMenu>
      </Menu>
    </Sider>
  );
}

export default SideBar;
