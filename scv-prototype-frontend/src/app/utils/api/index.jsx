import { useState } from 'react';
import { useAuth } from '../auth';
import { InvalidTokenError } from './errors';
import fetchGreetings from './fetch-greetings';
import fetchPaymentDetails from './fetch-payment-details';
import fetchPaymentHistory from './fetch-payment-history';
import fetchProfile from './fetch-profile';

/**
 * A custom hook that can keep track of authentication state internally so that
 * callers only need to make calls to the functions exposed by this hook.
 */
const useApi = () => {
  const [data, setData] = useState();
  const [error, setError] = useState();
  const [loading, setLoading] = useState();

  const { auth, setAuth } = useAuth();
  const { authToken, uid } = auth;

  return {
    // status fields
    data,
    error,
    loading,

    // API methods
    fetchGreetings: fetchGreetings({ authToken, uid, setData, setError, setLoading, setAuth }),
    fetchPaymentDetails: fetchPaymentDetails({ authToken, uid, setData, setError, setLoading, setAuth }),
    fetchPaymentHistory: fetchPaymentHistory({ authToken, uid, setData, setError, setLoading, setAuth }),
    fetchProfile: fetchProfile({ authToken, uid, setData, setError, setLoading, setAuth })
  };
};

export { InvalidTokenError, useApi };