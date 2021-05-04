/* eslint-disable jsx-a11y/anchor-is-valid */
import React,{useEffect, useState} from 'react';
import { Menu,Popover } from 'antd';
import axios from 'axios';
import { USER_SERVER } from '../../../Config';
import { withRouter } from 'react-router-dom';
import { useSelector } from "react-redux";
import { Link } from 'react-router-dom';
//import { UserOutlined } from '@ant-design/icons';
import { FaUserCircle } from 'react-icons/fa';


function RightMenu(props) {
    const user = useSelector(state => state.user)

    const content = (
        <div>
          <p>이름: {user?.userData?.name}</p>
          <p>권한: {user?.userData?.role===0 ? '일반 사용자':'관리자'}</p>
        </div>
        );

    //console.log(user)
    const logoutHandler = () => {
        axios.get(`${USER_SERVER}/logout`).then(response => {
            if (response.status === 200) {
                props.history.push("/login");
            } else {
                alert('Log Out Failed')
            }
        });
    };

    if(user.userData === undefined){
        return null; 
    }else{
        if (user.userData && !user.userData.isAuth ) {
            return (
                <Menu mode={props.mode}>
                    <Menu.Item key="login" className="customclass">
                        <Link to="/login">Signin</Link>
                    </Menu.Item>
                    <Menu.Item key="register">
                        <Link to="/register">Signup</Link>
                    </Menu.Item>
                </Menu>
            )
                
            } else {
                return (
                <Menu mode={props.mode}>
                    <Menu.Item key="user" className="customclass" style={{marginRight:0}}>
                        <Popover placement="bottom" title={user.userData.id} content={content}>
                            <Link to="/user"><FaUserCircle style={{fontSize:'25px', verticalAlign:"middle"}}/></Link>
                        </Popover>
                    </Menu.Item>
                    <Menu.Item key="logout" style={{marginLeft:0}}>
                        <a onClick={logoutHandler}>Logout</a>
                    </Menu.Item>
                </Menu>
                )
            }
    }
}

export default withRouter(RightMenu);

