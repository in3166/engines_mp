import React from 'react';
import './App.css';
import { Switch, Route, withRouter, useLocation } from 'react-router-dom';
import LandingPage from './components/views/LandingPage/LandingPage';
import LoginPage from './components/views/LoginPage/LoginPage';
import RegisterPage from './components/views/RegisterPage/RegisterPage';
import EnginePage from './components/views/SitesEngines/EnginePage';
import UserPage from './components/views/UserPage/UserPage';
import MachinePredictPage from './components/views/PredictResultPage/MachinePredictPage/MachinePredictPage';
import EngineerPredictPage from './components/views/PredictResultPage/EngineerPredictPage/EngineerPredictPage';
import ExpertPredictPage from './components/views/PredictResultPage/ExpertPredictPage/ExpertPredictPage';
import SynthesisPredictPage from './components/views/PredictResultPage/SynthesisPredictPage/SynthesisPredictPage';
import NotFound from './components/views/NotFound/NotFound';
import Auth from './hoc/auth';
import ContentLayout from './components/utils/ContentLayout/ContentLayout';

function App() {
  const location = useLocation();

  return (
    <div>
      <Switch>
        <>
          <Route path="/login" component={Auth(LoginPage, null)} />
          <Route path="/register" component={Auth(RegisterPage, null)} />
          {location.pathname !== '/login' && location.pathname !== '/register' && (
            <ContentLayout>
              <Switch>
                <Route exact path="/" component={Auth(LandingPage, null)} />
                {/* <Route path="/engine/1" component={Auth(EnginePage, null)} /> */}
                <Route path="/site/:id" component={Auth(EnginePage, null)} />

                <Route path="/user" component={Auth(UserPage, null)} />
                <Route
                  path="/machinePredict"
                  component={Auth(MachinePredictPage, null)}
                />
                <Route
                  path="/engineerPredict"
                  component={Auth(EngineerPredictPage, null)}
                />
                <Route
                  path="/expertPredict"
                  component={Auth(ExpertPredictPage, null)}
                />
                <Route
                  path="/synthesisPredict"
                  component={Auth(SynthesisPredictPage, null)}
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
