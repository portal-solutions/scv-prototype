import PropTypes from 'prop-types';
import React, { createContext, useEffect, useReducer } from 'react';

/**
 * React context to hold all of the authentication data.
 */
const AuthContext = createContext();

/**
 * The default AuthContext state, used when no
 * local state has been found.
 */
const initialState = {
	authenticated: false,
	authorities: [],
	authToken: null,
	tokenExpired: null,
	uid: null,
	username: 'Anonymous'
};

/**
 * Existing authentication context from localstorage.
 */
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
 * The context provider.
 */
const AuthProvider = ({ children }) => {
	const [authContext, setAuthContext] = useReducer(reducer, localState || initialState);
	useEffect(() => localStorage.setItem('authContext', JSON.stringify(authContext), [JSON.stringify(authContext)]));
	return <AuthContext.Provider value={{ authContext, setAuthContext }}>{children}</AuthContext.Provider>;
};

AuthProvider.propTypes = {
	children: PropTypes.node.isRequired
};

export { AuthContext, AuthProvider };
