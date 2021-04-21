
import React from 'react';
import './App.css';
import { BrowserRouter as Router, Switch, Route, Link, withRouter } from 'react-router-dom';
import LandingPage from './components/views/LandingPage/LandingPage';
import LoginPage from './components/views/LoginPage/LoginPage';
import RegisterPage from './components/views/RegisterPage/RegisterPage';
import EnginePage from './components/views/EnginePage/EnginePage';
import UnitListPage from './components/views/UnitListPage/UnitListPage';
import BackTopUtil from './components/utils/BackTopUtil/BackTopUtil';
import Navbar from './components/views/NavBar/NavBar';
import FooterComponent from './components/views/Footer/FooterComponent';
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
          {props.location.pathname !== '/login' && props.location.pathname !== '/register' &&
            <Layout>
              <Navbar />
              <Layout>
                <SideBar />
                <Route exact path="/" component={LandingPage} />
                <Route path="/engine/1" component={EnginePage} />
                <Route path="/unitlist" component={UnitListPage} />
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
