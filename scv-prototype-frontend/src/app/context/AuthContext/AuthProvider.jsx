import React, { useEffect, useReducer } from 'react';
import AuthContext from './AuthContext';

/**
 * The default AuthContext state, used when no
 * local state has been found.
 */
const initialState = {
	authenticated: false,
	authorities: [],
	authToken: null,
	username: 'Anonymous'
};

const localState = JSON.parse(localStorage.getItem('authContext'));

/**
 * A reducer function that is used to merge
 * new state data with the existing state.
 */
const reducer = (state, newState) => {
	if (newState === null) {
		localStorage.removeItem('authContext');
		return initialState;
	}

	return { ...state, ...newState };
};

/**
 * React component to provide the authentication context to child elements.
 *
 * @author Greg Baker <gregory.j.baker@hrsdc-rhdcc.gc.ca>
 * @since 0.0.0
 */
const AuthProvider = (props) => {
	const [ authContext, setAuthContext ] = useReducer(reducer, (localState || initialState));
	useEffect(() => localStorage.setItem('authContext', JSON.stringify(authContext), [ authContext ]));
	return (<AuthContext.Provider value={{authContext, setAuthContext}}>{ props.children }</AuthContext.Provider>);
};

export default AuthProvider;
