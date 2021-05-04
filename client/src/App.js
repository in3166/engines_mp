
import React from 'react';
import './App.css';
import {  Switch, Route, withRouter } from 'react-router-dom';
import LandingPage from './components/views/LandingPage/LandingPage';
import LoginPage from './components/views/LoginPage/LoginPage';
import RegisterPage from './components/views/RegisterPage/RegisterPage';
import EnginePage from './components/views/EnginePage/EnginePage';
import UnitListPage from './components/views/UnitListPage/UnitListPage';
import BackTopUtil from './components/utils/BackTopUtil/BackTopUtil';
import Navbar from './components/views/NavBar/NavBar';
import FooterComponent from './components/views/Footer/FooterComponent';
import UserPage from './components/views/UserPage/UserPage';
import AddExpertPage from './components/views/AddExpertPage/AddExpertPage';
import SideBar from './components/views/SideBar/SideBar';
import Auth from './hoc/auth';
import { Layout } from 'antd';
//const { Header, Content, Footer, Sider } = Layout;

function App(props) {

  return (

    <div>
      <Switch>
        <>
          <Route path="/login" component={Auth(LoginPage, false)} />
          <Route path="/register" component={Auth(RegisterPage, false)} />
          {props.location.pathname !== '/login' && props.location.pathname !== '/register' &&
            <Layout>
              <Navbar />
              <Layout>
                <SideBar />
                <Route exact path="/" component={Auth(LandingPage, null)} />
                <Route path="/engine/1" component={Auth(EnginePage, true)} />
                <Route path="/unitlist" component={Auth(UnitListPage,true)} />
                <Route path="/addExpert" component={Auth(AddExpertPage,true, true)} />
                <Route path="/user" component={Auth(UserPage, true)} />
              </Layout>
              <FooterComponent />
              <BackTopUtil />
            </Layout>
          }
        </>
      </Switch>
    </div>

  );
}

export default withRouter(App);
