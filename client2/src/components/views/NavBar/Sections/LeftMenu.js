import React from 'react';
import { Menu } from 'antd';
import PropTypes from 'prop-types';

function LeftMenu(props) {
  const { mode } = props;

  return (
    <Menu mode={mode}>
      <Menu.Item key="engine">
        <a href="http://localhost:3002" target="_blank" rel="noreferrer">
          부품/자재 관리
        </a>
      </Menu.Item>
      <Menu.Item key="predict">
        <a href="http://localhost:3000" target="_blank" rel="noreferrer">
          고장 예측
        </a>
      </Menu.Item>
    </Menu>
  );
}

LeftMenu.propTypes = {
  mode: PropTypes.elementType.isRequired,
};

export default LeftMenu;
