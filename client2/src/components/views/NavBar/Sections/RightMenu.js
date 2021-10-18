/* eslint-disable jsx-a11y/anchor-is-valid */
import React from 'react';
import { Menu, message, Popover } from 'antd';
import axios from 'axios';
import { withRouter, Link, useHistory } from 'react-router-dom';
import { useSelector } from 'react-redux';
import PropTypes from 'prop-types';

// import { UserOutlined } from '@ant-design/icons';
import { FaUserCircle } from 'react-icons/fa';
import { USER_SERVER } from '../../../Config';

function RightMenu(props) {
  const user = useSelector(state => state.user);
  const history = useHistory();
  const { mode } = props;
  const content = (
    <div>
      <p>이름: {user?.userData?.name}</p>
      <p>권한: {user?.userData?.role === 0 ? '일반 사용자' : '관리자'}</p>
    </div>
  );

  // console.log(user)
  const logoutHandler = () => {
    axios.get(`${USER_SERVER}/logout`).then(response => {
      if (response.status === 200) {
        history.push('/login');
      } else {
        message.error('Log Out Failed');
      }
    });
  };

  if (user.userData === undefined) {
    return null;
  }
  if (user.userData && !user.userData.isAuth) {
    return (
      <Menu mode={mode}>
        <Menu.Item key="login" className="customclass">
          <Link to="/login">Signin</Link>
        </Menu.Item>
        <Menu.Item key="register">
          <Link to="/register">Signup</Link>
        </Menu.Item>
      </Menu>
    );
  }
  return (
    <Menu mode={mode}>
      <Menu.Item key="user" className="customclass" style={{ marginRight: 0 }}>
        <Popover placement="bottom" title={user.userData.id} content={content}>
          <Link to="/user">
            <FaUserCircle
              style={{ fontSize: '25px', verticalAlign: 'middle' }}
            />
          </Link>
        </Popover>
      </Menu.Item>
      <Menu.Item key="logout" style={{ marginLeft: 0 }}>
        <a
          tabIndex="0"
          role="button"
          onClick={logoutHandler}
          onKeyDown={logoutHandler}
        >
          Logout
        </a>
      </Menu.Item>
    </Menu>
  );
}

RightMenu.propTypes = {
  mode: PropTypes.elementType.isRequired,
};

export default withRouter(RightMenu);
