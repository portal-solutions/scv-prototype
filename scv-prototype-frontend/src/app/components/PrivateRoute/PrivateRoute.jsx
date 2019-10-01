import React, { useContext } from 'react';
import { Route } from 'react-router-dom';
import { AuthenticationContext } from '../../context/Authentication';
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
	const { authenticationContext } = useContext(AuthenticationContext);
	const { authenticated, authorities } = authenticationContext;

	if (!authenticated) {
		return (<Login />);
	}

	if (requiredAuthorities && intersection(requiredAuthorities)(authorities).length === 0) {
		return (<Error403 />);
	}

	return (<Route {...props} />);
};

/**
 * Array intersect (curried) function. Finds
 * the intersection of two arrays.
 *
 * TODO :: GjB :: move to utility package?
 */
const intersection = (arr1) => (arr2) => (arr1 || []).filter((element) => (arr2 || []).includes(element));

export default PrivateRoute;
