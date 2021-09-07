import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Layout, Menu } from 'antd';
import {
  TeamOutlined,
  DashboardOutlined,
  IdcardOutlined,
} from '@ant-design/icons';
import { useSelector } from 'react-redux';
import useWindowDimensions from '../../utils/WindowSize/useWindowDimensions';

const { SubMenu } = Menu;
const { Sider } = Layout;

function SideBar() {
  const [Collapse, setCollapsed] = useState(false);
  const { width } = useWindowDimensions(Collapse);
  const user = useSelector(state => state.user);

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
        defaultOpenKeys={['sub3', 'sub4']}
        theme="dark"
      >
        <Menu.Item key="1" icon={<DashboardOutlined />}>
          <Link to="/">DashBoard</Link>
        </Menu.Item>
        {user?.userData?.role === 1 && (
          <>
            <SubMenu key="sub3" icon={<TeamOutlined />} title="전문가 관리">
              <Menu.Item key="10">
                <Link to="/addExpert">전문가 등록</Link>
              </Menu.Item>
              <Menu.Item key="11">전문가 그룹</Menu.Item>
              <Menu.Item key="12">권한 관리</Menu.Item>
            </SubMenu>
            <SubMenu key="sub4" icon={<IdcardOutlined />} title="사용자 관리">
              <Menu.Item key="13">
                <Link to="/usersAuth">권한 관리</Link>
              </Menu.Item>
              <Menu.Item key="14">사이트 관리</Menu.Item>
              <Menu.Item key="15">사이트별 엔진</Menu.Item>
            </SubMenu>
          </>
        )}
      </Menu>
    </Sider>
  );
}

export default SideBar;