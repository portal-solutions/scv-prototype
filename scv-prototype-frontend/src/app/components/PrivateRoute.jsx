import React from 'react';
import PropTypes from 'prop-types';
import { Redirect, Route } from 'react-router-dom';
import { intersection } from '../utils/array-utils';
import { useAuth } from '../utils/auth';
import Error403 from './error/Error403';

/**
 * Component that will redirect to a login page if
 * a user has not yet authenticated.
 *
 * @author Greg Baker <gregory.j.baker@hrsdc-rhdcc.gc.ca>
 * @since 0.0.0
 */
const PrivateRoute = ({ component: Component, authorities: requiredAuthorities, ...rest }) => {
  const { auth } = useAuth();

  if (
    auth.authenticated &&
    !auth.tokenExpired &&
    requiredAuthorities.length &&
    intersection(requiredAuthorities)(auth.authorities).length === 0
  ) {
    return <Error403 />;
  }

  return (
    <Route
      {...rest}
      render={(props) => {
        if (auth.authenticated && !auth.tokenExpired) {
          // user logged in then check if he agreed to the terms and conditions
          // or user didn't agreed and it's terms and conditions component
          if (auth.agreedTermsAndConditions || props.location.pathname === '/private/terms-and-conditions') {
            return <Component {...props} />;
          }

          // redirect to terms and conditions
          return <Redirect to={{ pathname: '/private/terms-and-conditions', state: { from: props.location } }} />;
        }

        // redirect to sign-in
        return <Redirect to={{ pathname: '/msca', state: { from: props.location } }} />;
      }}
    />
  );
};

PrivateRoute.defaultProps = {
  authorities: []
};

PrivateRoute.propTypes = {
  authorities: PropTypes.arrayOf(PropTypes.string)
};

export default PrivateRoute;
