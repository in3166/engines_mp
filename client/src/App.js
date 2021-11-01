import React from 'react';
import './App.css';
import { Switch, Route, withRouter, useLocation } from 'react-router-dom';
import LandingPage from './components/views/LandingPage/LandingPage';
import LoginPage from './components/views/LoginPage/LoginPage';
import RegisterPage from './components/views/RegisterPage/RegisterPage';
import EnginePage from './components/views/EnginePage/EnginePage';
import UserPage from './components/views/UserPage/UserPage';
import PredictResultPage from './components/views/PredictResultPage/PredictResultPage';
import NotFound from './components/views/NotFound/NotFound';
import PredictPage from './components/views/PredictPage/EngineerPredictPage';
import Auth from './hoc/auth';
import ContentLayout from './components/utils/ContentLayout/ContentLayout';

function App() {
  const location = useLocation();

  return (
    <div>
      <Switch>
        <>
          <Route path="/login" component={Auth(LoginPage, false)} />
          <Route path="/register" component={Auth(RegisterPage, false)} />
          {location.pathname !== '/login' && location.pathname !== '/register' && (
            <ContentLayout>
              <Switch>
                <Route exact path="/" component={Auth(LandingPage, null)} />
                <Route path="/engine/1" component={Auth(EnginePage, true)} />
                <Route path="/user" component={Auth(UserPage, true)} />
                <Route
                  path="/predictResult"
                  component={Auth(PredictResultPage, true)}
                />
                <Route path="/predict" component={Auth(PredictPage, true)} />
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
