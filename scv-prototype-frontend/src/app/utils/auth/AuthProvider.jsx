/* eslint-disable react/jsx-props-no-spreading */

import React, { createContext, useContext, useState } from 'react';
import * as authService from './AuthService';

/**
 * Auth context; used to store auth stuff.
 */
const AuthContext = createContext();

/**
 * Convenience function to use the auth context.
 */
const useAuth = () => useContext(AuthContext);

/**
 * React component that will expose auth stuff to children.
 * Stuff includes the auth info, as well as methods such as 'login' and 'logout'.
 */
const AuthProvider = (props) => {
  const initialState = { authenticated: false };
  const storedState = JSON.parse(localStorage.getItem('auth'));

  const [state, setState] = useState(storedState || initialState);

  const login = async (username, password) => {
    const user = await authService.authenticate(username, password);

    if (user) {
      const auth = { authenticated: true, ...user };
      localStorage.setItem('auth', JSON.stringify(auth));
      setState(auth);
      return auth;
    }

    return null;
  };

  // TODO :: GjB :: this should be its own function (preferrably a reducer)
  const logout = async (tokenExpired) => {
    localStorage.removeItem('auth');
    setState({ ...initialState, tokenExpired });
  };

  return <AuthContext.Provider value={{ auth: state, login, logout }} {...props} />;
};

export default AuthProvider;
export { useAuth };
