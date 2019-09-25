import React from 'react';

/**
 * Authenication context representing the currently logged-in user.
 *
 * @author Greg Baker <gregory.j.baker@hrsdc-rhdcc.gc.ca>
 * @since 0.0.0
 */
const AuthContext = React.createContext({
	authenticated: false,
	authorities: [],
	authToken: null,
	username: 'Anonymous'
});

export default AuthContext;
