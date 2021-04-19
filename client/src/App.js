
import React from 'react';
import './App.css';
import { BrowserRouter as Router, Switch, Route, Link, withRouter } from 'react-router-dom';
import LandingPage from './components/views/LandingPage/LandingPage';
import LoginPage from './components/views/LoginPage/LoginPage';
import RegisterPage from './components/views/RegisterPage/RegisterPage';
import EnginePage from './components/views/EnginePage/EnginePage';

import Navbar from './components/views/NavBar/NavBar';
//import Footer from './components/views/Footer/Footer';
import SideBar from './components/views/SideBar/SideBar';
import { Layout } from 'antd';
//const { Header, Content, Footer, Sider } = Layout;

function App(props) {

  return (

    <div>
      <Switch>
        <>
          <Route exact path="/login" component={LoginPage} />
          <Route exact path="/register" component={RegisterPage} />
          <Layout>
            {props.location.pathname !== '/login' && props.location.pathname !== '/register' &&
              <Navbar />}
            <Layout>
              {props.location.pathname !== '/login' && props.location.pathname !== '/register' &&
                <SideBar />}
              <Route exact path="/" component={LandingPage} />
              <Route path="/engine/1" component={EnginePage} />

            </Layout>
          </Layout>
        </>
      </Switch>
    </div>

  );
}

export default withRouter(App);
