import { useContext, useState } from 'react';
import config from '../../config';
import { AuthenticationContext } from '../context/Authentication';
import { InvalidTokenError } from '../services/ApiService';

/**
 * A custom hook that can keep track of authentication state
 * internally so that callers only need to make calls to
 * the functions exposed by this hook.
 */
const useApi = () => {
	const [data, setData] = useState();
	const [error, setError] = useState();
	const [loading, setLoading] = useState();

	const {authenticationContext, setAuthenticationContext} = useContext(AuthenticationContext);

	/**
	 * Perform a login by POSTing a username and password to the API.
	 */
	const login = async (username, password) => {
		setData(null);
		setError(null)
		setLoading(true);

		try {
			const response = await fetch(`${config.api.baseUrl}/auth`, {
				method: 'POST', mode: 'cors', cache: 'no-cache',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify({ username, password })
			})

			if (!response.ok) {
				throw new Error('Error while authenticating; status=' + response.status);
			}

			const json = await response.json();

			setAuthenticationContext({
				authenticated: true,
				username: username,
				authorities: ['USER'],
				authToken: json.accessToken,
				tokenExpired: false
			});

			setData(json);
		}
		catch(error) {
			setError(error);
		}
		finally {
			setLoading(false);
		}
	};

	/**
	 * Fetch some greetings.
	 * TODO :: GjB :: remove this eventually
	 */
	const fetchGreetings = async () => {
		setData(null);
		setError(null)
		setLoading(true);

		const {authToken} = authenticationContext;

		try {
			const response = await fetch(`${config.api.baseUrl}/api/greetings`, {
				method: 'GET', mode: 'cors', cache: 'no-cache',
				headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${authToken}` }
			});

			if (!response.ok) {
				if (response.status === 401) {
					throw new InvalidTokenError('Invalid token or token has expired');
				}
				else {
					throw new Error('Error fetching greetings; response status: ' + response.status);
				}
			}

			setData(await response.json());
		}
		catch (error) {
			setAuthenticationContext({ tokenExpired: true });
			setError(error);
		}
		finally {
			setLoading(false);
		}
	};

	/**
	 * Fetch the user profile data.
	 */
	const fetchProfile = async (profileId) => {
		setData(null);
		setError(null)
		setLoading(true);

		const {authToken} = authenticationContext;

		try {
			const response = await fetch(`${config.api.baseUrl}/api/profiles/${profileId}`, {
				method: 'GET', mode: 'cors', cache: 'no-cache',
				headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${authToken}` }
			});

			if (!response.ok) {
				if (response.status === 401) {
					throw new InvalidTokenError('Invalid token or token has expired');
				}
				else {
					throw new Error('Error fetching profile; response status: ' + response.status);
				}
			}

			setData(await response.json());
		}
		catch (error) {
			setAuthenticationContext({ tokenExpired: true });
			setError(error);
		}
		finally {
			setLoading(false);
		}
	};

	return {
		// status fields
		data, error, loading,

		// API methods
		fetchGreetings, fetchProfile, login
	};
};

export { useApi };
