import config from '../../../config';

/**
 * Returns an async function that can be called to perform an application login.
 * Performs a login by POSTing a username and password to the API.
 */
const login = ({ setData, setError, setLoading, setAuthContext }) => {
  return async (username, password) => {
    setData(null);
    setError(null);
    setLoading(true);

    const url = `${config.api.baseUrl}/auth`;

    try {
      const response = await fetch(url, {
        body: JSON.stringify({ username, password }),
        cache: 'no-cache',
        headers: { 'Content-Type': 'application/json' },
        method: 'POST',
        mode: 'cors'
      });

      if (!response.ok) {
        throw new Error(`Error on POST to ${url}; status=${response.status}`);
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
};

export default login;
