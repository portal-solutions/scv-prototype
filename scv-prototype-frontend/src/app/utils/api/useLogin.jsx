import { useState } from 'react';
import config from '../../../config';
import { useAuthContext } from '../auth';

const BASE_URL = `${config.api.baseUrl}/auth`;

/**
 * A hook to log a user in.
 *
 * This hook will return a tuple containing the following members:
 *
 * `login`: an async function that will perform the login when called
 * `loading`: a boolean indicating that the async method, `login`, is currently running
 * `data`: the data that has been fetched during login
 * `error`: any error that was caught during login
 */
const useLogin = () => {
  const [data, setData] = useState();
  const [error, setError] = useState();
  const [loading, setLoading] = useState();
  const { setAuthContext } = useAuthContext();

  const login = async ({ username, password }) => {
    setData(null);
    setError(null);
    setLoading(true);

    try {
      const response = await fetch(BASE_URL, {
        body: JSON.stringify({ username, password }),
        cache: 'no-cache',
        headers: { 'Content-Type': 'application/json' },
        method: 'POST',
        mode: 'cors'
      });

      if (!response.ok) {
        throw new Error(`Error on POST to ${BASE_URL}; status=${response.status}`);
      }

      const json = await response.json();

      // TODO :: GjB :: replace this with a useReducer call
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
      // TODO :: GjB :: replace this with a useReducer call
      setAuthContext(null);
      setError(err);
    } finally {
      setLoading(false);
    }
  };

  return { data, error, loading, login };
};

export default useLogin;
