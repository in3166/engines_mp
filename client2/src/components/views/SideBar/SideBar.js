import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Layout, Menu } from 'antd';
import {
  // TeamOutlined,
  // LaptopOutlined,
  NotificationOutlined,
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
        defaultOpenKeys={['sub1', 'sub2', 'sub3']}
        style={{ height: '100%', borderRight: 0 }}
      >
        <Menu.Item key="0">
          <Link to="/">Dashboard</Link>
        </Menu.Item>
        <SubMenu key="sub1" icon={<HddOutlined />} title="수명 데이터 관리">
          <Menu.Item key="1">
            <Link to="/engineParts">엔진별 부품 목록</Link>
          </Menu.Item>
          <Menu.Item key="2">
            <Link to="/lifeCode">사용 연한 기초 관리</Link>
          </Menu.Item>
          <Menu.Item key="3">
            <Link to="/utilList">실 사용 연한 피드백</Link>
          </Menu.Item>
        </SubMenu>
        <SubMenu key="sub2" icon={<HddOutlined />} title="부품/자재 재고 관리">
          {/* <Menu.Item key="4">
            <Link to="/enginePartsList">엔진별 목록 관리</Link>
          </Menu.Item> */}
          <Menu.Item key="5">
            <Link to="/sitePartsList">사이트별 재고 목록</Link>
          </Menu.Item>
          <Menu.Item key="6">
            <Link to="/headquartersStocks">본사 재고 관리</Link>
          </Menu.Item>
          <Menu.Item key="7">
            <Link to="/branchStocks">지사 재고 관리</Link>
          </Menu.Item>
        </SubMenu>
        <SubMenu key="sub3" icon={<ProfileOutlined />} title="정비 주기 관리">
          <Menu.Item key="8">부품별 정비 주기</Menu.Item>
          <Menu.Item key="9">부품별 교체 시기</Menu.Item>
          <Menu.Item key="10">정비 및 교체 이력</Menu.Item>
        </SubMenu>
        <SubMenu
          key="sub4"
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
