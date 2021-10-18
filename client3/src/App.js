import React from 'react';
import './App.css';
import { Switch, Route, withRouter, useLocation } from 'react-router-dom';
import { Layout } from 'antd';
import LandingPage from './components/views/LandingPage/LandingPage';
import BackTopUtil from './components/utils/BackTopUtil/BackTopUtil';
import Navbar from './components/views/NavBar/NavBar';
import FooterComponent from './components/views/Footer/FooterComponent';
// import UserPage from './components/views/UserPage/UserPage';
import SideBar from './components/views/SideBar/SideBar';
import UsersAuth from './components/views/UsersAuthPage/UsersAuthPage';
import AddExpertPage from './components/views/AddExpertPage/AddExpertPage';
import UsersAuth2 from './components/views/UsersAuthPage/UsersAuthPage2';
import NotFound from './components/views/NotFound/NotFound';
import Auth from './hoc/auth';
import CONFIG from '../../ipconfig.json';
// const { Header, Content, Footer, Sider } = Layout;

const { Content } = Layout;
function App() {
  const location = useLocation();
  const redirectUrl = url => {
    window.location.href = `${CONFIG.IP}:3000/${url}`;
    // maybe can add spinner while loading
    return null;
  };

  return (
    <div>
      <Switch>
        <>
          <Route path="/login" render={() => redirectUrl('login')} />
          <Route path="/register" render={() => redirectUrl('register')} />
          <Route
            exact
            path="/userManage"
            component={Auth(UsersAuth2, true, true)}
          />
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
                        path="/addExpert"
                        component={Auth(AddExpertPage, true)}
                      />
                      <Route path="/user" render={() => redirectUrl('user')} />
                      {/* <Route path="/user" component={Auth(UserPage, true)} /> */}
                      <Route
                        path="/usersAuth"
                        component={Auth(UsersAuth, true, true)}
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
