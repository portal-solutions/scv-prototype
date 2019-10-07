import config from '../../../config';

const fetchGreetings = ({ authToken, setData, setError, setLoading, setAuthContext }) => {
  return async () => {
    setData(null);
    setError(null);
    setLoading(true);

    const url = `${config.api.baseUrl}/api/greetings`;

    try {
      const response = await fetch(url, {
        cache: 'no-cache',
        headers: { Authorization: `Bearer ${authToken}`, 'Content-Type': 'application/json' },
        method: 'GET',
        mode: 'cors'
      });

      if (!response.ok) {
        throw new Error(`Error on GET to ${url}; status=${response.status}`);
      }

      setData(await response.json());
    } catch (err) {
      setAuthContext({ tokenExpired: true });
      setError(err);
    } finally {
      setLoading(false);
    }
  };
};

export default fetchGreetings;
