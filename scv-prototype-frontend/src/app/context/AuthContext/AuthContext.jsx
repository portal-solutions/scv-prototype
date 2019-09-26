import React from 'react';

/**
 * Authenication context representing the currently logged-in user.
 *
 * @author Greg Baker <gregory.j.baker@hrsdc-rhdcc.gc.ca>
 * @since 0.0.0
 */
const AuthContext = React.createContext({
	authenticated: JSON.parse(localStorage.getItem('authenticated')) || false,
	authorities: JSON.parse(localStorage.getItem('authorities')) || [],
	authToken: localStorage.getItem('authToken') || null,
	username: localStorage.getItem('username') || 'Anonymous'
});

export default AuthContext;
