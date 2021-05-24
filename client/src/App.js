import React from 'react';
import './App.css';
import { Switch, Route, withRouter, useLocation } from 'react-router-dom';
import { Layout } from 'antd';
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
import UsersAuth from './components/views/UsersAuthPage/UsersAuthPage';
import PredictResultPage from './components/views/PredictResultPage/PredictResultPage';
import NotFound from './components/views/NotFound/NotFound';
import Auth from './hoc/auth';
// const { Header, Content, Footer, Sider } = Layout;

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
                <Switch>
                  <Route exact path="/" component={Auth(LandingPage, null)} />
                  <Route path="/engine/1" component={Auth(EnginePage, true)} />
                  <Route
                    path="/unitlist"
                    component={Auth(UnitListPage, true)}
                  />
                  <Route
                    path="/addExpert"
                    component={Auth(AddExpertPage, true, true)}
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
                  <Route component={NotFound} />
                </Switch>
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
