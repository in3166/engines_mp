import React from 'react';
import { Menu } from 'antd';
import PropTypes from 'prop-types';
import CONFIG from '../../../../ipconfig.json';
// const CONFIG = {
//   IP: 'http://localhost',
// };
function LeftMenu(props) {
  const { mode } = props;

  return (
    <Menu mode={mode}>
      <Menu.Item key="engine">
        <a href={`${CONFIG.IP}:13000`} target="_blank" rel="noreferrer">
          고장 예측
        </a>
      </Menu.Item>
      <Menu.Item key="predict">
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
