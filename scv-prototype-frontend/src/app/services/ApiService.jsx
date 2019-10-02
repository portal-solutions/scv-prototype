import config from '../../config';

const { baseUrl } = config.api;

/**
 * A one-stop shop for all things API related.
 */
const apiService = {

	/**
	 * Perform a login by POSTing a username and password to the API.
	 */
	login: async (username, password) => {
		const response = await fetch(`${baseUrl}/auth`, {
			method: 'POST', mode: 'cors', cache: 'no-cache',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify({ username, password })
		})

		if (!response.ok) {
			throw new Error('Error acquiring JWT token; response status: ' + response.status);
		}

		return await response.json();
	},

	/**
	 * Fetch some greetings.
	 * TODO :: GjB :: remove this eventually
	 */
	fetchGreetings: async (authToken) => {
		const response = await fetch(`${baseUrl}/api/greetings`, {
			method: 'GET', mode: 'cors', cache: 'no-cache',
			headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${authToken}` }
		});

		if (response.status === 401) {
			throw new InvalidTokenError('Invalid token or token has expired');
		}

		if (!response.ok) {
			throw new Error('Error fetching greetings; response status: ' + response.status);
		}

		return await response.json();
	},

	/**
	 * Fetch user profile.
	 */
	fetchProfile: async (authToken, id) => {
		const response = await fetch(`${baseUrl}/api/profiles/${id}`, {
			method: 'GET', mode: 'cors', cache: 'no-cache',
			headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${authToken}` }
		});

		if (!response.ok) {
			throw new Error('Error fetching profile; response status: ' + response.status);
		}

		return await response.json();
	}
};

/**
 * A custom error class intended to be thrown on authentication errors.
 */
class InvalidTokenError extends Error {

	constructor(message) {
		super(message);
		this.name='InvalidTokenError';
	}

};

export default apiService;
export { InvalidTokenError };
