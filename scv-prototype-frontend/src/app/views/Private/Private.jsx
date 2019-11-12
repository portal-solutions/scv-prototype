import React from 'react';
import PropTypes from 'prop-types';
import { Redirect, Route, Switch } from 'react-router-dom';
import Error404 from '../../components/error/Error404';
import MainLayout from '../../layout/Main';
import Profile from './Profile';
import ServicePreferences from './ServicePreferences';
import Consent from './Consent';
import ServiceActions from './ServiceActions';

const Private = ({ match }) => {
  // The `path` lets us build <Route> paths that are relative to the parent route
  const { path } = match;

  const applyLayout = (Component) => {
    return (
      <MainLayout>
        <Component />
      </MainLayout>
    );
  };

  return (
    <Switch>
      <Route exact path={path}>
        <Redirect to={`${path}/profile`} />
      </Route>
      <Route exact path={`${path}/profile`}>
        {applyLayout(Profile)}
      </Route>
      <Route exact path={`${path}/service-preferences`}>
        {applyLayout(ServicePreferences)}
      </Route>
      <Route exact path={`${path}/consent`}>
        {applyLayout(Consent)}
      </Route>
      <Route exact path={`${path}/service-actions`}>
        {applyLayout(ServiceActions)}
      </Route>
      <Route component={Error404} />
    </Switch>
  );
};

Private.propTypes = {
  match: PropTypes.shape({
    path: PropTypes.string.isRequired
  }).isRequired
};

export default Private;
