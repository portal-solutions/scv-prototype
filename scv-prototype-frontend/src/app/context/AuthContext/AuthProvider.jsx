import React from 'react';
import AuthContext from './AuthContext';

/**
 * React component to provide the authentication context to child elements.
 *
 * @author Greg Baker <gregory.j.baker@hrsdc-rhdcc.gc.ca>
 * @since 0.0.0
 */
const AuthProvider = (props) => {
	const [ authenticated, setAuthenticated ] = React.useState(props.authenticated);
	const [ authorities, setAuthorities ] = React.useState(props.authorities);
	const [ authToken, setAuthToken ] = React.useState(props.authToken);
	const [ username, setUsername ] = React.useState(props.username);

	const authContext = {
		authenticated, setAuthenticated,
		authorities, setAuthorities,
		authToken, setAuthToken,
		username, setUsername
	};

	return (
		<AuthContext.Provider value={authContext}>{ props.children }</AuthContext.Provider>
	);
};

export default AuthProvider;
