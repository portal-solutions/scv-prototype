import React from 'react';
import AuthContext from './AuthContext';

/**
 * React component to provide the authentication context to child elements.
 *
 * @author Greg Baker <gregory.j.baker@hrsdc-rhdcc.gc.ca>
 * @since 0.0.0
 */
const AuthProvider = (props) => {
	const [ authenticated, setAuthenticated ] = React.useState(props.value.authenticated);
	const [ authorities, setAuthorities ] = React.useState(props.value.authorities);
	const [ authToken, setAuthToken ] = React.useState(props.value.authToken);
	const [ username, setUsername ] = React.useState(props.value.username);

	const authContext = {
		// XXX :: GjB :: is this a good way to get these values in localstorage?
		authenticated, setAuthenticated: (authenticated) => { localStorage.setItem('authenticated', JSON.stringify(authenticated)); setAuthenticated(authenticated); },
		authorities, setAuthorities: (authorities) => { localStorage.setItem('authorities', JSON.stringify(authorities)); setAuthorities(authorities); },
		authToken, setAuthToken: (authToken) => { localStorage.setItem('authToken', authToken); setAuthToken(authToken); },
		username, setUsername: (username) => { localStorage.setItem('username', username); setUsername(username); }
	};

	return (
		<AuthContext.Provider value={authContext}>{ props.children }</AuthContext.Provider>
	);
};

export default AuthProvider;
