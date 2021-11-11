import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Layout, Menu } from 'antd';
import {
  TeamOutlined,
  DashboardOutlined,
  IdcardOutlined,
  BankOutlined,
} from '@ant-design/icons';
import { useSelector } from 'react-redux';
import useWindowDimensions from '../../utils/WindowSize/useWindowDimensions';

const { SubMenu } = Menu;
const { Sider } = Layout;

function SideBar() {
  const [Collapse, setCollapsed] = useState(false);
  const { width } = useWindowDimensions(Collapse);
  const user = useSelector(state => state.user);
  console.log(user);
  const href2 = window.location.href.split('/');
  const href = href2[3];

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
        defaultSelectedKeys={[`/${href}`]}
        selectedKeys={[`/${href}`]}
        defaultOpenKeys={['sub3', 'sub4', 'sub5']}
        theme="dark"
      >
        <Menu.Item key="/" icon={<DashboardOutlined />}>
          <Link to="/">사용자 목록</Link>
        </Menu.Item>
        {/* {user?.userData?.role === 1 && ( */}
        <>
          <SubMenu key="sub3" icon={<TeamOutlined />} title="전문가 관리">
            <Menu.Item key="/addExpert">
              <Link
                to="/addExpert"
                onClick={() => performance.mark('initialize_page_change')}
              >
                전문가 등록
              </Link>
            </Menu.Item>
            <Menu.Item key="/expertGroup">
              <Link to="/expertGroup">전문가 그룹</Link>
            </Menu.Item>
            <Menu.Item key="/expertAuth">
              <Link to="/expertAuth">권한 관리</Link>
            </Menu.Item>
          </SubMenu>
          <SubMenu key="sub4" icon={<IdcardOutlined />} title="사용자 관리">
            <Menu.Item key="/usersAuth">
              <Link to="/usersAuth">권한 관리</Link>
            </Menu.Item>
            <Menu.Item key="/manageDepartment">
              <Link to="/manageDepartment">부서 관리</Link>
            </Menu.Item>
            <Menu.Item key="/managePosition">
              <Link to="/managePosition">직급 관리</Link>
            </Menu.Item>
          </SubMenu>
          <SubMenu key="sub5" icon={<BankOutlined />} title="사이트 관리">
            <Menu.Item key="/siteManagePage">
              <Link to="/siteManagePage">사이트 관리</Link>
            </Menu.Item>
            <Menu.Item key="/siteEnginePage">
              <Link to="/siteEnginePage">사이트별 엔진</Link>
            </Menu.Item>
          </SubMenu>
        </>
        {/* )} */}
      </Menu>
    </Sider>
  );
}

export default SideBar;
