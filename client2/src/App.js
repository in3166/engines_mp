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
import PartList from './components/views/ManualMenu/PartList/PartList';
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
                      <Route
                        path="/partList"
                        component={Auth(PartList, true)}
                      />
                      <Route path="/user" render={() => redirectUrl('user')} />
                      <Route component={NotFound} />
                    </Switch>
                    {/* <Route path="/user" component={Auth(UserPage, true)} /> */}
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
