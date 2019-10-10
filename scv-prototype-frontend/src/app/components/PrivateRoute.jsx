import PropTypes from 'prop-types';
import React from 'react';
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
// eslint-disable-next-line react/prop-types
const PrivateRoute = ({ component: Component, authorities: requiredAuthorities, ...rest }) => {
  const { auth } = useAuth();
  const { authenticated, authorities, tokenExpired } = auth;

  if (authenticated && requiredAuthorities.length && intersection(requiredAuthorities)(authorities).length === 0) {
    return <Error403 />;
  }

  return (
    <Route
      // eslint-disable-next-line react/jsx-props-no-spreading
      {...rest}
      render={(props) => {
        if (!authenticated || tokenExpired) {
          // eslint-disable-next-line react/prop-types
          return <Redirect to={{ pathname: '/sign-in', state: { from: props.location } }} />;
        }

        // eslint-disable-next-line react/jsx-props-no-spreading
        return <Component {...props} />;
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
