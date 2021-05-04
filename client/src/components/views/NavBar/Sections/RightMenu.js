/* eslint-disable jsx-a11y/anchor-is-valid */
import React from 'react';
import { Menu } from 'antd';
import axios from 'axios';
import { USER_SERVER } from '../../../Config';
import { withRouter } from 'react-router-dom';
import { useSelector } from "react-redux";
import { Link } from 'react-router-dom';
import { UserOutlined } from '@ant-design/icons';

function RightMenu(props) {
    const user = useSelector(state => state.user)
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
                    <Link to="/user" style={{ paddingBottom:0}} ><UserOutlined style={{fontSize: '20px', fontStyle:'bold', paddingLeft:'10px', paddingBottom:0}}/></Link>
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

