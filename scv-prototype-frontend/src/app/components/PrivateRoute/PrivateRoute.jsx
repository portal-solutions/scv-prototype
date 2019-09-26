import React, { useContext } from 'react';
import { Route } from 'react-router-dom';
import { AuthContext } from '../../context/AuthContext';
import Login from '../../views/Login/Login';
import './PrivateRoute.css';

/**
 * Component that will redirect to a login page if
 * a user has not yet authenticated.
 *
 * @author Greg Baker <gregory.j.baker@hrsdc-rhdcc.gc.ca>
 * @since 0.0.0
 */
const PrivateRoute = ({ component: Component, ...rest }) => {
	const { authContext } = useContext(AuthContext);

	if (authContext.authenticated !== true) {
		return (<Login />);
	}

	if (rest.authorities) {
		const hasAuthority = rest.authorities.filter((element) => (authContext.authorities || []).includes(element)).length !== 0;
		// TODO :: GjB :: render 403 page
		if (hasAuthority === false) { throw new Error('User not allowed access'); }
	}

	return (<Route render={(props) => (<Component {...props} />)} />);
};

export default PrivateRoute;
