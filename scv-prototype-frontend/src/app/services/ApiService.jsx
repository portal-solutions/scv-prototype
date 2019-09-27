// TODO :: GjB :: make this configurable
const baseUrl = 'https://scv-prototype-api.azurewebsites.net';

const apiService = {
	/**
	 * Perform a login by POSTing a username and password to the API.
	 */
	login: (username, password) => {
		return fetch(baseUrl + '/auth', {
			method: 'POST', mode: 'cors', cache: 'no-cache',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify({ username, password })
		})
		.then((response) => {
			if (response.ok) { return response; }
			throw new Error('Authentication failed; response status: ' + response.status);
		})
		.then((response) => response.json());
	},

	/**
	 * Fetch some greetings.
	 * TODO :: GjB :: remove this eventually
	 */
	fetchGreetings: (authToken) => {
		return fetch(baseUrl + '/api/greetings', {
			method: 'GET', mode: 'cors', cache: 'no-cache',
			headers: { 'Content-Type': 'application/json', 'Authorization': 'Bearer ' + authToken }
		})
		.then((response) => {
			if (response.ok) { return response; }
			throw new Error('Error fetching greetings; response status: ' + response.status);
		})
		.then((response) => response.json());
	}
};

export default apiService;
