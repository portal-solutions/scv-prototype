import React from 'react';
import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom';
import { createBrowserHistory } from 'history';
import { AuthProvider } from './utils/auth';
import { PageMetadataProvider } from './utils/page-metadata';
import PrivateRoute from './components/PrivateRoute';
import MainLayout from './layout/Main';
import Login from './views/Login/Login';
import Private from './views/Private';
import Error404 from './components/error/Error404';

import './App.scss';

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
