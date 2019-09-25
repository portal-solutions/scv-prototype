import React from 'react';
import { Route } from 'react-router-dom';
import { AuthContext } from '../../context/AuthContext';
import Login from '../Login/Login';
import './PrivateRoute.css';

/**
 * Component that will redirect to a login page if
 * a user has not yet authenticated.
 *
 * @author Greg Baker <gregory.j.baker@hrsdc-rhdcc.gc.ca>
 * @since 0.0.0
 */
const PrivateRoute = ({ component: Component, ...rest }) => {
	const authContext = React.useContext(AuthContext);

	// TODO :: GjB :: add authorities check (redirect to 403 page if user does not have authority/role)

	if (authContext.authenticated !== true) {
		return (<Login />);
	}

	return (<Route render={(props) => (<Component {...props} />)} />);
};

export default PrivateRoute;
