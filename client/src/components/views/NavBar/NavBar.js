import React, { useEffect, useState } from 'react';
import LeftMenu from './Sections/LeftMenu';
import RightMenu from './Sections/RightMenu';
import { Drawer, Button } from 'antd';
import { Layout, Menu, Image, Dropdown } from 'antd';
import { AlignRightOutlined, DownOutlined } from '@ant-design/icons';
import './Sections/Navbar.css';
import { Link } from 'react-router-dom';

const { Header } = Layout;

function NavBar() {
    const [visible, setVisible] = useState(false)

    const showDrawer = () => {
        setVisible(true)
    };

    const onClose = () => {
        setVisible(false)
    };

    const setMenu = () => {
        setVisible(false)
    };

    return (
        <nav className="menu" style={{ zIndex: 5, width: '100%' }}>
            <div className="menu__logo">
                <Link to="/"><img className="logo" src="/logo.png" alt="logo" /></Link>
            </div>

            <div className="menu__container">
                <div className="menu_left">
                    <LeftMenu mode="horizontal" />
                </div>
                <div className="menu_rigth">
                    <RightMenu mode="horizontal" />
                </div>

                <Dropdown overlay={<Menu mode="horizontal"><LeftMenu mode="inline" /> <RightMenu mode="inline" /></Menu>}
                    className="menu_drawer">
                    <Button
                        className="menu__mobile-button"
                        type="primary"
                        onClick={showDrawer}
                        style={{ padding: 5 }}
                    >
                        <AlignRightOutlined />
                    </Button>
                </Dropdown>
            </div>
        </nav>
    )
}

export default NavBar