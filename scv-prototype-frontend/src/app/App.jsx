import { createBrowserHistory } from 'history';
import React from 'react';
import { BrowserRouter as Router, Redirect, Route, Switch } from 'react-router-dom';
import { Provider as AlertProvider } from 'react-alert';
import AlertTemplate from './components/AlertTemplate';
import { AuthProvider } from './utils/auth';
import { PageMetadataProvider } from './utils/page-metadata';
import PrivateRoute from './components/PrivateRoute';
import MainLayout from './layout/Main';
import Login from './views/Login/Login';
import Private from './views/Private';
import Error404 from './components/error/Error404';
import './App.scss';

// alert optional cofiguration
const alertOptions = {
  position: 'bottom right',
  timeout: 5000,
  offset: '30px',
  transition: 'fade'
};

/**
 * Application entrypoint.
 *
 * @author Greg Baker <gregory.j.baker@hrsdc-rhdcc.gc.ca>
 * @since 0.0.0
 */
const App = () => {
  const history = createBrowserHistory();

  return (
    // eslint-disable-next-line react/jsx-props-no-spreading
    <AlertProvider template={AlertTemplate} {...alertOptions}>
      <AuthProvider>
        <PageMetadataProvider>
          <Router history={history}>
            <MainLayout>
              <Switch>
                <Route path="/" exact>
                  <Redirect to="/private" />
                </Route>
                <Route path="/sign-in" component={Login} exact />
                <PrivateRoute path="/private" component={Private} />
                <Route path="*" component={Error404} />
              </Switch>
            </MainLayout>
          </Router>
        </PageMetadataProvider>
      </AuthProvider>
    </AlertProvider>
  );
};

export default App;
