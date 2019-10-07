import config from '../../../config';
import { InvalidTokenError } from './errors';

const fetchPaymentHistory = ({ authToken, uid, setData, setError, setLoading, setAuthContext }) => {
  return async () => {
    setData(null);
    setError(null);
    setLoading(true);

    const url = `${config.api.baseUrl}/api/profiles/${uid}/payment-history`;

    try {
      const response = await fetch(url, {
        cache: 'no-cache',
        headers: { Authorization: `Bearer ${authToken}`, 'Content-Type': 'application/json' },
        method: 'GET',
        mode: 'cors'
      });

      if (!response.ok) {
        if (response.status === 401) {
          throw new InvalidTokenError('Invalid token or token has expired');
        } else {
          throw new Error(`Error on GET to ${url}; status=${response.status}`);
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
};

export default fetchPaymentHistory;
