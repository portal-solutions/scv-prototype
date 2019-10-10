import { createBrowserHistory } from 'history';
import React from 'react';
import { BrowserRouter as Router, Redirect, Route, Switch } from 'react-router-dom';
import './App.scss';
import Error404 from './components/error/Error404';
import PrivateRoute from './components/PrivateRoute';
import MainLayout from './layout/Main';
import { AuthProvider } from './utils/auth';
import { PageMetadataProvider } from './utils/page-metadata';
import Login from './views/Login/Login';
import Private from './views/Private';

/**
 * Application entrypoint.
 *
 * @author Greg Baker <gregory.j.baker@hrsdc-rhdcc.gc.ca>
 * @since 0.0.0
 */
const App = () => {
  const history = createBrowserHistory();

  return (
    <AuthProvider>
      <PageMetadataProvider>
        <Router history={history}>
          <MainLayout>
            <Switch>
              <Route path="/" component={Login} exact>
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
  );
};

export default App;
