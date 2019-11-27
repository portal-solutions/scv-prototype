/* eslint-disable react/jsx-props-no-spreading */
import React, { createContext, useContext } from 'react';
import { useAuth } from '../auth';
import * as apiService from './ApiService';
import InvalidTokenError from '../errors/InvalidTokenError';

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

  const fetchPerson = async (sin) => {
    return apiService.fetchPerson(sin);
  };

  const fetchPersonPrograms = async (sin) => {
    return apiService.fetchPersonPrograms(sin);
  };

  const fetchPersonLocations = async (sin) => {
    return apiService.fetchPersonLocations(sin);
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
