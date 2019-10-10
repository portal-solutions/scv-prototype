/* eslint-disable react/jsx-props-no-spreading */

import React, { createContext, useContext } from 'react';
import { useAuth } from '../auth';
import * as apiService from './ApiService';

/**
 * Auth context; used to store API stuff.
 */
const ApiContext = createContext();

/**
 * Convenience function to use the API context.
 */
const useApi = () => useContext(ApiContext);

/**
 * React component that will expose API stuff to children.
 */
const ApiProvider = (props) => {
  const { auth, logout } = useAuth();

  const fetchGreetings = async () => {
    try {
      return await apiService.fetchGreetings(auth.authToken, auth.uid);
    } catch (err) {
      if (err.name === 'InvalidTokenError') {
        logout(true);
      }
      throw err;
    }
  };

  const fetchProfile = async () => {
    try {
      return await apiService.fetchProfile(auth.authToken, auth.uid);
    } catch (err) {
      if (err.name === 'InvalidTokenError') {
        logout(true);
      }
      throw err;
    }
  };

  return <ApiContext.Provider value={{ fetchGreetings, fetchProfile }} {...props} />;
};

export default ApiProvider;
export { useApi };
