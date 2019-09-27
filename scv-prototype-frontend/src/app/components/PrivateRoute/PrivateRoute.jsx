import React, { useContext } from 'react';
import { Route } from 'react-router-dom';
import { AuthenticationContext } from '../../context/Authentication';
import Login from '../../views/Login/Login';
import './PrivateRoute.css';

/**
 * Component that will redirect to a login page if
 * a user has not yet authenticated.
 *
 * @author Greg Baker <gregory.j.baker@hrsdc-rhdcc.gc.ca>
 * @since 0.0.0
 */
const PrivateRoute = ({ authorities, ...props }) => {
	const { authenticationContext } = useContext(AuthenticationContext);

	if (!authenticationContext.authenticated) {
		return (<Login />);
	}

	if (authorities) {
		const hasAuthority = authorities.filter((authority) => {
			// this will effectively return the intersection of these two sets
			return (authenticationContext.authorities || []).includes(authority)
		}).length !== 0;

		// TODO :: GjB :: render 403 page
		if (!hasAuthority) { throw new Error('User not allowed access'); }
	}

	return (<Route {...props} />);
};

export default PrivateRoute;
