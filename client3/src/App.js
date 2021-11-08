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
import SiteEngine from './components/views/SiteManage/SiteEnginePage/SiteEngine';
import Auth from './hoc/auth';
import CONFIG from './ipconfig.json';
import ContentLayout from './components/utils/ContentLayout/ContentLayout';

function App() {
  const location = useLocation();
  const redirectUrl = url => {
    window.location.href = `${CONFIG.IP}:13000/${url}`;
    // maybe can add spinner while loading
    return null;
  };
  // function onRenderCallback(
  //   id,
  //   phase, // mount | update
  //   actualDuration, // 렌더링 시간
  //   baseDuration, // 전체 서브트리를 렌더링하는데 걸린 시간
  //   startTime, // 렌더링을 시작한 시간
  //   commitTime, // 업데이트요청한 시간
  //   interactions, // trace set
  // ) {
  //   if (phase === 'mount') {
  //     console.log('id: ', id);
  //     console.log('phase: ', phase);
  //     console.log('actualDuration: ', actualDuration);
  //     console.log('baseDuration: ', baseDuration);
  //     console.log('startTime: ', startTime);
  //     console.log('commitTime: ', commitTime);
  //     console.log('interactions: ', interactions);
  //   }
  // }

  return (
    <div>
      <Switch>
        <>
          {/* <Profiler
            id="Render"
            onRender={(
              id,
              phase,
              actualDuration,
              baseDuration,
              startTime,
              commitTime,
            ) => {
              // we can log it to a database or render it out as a chart
              if (phase === 'mount')
                console.log({
                  id,
                  phase,
                  actualDuration,
                  baseDuration,
                  startTime,
                  commitTime,
                });
              performance.mark('initialize_page_change');
            }}
             onRender={() => performance.mark('initialize_page_change')}
          > */}
          <Route path="/login" render={() => redirectUrl('login')} />
          <Route path="/register" render={() => redirectUrl('register')} />
          {location.pathname !== '/login' && location.pathname !== '/register' && (
            <ContentLayout>
              <Switch>
                <Route exact path="/" component={Auth(LandingPage, null)} />
                <Route
                  path="/managePosition"
                  component={Auth(PositionManagePage, null)}
                />
                <Route
                  // render={() => performance.mark('initialize_page_change')}
                  path="/addExpert"
                  component={Auth(AddExpertPage, null)}
                />
                <Route
                  path="/manageDepartment"
                  component={Auth(DepartmentManagePage, null)}
                />
                <Route path="/user" render={() => redirectUrl('user')} />
                {/* <Route path="/user" component={Auth(UserPage, true)} /> */}
                <Route
                  path="/usersAuth"
                  component={Auth(UsersAuth, null)} // true, true
                />
                <Route
                  path="/siteManagePage"
                  component={Auth(SiteManagePage, null)} // true,true
                />
                <Route
                  path="/siteEnginePage"
                  component={Auth(SiteEngine, null)} // true,true
                />
                <Route component={NotFound} />
              </Switch>
            </ContentLayout>
          )}
          {/* </Profiler> */}
        </>
      </Switch>
    </div>
  );
}

export default withRouter(App);
