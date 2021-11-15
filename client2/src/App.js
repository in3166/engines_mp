import React from 'react';
import './App.css';
import { Switch, Route, withRouter, useLocation } from 'react-router-dom';
// import LandingPage from './components/views/LandingPage/LandingPage';
import EnginePartsPage from './components/views/LifespanMenu/EngineUtilPage/EnginePartsPage';
import LifeCodePage from './components/views/LifespanMenu/LifeCodePage/LifeCodePage';
import PeriodFeedback from './components/views/LifespanMenu/PeriodFeedback/PeriodFeedback';

import SitePartsListPage from './components/views/StocksMenu/SitePartsListPage/SitePartsListPage';
import EnginePartsListPage from './components/views/StocksMenu/EnginePartsListPage/EnginePartsListPage';
import HeadquartersStocksPage from './components/views/StocksMenu/HeadquartersStocksPage/HeadquartersStocksPage';
import BranchStocksPage from './components/views/StocksMenu/BranchStocksPage/BranchStocksPage';
import OrderParts from './components/views/StocksMenu/OrderPage/OrderParts';

import PartMaintenancePeriod from './components/views/MaintenanceMenu/PartMaintenancePeriod/PartMaintenancePeriod';
import PartReplacePeriod from './components/views/MaintenanceMenu/PartReplacePeriod/PartReplacePeriod';
import EngineRepairHistory from './components/views/MaintenanceMenu/EngineRepairHistory/EngineRepairHistory';

import PartList from './components/views/ManualMenu/PartList/PartList';
import EngineList from './components/views/ManualMenu/EngineList/EngineList';
import Manual from './components/views/ManualMenu/ManualPage/Manual';
import ManualUpdateHistory from './components/views/ManualMenu/ManualUpdateHistory/ManualUpdateHistory';
import ManualSearchModule from './components/views/ManualMenu/ManualSearchModule/ManualSearchModule';

import NotFound from './components/views/NotFound/NotFound';
import Auth from './hoc/auth';
import ContentLayout from './components/utils/ContentLayout/ContentLayout';
import CONFIG from './ipconfig.json';

function App() {
  const location = useLocation();
  const redirectUrl = url => {
    window.location.href = `${CONFIG.IP}:13000/${url}`;
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
                <Route
                  exact
                  path="/"
                  render={() => {
                    window.location.href = `${CONFIG.IP}:13001/engineParts`;
                  }}
                />
                {/* component={Auth(LandingPage, null)} /> */}
                <Route
                  path="/engineParts"
                  component={Auth(EnginePartsPage, null)}
                />
                <Route path="/lifeCode" component={Auth(LifeCodePage, null)} />
                <Route
                  path="/periodFeedback"
                  component={Auth(PeriodFeedback, null)}
                />
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
                <Route path="/orderParts" component={Auth(OrderParts, null)} />

                <Route
                  path="/partsMaintenanace"
                  component={Auth(PartMaintenancePeriod, null)}
                />
                <Route
                  path="/partsReplace"
                  component={Auth(PartReplacePeriod, null)}
                />
                <Route
                  path="/engineMaintenance"
                  component={Auth(EngineRepairHistory, null)}
                />

                <Route path="/engineList" component={Auth(EngineList, null)} />
                <Route path="/partList" component={Auth(PartList, null)} />
                <Route path="/manual" component={Auth(Manual, null)} />
                <Route
                  path="/manualUpdateList"
                  component={Auth(ManualUpdateHistory, null)}
                />
                <Route
                  path="/searchModule"
                  component={Auth(ManualSearchModule, null)}
                />

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
