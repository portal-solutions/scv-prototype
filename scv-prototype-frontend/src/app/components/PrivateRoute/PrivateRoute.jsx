import React from 'react';
import { Route } from 'react-router-dom';
import { useAuthContext } from '../../utils/auth';
import Login from '../../views/Login/Login';
import Error403 from '../error/Error403';

/**
 * Component that will redirect to a login page if
 * a user has not yet authenticated.
 *
 * @author Greg Baker <gregory.j.baker@hrsdc-rhdcc.gc.ca>
 * @since 0.0.0
 */
const PrivateRoute = ({ authorities: requiredAuthorities, ...props }) => {
	const { authContext } = useAuthContext();
	const { authenticated, authorities, tokenExpired } = authContext;

	if (!authenticated || tokenExpired) {
		return <Login />;
	}

	if (requiredAuthorities && intersection(requiredAuthorities)(authorities).length === 0) {
		return <Error403 />;
	}

	return <Route {...props} />;
};

/**
 * Array intersect (curried) function. Finds
 * the intersection of two arrays.
 *
 * TODO :: GjB :: move to utility package?
 */
const intersection = arr1 => arr2 => (arr1 || []).filter(element => (arr2 || []).includes(element));

export default PrivateRoute;
