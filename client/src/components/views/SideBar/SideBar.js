import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { Layout, Menu } from 'antd';
import {
  LaptopOutlined,
  DashboardOutlined,
  SettingFilled,
} from '@ant-design/icons';

import useWindowDimensions from '../../../hooks/useWindowDimensions';

const { SubMenu } = Menu;
const { Sider } = Layout;

function SideBar() {
  const [Collapse, setCollapsed] = useState(false);
  const { width } = useWindowDimensions(Collapse);
  const [Sites, setSites] = useState([]);

  const getAllSites = () => {
    axios.get('/api/sites/getAllSites').then(res => {
      setSites(res.data.sites);
    });
  };

  useEffect(() => {
    getAllSites();
  }, []);

  const href = window.location.pathname;

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
        defaultSelectedKeys={[`${href}`]}
        selectedKeys={[`${href}`]}
        style={{ height: '100%', borderRight: 0 }}
        defaultOpenKeys={['sub5', 'sub2']}
      >
        <Menu.Item key="/" icon={<DashboardOutlined />}>
          <Link to="/">DashBoard</Link>
        </Menu.Item>
        <SubMenu key="sub5" icon={<SettingFilled />} title="Sites">
          {Sites?.map(v => (
            <Menu.Item key={`/site/${v.id}`}>
              <Link to={`/site/${v.id}`}>{v.name}</Link>
            </Menu.Item>
          ))}
        </SubMenu>
        <SubMenu key="sub2" icon={<LaptopOutlined />} title="예측 결과 분석">
          <Menu.Item key="/machinePredict">
            <Link to="/machinePredict">기계 분석</Link>
          </Menu.Item>
          <Menu.Item key="/engineerPredict">
            <Link to="/engineerPredict">엔지니어 분석</Link>
          </Menu.Item>
          <Menu.Item key="/expertPredict">
            <Link to="/expertPredict">전문가 분석</Link>
          </Menu.Item>
          <Menu.Item key="/synthesisPredict">
            <Link to="/synthesisPredict">통합 분석</Link>
          </Menu.Item>
        </SubMenu>
      </Menu>
    </Sider>
  );
}

export default SideBar;
