import React from 'react';
import './App.css';
import { Switch, Route, withRouter, useLocation } from 'react-router-dom';
import LandingPage from './components/views/LandingPage/LandingPage';
import UsersAuth from './components/views/UserManage/UsersAuthPage/UsersAuthPage';
import AddExpertPage from './components/views/ExpertManage/AddExpertPage/AddExpertPage';
import NotFound from './components/views/NotFound/NotFound';
import PositionManagePage from './components/views/UserManage/PositionMangePage/PositionManagePage';
import DepartmentManagePage from './components/views/UserManage/DepartmentManagePage/DepartmentManagePage';
import SiteManagePage from './components/views/SiteManage/SiteMangePage/SiteManagePage';
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
                  path="/addExpert"
                  component={Auth(AddExpertPage, true)}
                />
                <Route
                  path="/managePosition"
                  component={Auth(PositionManagePage, true)}
                />
                <Route
                  path="/manageDepartment"
                  component={Auth(DepartmentManagePage, true)}
                />
                <Route path="/user" render={() => redirectUrl('user')} />
                {/* <Route path="/user" component={Auth(UserPage, true)} /> */}
                <Route
                  path="/usersAuth"
                  component={Auth(UsersAuth, true, true)}
                />
                <Route
                  path="/siteManagePage"
                  component={Auth(SiteManagePage, true, true)}
                />
                <Route component={NotFound} />
              </Switch>
            </ContentLayout>
          )}
        </>
      </Switch>
    </div>
  );
}

export default withRouter(App);
