import React from 'react';
import { Menu } from 'antd';
import PropTypes from 'prop-types';

import CONFIG from '../../../../ipconfig.json';

function LeftMenu(props) {
  const { mode } = props;

  return (
    <Menu mode={mode}>
      <Menu.Item key="engine">
        <a href={`${CONFIG.IP}:13001`} target="_blank" rel="noreferrer">
          부품/자재 관리
        </a>
      </Menu.Item>
      <Menu.Item key="user">
        <a href={`${CONFIG.IP}:13002`} target="_blank" rel="noreferrer">
          사용자/사이트 관리
        </a>
      </Menu.Item>
    </Menu>
  );
}

LeftMenu.propTypes = {
  mode: PropTypes.elementType.isRequired,
};

export default LeftMenu;
