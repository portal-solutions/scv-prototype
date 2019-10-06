import { useState } from 'react';
import config from '../../config';
import { useAuthContext } from './auth';

/**
 * A custom error class intended to be thrown on authentication errors.
 */
class InvalidTokenError extends Error {
  constructor(message) {
    super(message);
    this.name = 'InvalidTokenError';
  }
}

/**
 * A custom hook that can keep track of authentication state
 * internally so that callers only need to make calls to
 * the functions exposed by this hook.
 */
const useApi = () => {
  const [data, setData] = useState();
  const [error, setError] = useState();
  const [loading, setLoading] = useState();

  const { authContext, setAuthContext } = useAuthContext();

  /**
   * Perform a login by POSTing a username and password to the API.
   */
  const login = async (username, password) => {
    setData(null);
    setError(null);
    setLoading(true);

    try {
      const response = await fetch(`${config.api.baseUrl}/auth`, {
        method: 'POST',
        mode: 'cors',
        cache: 'no-cache',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password })
      });

      if (!response.ok) {
        throw new Error(`Error while authenticating; status=${response.status}`);
      }

      const json = await response.json();

      setAuthContext({
        authenticated: true,
        authorities: ['USER'],
        authToken: json.accessToken,
        tokenExpired: false,
        uid: json.uid,
        username
      });

      setData(json);
    } catch (err) {
      setError(err);
    } finally {
      setLoading(false);
    }
  };

  /**
   * Fetch some greetings.
   * TODO :: GjB :: remove this eventually
   */
  const fetchGreetings = async () => {
    setData(null);
    setError(null);
    setLoading(true);

    const { authToken } = authContext;

    try {
      const response = await fetch(`${config.api.baseUrl}/api/greetings`, {
        method: 'GET',
        mode: 'cors',
        cache: 'no-cache',
        headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${authToken}` }
      });

      if (!response.ok) {
        if (response.status === 401) {
          throw new InvalidTokenError('Invalid token or token has expired');
        } else {
          throw new Error(`Error fetching greetings; response status: ${response.status}`);
        }
      }

      setData(await response.json());
    } catch (err) {
      setAuthContext({ tokenExpired: true });
      setError(err);
    } finally {
      setLoading(false);
    }
  };

  /**
   * Fetch a user's payment history information.
   */
  const fetchPaymentHistory = async () => {
    setData(null);
    setError(null);
    setLoading(true);

    const { authToken, uid } = authContext;

    try {
      const response = await fetch(`${config.api.baseUrl}/api/profiles/${uid}/payment-history`, {
        method: 'GET',
        mode: 'cors',
        cache: 'no-cache',
        headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${authToken}` }
      });

      if (!response.ok) {
        if (response.status === 401) {
          throw new InvalidTokenError('Invalid token or token has expired');
        } else {
          throw new Error(`Error fetching profile; response status: ${response.status}`);
        }
      }

      setData(await response.json());
    } catch (err) {
      setAuthContext({ tokenExpired: true });
      setError(err);
    } finally {
      setLoading(false);
    }
  };

  /**
   * Fetch a user's payment details information.
   */
  const fetchPaymentDetails = async () => {
    setData(null);
    setError(null);
    setLoading(true);

    const { authToken, uid } = authContext;

    try {
      const response = await fetch(`${config.api.baseUrl}/api/profiles/${uid}/payment-details`, {
        method: 'GET',
        mode: 'cors',
        cache: 'no-cache',
        headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${authToken}` }
      });

      if (!response.ok) {
        if (response.status === 401) {
          throw new InvalidTokenError('Invalid token or token has expired');
        } else {
          throw new Error(`Error fetching profile; response status: ${response.status}`);
        }
      }

      setData(await response.json());
    } catch (err) {
      setAuthContext({ tokenExpired: true });
      setError(err);
    } finally {
      setLoading(false);
    }
  };

  /**
   * Fetch the user profile data.
   */
  const fetchProfile = async () => {
    setData(null);
    setError(null);
    setLoading(true);

    const { authToken, uid } = authContext;

    try {
      const response = await fetch(`${config.api.baseUrl}/api/profiles/${uid}`, {
        method: 'GET',
        mode: 'cors',
        cache: 'no-cache',
        headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${authToken}` }
      });

      if (!response.ok) {
        if (response.status === 401) {
          throw new InvalidTokenError('Invalid token or token has expired');
        } else {
          throw new Error(`Error fetching profile; response status: ${response.status}`);
        }
      }

      setData(await response.json());
    } catch (err) {
      setAuthContext({ tokenExpired: true });
      setError(err);
    } finally {
      setLoading(false);
    }
  };

  return {
    // status fields
    data,
    error,
    loading,

    // API methods
    fetchGreetings,
    fetchPaymentDetails,
    fetchPaymentHistory,
    fetchProfile,
    login
  };
};

export { InvalidTokenError, useApi };
