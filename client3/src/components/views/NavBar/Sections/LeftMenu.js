import React from 'react';
import { Menu } from 'antd';
import PropTypes from 'prop-types';
import CONFIG from '../../../../../../ipconfig.json';

// const { SubMenu } = Menu;
// const MenuItemGroup = Menu.ItemGroup;

function LeftMenu(props) {
  const { mode } = props;

  return (
    <Menu mode={mode}>
      <Menu.Item key="predict">
        <a href={`${CONFIG.IP}:3000`} target="_blank" rel="noreferrer">
          고장 예측
        </a>
      </Menu.Item>
      <Menu.Item key="user">
        <a href={`${CONFIG.IP}:3001`} target="_blank" rel="noreferrer">
          부품/자재 관리
        </a>
      </Menu.Item>
      {/* <SubMenu title={<span>Menu2</span>}>
        <MenuItemGroup title="Item 1">
          <Menu.Item key="setting:1">Option 1</Menu.Item>
          <Menu.Item key="setting:2">Option 2</Menu.Item>
        </MenuItemGroup>
        <MenuItemGroup title="Item 2">
          <Menu.Item key="setting:3">Option 3</Menu.Item>
          <Menu.Item key="setting:4">Option 4</Menu.Item>
        </MenuItemGroup>
      </SubMenu> */}
    </Menu>
  );
}

LeftMenu.propTypes = {
  mode: PropTypes.elementType.isRequired,
};

export default LeftMenu;
