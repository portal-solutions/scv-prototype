/* eslint-disable react/jsx-props-no-spreading */
import React, { createContext, useContext } from 'react';
import { useTranslation } from 'react-i18next';
import { useAuth } from '../auth';
import * as apiService from './ApiService';
import InvalidTokenError from '../errors/InvalidTokenError';
import AuthenticationRequiredError from '../errors/AuthenticationRequiredError';
import AddPersonLocationValidationError from '../errors/AddPersonLocationValidationError';

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
  const { t } = useTranslation();
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

  const searchLocations = async (query) => {
    return apiService.searchLocations(query);
  };

  /**
   * Add person's location from the backend API.
   */
  const addPersonLocation = async (locationId, programIds) => {
    validateAuthentication('addPersonLocation');

    // validation
    const addPersonLocationValidationError = new AddPersonLocationValidationError(t('error.validation-error'));

    // validate location id
    if (locationId === undefined || locationId === null || locationId.length === 0) {
      addPersonLocationValidationError.locationMessage = t(
        'error.add-person-location-validation-error.location-required'
      );
    }

    // validate program ids
    if (programIds === undefined || programIds === null || programIds.length === 0) {
      addPersonLocationValidationError.programsMessage = t(
        'error.add-person-location-validation-error.programs-required'
      );
    }

    if (addPersonLocationValidationError.hasError()) throw addPersonLocationValidationError;

    // call the api service
    apiService.addPersonLocation(auth.sin, locationId, programIds);
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
        fetchPersonLocations,
        searchLocations,
        addPersonLocation
      }}
      {...props}
    />
  );
};

export default ApiProvider;
export { useApi };
