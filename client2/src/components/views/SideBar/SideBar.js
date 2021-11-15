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
  // DashboardOutlined,
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
        defaultSelectedKeys={[`/${href}/engineParts`]}
        selectedKeys={[`/${href}`]}
        defaultOpenKeys={['sub1', 'sub2', 'sub3']}
        style={{ height: '100%', borderRight: 0 }}
      >
        {/* <Menu.Item key="/" icon={<DashboardOutlined />}>
          <Link to="/">Dashboard</Link>
        </Menu.Item> */}
        <SubMenu key="sub1" icon={<HddOutlined />} title="수명 데이터 관리">
          <Menu.Item key="/engineParts">
            <Link to="/engineParts">엔진별 부품 목록</Link>
          </Menu.Item>
          <Menu.Item key="/lifeCode">
            <Link to="/lifeCode">사용 연한 기초 관리</Link>
          </Menu.Item>
          <Menu.Item key="/periodFeedback">
            <Link to="/periodFeedback">실 사용 연한 피드백</Link>
          </Menu.Item>
        </SubMenu>
        <SubMenu
          key="sub2"
          icon={<HddOutlined />}
          title={<span title="부품/자재 재고 관리">부품/자재 재고 관리</span>}
        >
          {/* <Menu.Item key="4">
            <Link to="/enginePartsList">엔진별 목록 관리</Link>
          </Menu.Item> */}
          <Menu.Item key="/sitePartsList">
            <Link to="/sitePartsList">사이트별 재고 목록</Link>
          </Menu.Item>
          <Menu.Item key="/headquartersStocks">
            <Link to="/headquartersStocks">본사 재고 관리</Link>
          </Menu.Item>
          <Menu.Item key="/branchStocks">
            <Link to="/branchStocks">지사 재고 관리</Link>
          </Menu.Item>
          <Menu.Item key="/orderParts">
            <Link to="/orderParts">주문 관리</Link>
          </Menu.Item>
        </SubMenu>
        <SubMenu
          key="sub3"
          icon={<ProfileOutlined />}
          title={<span title="엔진 정비 주기 관리">엔진 정비 주기 관리</span>}
        >
          <Menu.Item key="/partsMaintenanace">
            <Link to="/partsMaintenanace">부품별 정비 주기</Link>
          </Menu.Item>
          <Menu.Item key="/partsReplace">
            <Link to="/partsReplace">부품별 교체 시기</Link>
          </Menu.Item>
          <Menu.Item key="/engineMaintenance">
            <Link to="/engineMaintenance">정비 및 교체 이력</Link>
          </Menu.Item>
        </SubMenu>
        <SubMenu
          key="sub4"
          icon={<NotificationOutlined />}
          title="엔진 정비 메뉴얼"
        >
          <Menu.Item key="/engineList">
            <Link to="/engineList">엔진 목록</Link>
          </Menu.Item>
          <Menu.Item key="/partList">
            <Link to="/partList">부품 목록</Link>
          </Menu.Item>
          <Menu.Item key="/manual">
            <Link to="/manual">메뉴얼 입력/수정</Link>
          </Menu.Item>
          {/* <Menu.Item
            key="23"
            title="엔진 정비 시 필요 부품/자재/공구 목록 관리"
          >
            엔진 정비 시 필요 부품/자재/공구 목록 관리
          </Menu.Item> */}
          <Menu.Item key="/manualUpdateList">
            <Link to="/manualUpdateList">메뉴얼 수정 이력</Link>
          </Menu.Item>
          <Menu.Item key="/searchModule">
            <Link to="/searchModule">메뉴얼 검색 모듈</Link>
          </Menu.Item>
        </SubMenu>
      </Menu>
    </Sider>
  );
}

export default SideBar;
