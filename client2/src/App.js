import React from 'react';
import './App.css';
import { Switch, Route, withRouter, useLocation } from 'react-router-dom';
import LandingPage from './components/views/LandingPage/LandingPage';
import EnginePartsPage from './components/views/LifespanMenu/EngineUtilPage/EnginePartsPage';
import LifeCodePage from './components/views/LifespanMenu/LifeCodePage/LifeCodePage';
import SitePartsListPage from './components/views/StocksMenu/SitePartsListPage/SitePartsListPage';
import EnginePartsListPage from './components/views/StocksMenu/EnginePartsListPage/EnginePartsListPage';
import HeadquartersStocksPage from './components/views/StocksMenu/HeadquartersStocksPage/HeadquartersStocksPage';
import BranchStocksPage from './components/views/StocksMenu/BranchStocksPage/BranchStocksPage';
import NotFound from './components/views/NotFound/NotFound';
import PartList from './components/views/ManualMenu/PartList/PartList';
import EngineList from './components/views/ManualMenu/EngineList/EngineList';
import Auth from './hoc/auth';
import CONFIG from './ipconfig.json';
import ContentLayout from './components/utils/ContentLayout/ContentLayout';

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
            <ContentLayout>
              <Switch>
                <Route exact path="/" component={Auth(LandingPage, null)} />
                <Route
                  path="/engineParts"
                  component={Auth(EnginePartsPage, null)}
                />
                <Route path="/lifeCode" component={Auth(LifeCodePage, null)} />
                <Route
                  path="/enginePartsList"
                  component={Auth(EnginePartsListPage, null)}
                />
                <Route
                  path="/sitePartsList"
                  component={Auth(SitePartsListPage, null)}
                />
                <Route
                  path="/headquartersStocks"
                  component={Auth(HeadquartersStocksPage, null)}
                />
                <Route
                  path="/branchStocks"
                  component={Auth(BranchStocksPage, null)}
                />
                <Route path="/engineList" component={Auth(EngineList, null)} />
                <Route path="/partList" component={Auth(PartList, null)} />
                <Route path="/user" render={() => redirectUrl('user')} />
                <Route component={NotFound} />
              </Switch>
              {/* <Route path="/user" component={Auth(UserPage, true)} /> */}
            </ContentLayout>
          )}
        </>
      </Switch>
    </div>
  );
}

export default withRouter(App);
