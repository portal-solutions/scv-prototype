import React from 'react';
import { Route, Switch } from 'react-router-dom';
import Greeting from './Greeting/Greeting';
import Home from './Home';
import ServicePreferences from './ServicePreferences';
import Profile from './Profile';

const Private = ({ match }) => {
  return (
    <Switch>
      <Route path={`${match.path}`} component={Home} exact />
      <Route path={`${match.path}/profile`} component={Profile} />
      <Route path={`${match.path}/service-preferences`} component={ServicePreferences} exact />

      {/* TODO :: GjB :: remove this eventually */}
      <Route path={`${match.path}/greeting`} component={Greeting} />
    </Switch>
  );
};

export default Private;
