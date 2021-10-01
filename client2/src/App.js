import React from 'react';
import './App.css';
import { Switch, Route, withRouter, useLocation } from 'react-router-dom';
import { Layout } from 'antd';
import LandingPage from './components/views/LandingPage/LandingPage';
import BackTopUtil from './components/utils/BackTopUtil/BackTopUtil';
import Navbar from './components/views/NavBar/NavBar';
import FooterComponent from './components/views/Footer/FooterComponent';
import EnginePartsPage from './components/views/LifespanMenu/EngineUtilPage/EnginePartsPage';
// import UserPage from './components/views/UserPage/UserPage';
import SideBar from './components/views/SideBar/SideBar';
import LifeCodePage from './components/views/LifespanMenu/LifeCodePage/LifeCodePage';
import SitePartsListPage from './components/views/StocksMenu/SitePartsListPage/SitePartsListPage';
import EnginePartsListPage from './components/views/StocksMenu/EnginePartsListPage/EnginePartsListPage';
import HeadquartersStocksPage from './components/views/StocksMenu/HeadquartersStocksPage/HeadquartersStocksPage';
import BranchStocksPage from './components/views/StocksMenu/BranchStocksPage/BranchStocksPage';
import NotFound from './components/views/NotFound/NotFound';
import Auth from './hoc/auth';
// const { Header, Content, Footer, Sider } = Layout;

function App() {
  const location = useLocation();
  const redirectUrl = url => {
    window.location.href = `http://localhost:3000/${url}`;
    // maybe can add spinner while loading
    return null;
  };

  return (
    <div>
      <Switch>
        <>
          <Route path="/login" render={() => redirectUrl('login')} />
          <Route path="/register" render={() => redirectUrl('register')} />
          {location.pathname !== '/login' && location.pathname !== '/register' && (
            <Layout>
              <Navbar />
              <Layout>
                <SideBar />
                <Switch>
                  <Route exact path="/" component={Auth(LandingPage, null)} />
                  <Route
                    path="/engineParts"
                    component={Auth(EnginePartsPage, true)}
                  />
                  <Route
                    path="/lifeCode"
                    component={Auth(LifeCodePage, true)}
                  />
                  <Route
                    path="/enginePartsList"
                    component={Auth(EnginePartsListPage, true)}
                  />
                  <Route
                    path="/sitePartsList"
                    component={Auth(SitePartsListPage, true)}
                  />
                  <Route
                    path="/headquartersStocks"
                    component={Auth(HeadquartersStocksPage, true)}
                  />
                  <Route
                    path="/branchStocks"
                    component={Auth(BranchStocksPage, true)}
                  />
                  <Route path="/user" render={() => redirectUrl('user')} />
                  {/* <Route path="/user" component={Auth(UserPage, true)} /> */}
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
