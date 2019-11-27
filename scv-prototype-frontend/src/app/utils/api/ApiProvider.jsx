/* eslint-disable react/jsx-props-no-spreading */
import React, { createContext, useContext } from 'react';
import { useAuth } from '../auth';
import * as apiService from './ApiService';
import InvalidTokenError from '../errors/InvalidTokenError';
import AuthenticationRequiredError from '../errors/AuthenticationRequiredError';

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

  const validateAuthentication = (fnName) => {
    if (!auth.authenticated || auth.tokenExpired) {
      throw new AuthenticationRequiredError(`User must be authenticated. [ApiProvider.${fnName}]`);
    }
  };

  const fetchGreetings = async () => {
    try {
      return await apiService.fetchGreetings(auth.authToken, auth.uid);
    } catch (err) {
      if (err instanceof InvalidTokenError) {
        logout(true);
      }
      throw err;
    }
  };

  const fetchPaymentDetails = async () => {
    try {
      return await apiService.fetchPaymentDetails(auth.authToken, auth.uid);
    } catch (err) {
      if (err instanceof InvalidTokenError) {
        logout(true);
      }
      throw err;
    }
  };

  const fetchPaymentHistory = async () => {
    try {
      return await apiService.fetchPaymentHistory(auth.authToken, auth.uid);
    } catch (err) {
      if (err instanceof InvalidTokenError) {
        logout(true);
      }
      throw err;
    }
  };

  const fetchProfile = async () => {
    try {
      return await apiService.fetchProfile(auth.authToken, auth.uid);
    } catch (err) {
      if (err instanceof InvalidTokenError) {
        logout(true);
      }
      throw err;
    }
  };

  const fetchPerson = async () => {
    validateAuthentication('fetchPerson');
    return apiService.fetchPerson(auth.sin);
  };

  const fetchPersonPrograms = async () => {
    validateAuthentication('fetchPersonPrograms');
    return apiService.fetchPersonPrograms(auth.sin);
  };

  const fetchPersonLocations = async () => {
    validateAuthentication('fetchPersonLocations');
    return apiService.fetchPersonLocations(auth.sin);
  };

  return (
    <ApiContext.Provider
      value={{
        fetchGreetings,
        fetchPaymentDetails,
        fetchPaymentHistory,
        fetchProfile,
        fetchPerson,
        fetchPersonPrograms,
        fetchPersonLocations
      }}
      {...props}
    />
  );
};

export default ApiProvider;
export { useApi };
