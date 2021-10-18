import React from 'react';
import './App.css';
import { Switch, Route, withRouter, useLocation } from 'react-router-dom';
import { Layout } from 'antd';
import LandingPage from './components/views/LandingPage/LandingPage';
import LoginPage from './components/views/LoginPage/LoginPage';
import RegisterPage from './components/views/RegisterPage/RegisterPage';
import EnginePage from './components/views/EnginePage/EnginePage';
import BackTopUtil from './components/utils/BackTopUtil/BackTopUtil';
import Navbar from './components/views/NavBar/NavBar';
import FooterComponent from './components/views/Footer/FooterComponent';
import UserPage from './components/views/UserPage/UserPage';
import SideBar from './components/views/SideBar/SideBar';
import UsersAuth from './components/views/UsersAuthPage/UsersAuthPage';
import PredictResultPage from './components/views/PredictResultPage/PredictResultPage';
import NotFound from './components/views/NotFound/NotFound';
import PredictPage from './components/views/PredictPage/EngineerPredictPage';
import Auth from './hoc/auth';

// const { Header, Content, Footer, Sider } = Layout;
const { Content } = Layout;

function App() {
  const location = useLocation();

  return (
    <div>
      <Switch>
        <>
          <Route path="/login" component={Auth(LoginPage, false)} />
          <Route path="/register" component={Auth(RegisterPage, false)} />
          {location.pathname !== '/login' && location.pathname !== '/register' && (
            <Layout>
              <Navbar />
              <Layout>
                <SideBar />
                <Layout style={{ padding: '0px 24px 24px', overflow: 'auto' }}>
                  <Content
                    className="site-layout-background"
                    style={{
                      padding: 24,
                      margin: 0,
                      minHeight: 280,
                      width: '100%',
                      height: '100%',
                      // border: '1px solid',
                    }}
                  >
                    <Switch>
                      <Route
                        exact
                        path="/"
                        component={Auth(LandingPage, null)}
                      />
                      <Route
                        path="/engine/1"
                        component={Auth(EnginePage, true)}
                      />
                      <Route path="/user" component={Auth(UserPage, true)} />
                      <Route
                        path="/usersAuth"
                        component={Auth(UsersAuth, true, true)}
                      />
                      <Route
                        path="/predictResult"
                        component={Auth(PredictResultPage, true)}
                      />
                      <Route
                        path="/predict"
                        component={Auth(PredictPage, true)}
                      />
                      <Route component={NotFound} />
                    </Switch>
                  </Content>
                </Layout>
              </Layout>
              <FooterComponent />
              <BackTopUtil />
            </Layout>
          )}
        </>
      </Switch>
    </div>
  );
}

export default withRouter(App);
