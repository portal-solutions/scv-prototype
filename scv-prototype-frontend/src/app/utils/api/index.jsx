import { useState } from 'react';
import { useAuth } from '../auth';
import ApiProvider from './ApiProvider';
import { InvalidTokenError } from './errors';
import fetchPaymentDetails from './fetch-payment-details';
import fetchPaymentHistory from './fetch-payment-history';

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
    fetchPaymentDetails: fetchPaymentDetails({ authToken, uid, setData, setError, setLoading, setAuth }),
    fetchPaymentHistory: fetchPaymentHistory({ authToken, uid, setData, setError, setLoading, setAuth })
  };
};

export { ApiProvider };
export { InvalidTokenError, useApi };
