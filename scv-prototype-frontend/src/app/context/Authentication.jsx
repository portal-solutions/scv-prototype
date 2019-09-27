import React, { createContext, useContext, useEffect, useReducer } from 'react';

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

/**
 * Existing authentication context from localstorage.
 */
const localState = JSON.parse(localStorage.getItem('authenticationContext'));

/**
 * A reducer function that is used to merge
 * new state data with the existing state.
 */
const reducer = (state, newState) => {
	if (newState === null) {
		localStorage.removeItem('authenticationContext');
		return initialState;
	}

	return { ...state, ...newState };
};

/**
 * Create the context.
 */
const AuthenticationContext = createContext();

/**
 * The context provider.
 */
const AuthenticationProvider = (props) => {
	const [ authenticationContext, setAuthenticationContext ] = useReducer(reducer, (localState || initialState));
	useEffect(() => localStorage.setItem('authenticationContext', JSON.stringify(authenticationContext), [ JSON.stringify(authenticationContext) ]));
	return (<AuthenticationContext.Provider value={{authenticationContext, setAuthenticationContext}}>{ props.children }</AuthenticationContext.Provider>);
};

const useAuthenticationContext = (authenticationContext) => {
	const { setAuthenticationContext } = useContext(AuthenticationContext);

	useEffect(() => {
		setAuthenticationContext(authenticationContext);
	// eslint-disable-next-line
	}, [JSON.stringify(authenticationContext)]);
};

export { AuthenticationContext, AuthenticationProvider, useAuthenticationContext };
