/* eslint-disable import/prefer-default-export */

import config from '../../../config';
import BadCredentialsError from './BadCredentialsError';

/**
 * Authenticate a user by POSTing to the REST API.
 */
const authenticate = async (username, password) => {
  const response = await fetch(`${config.api.baseUrl}/auth`, {
    body: JSON.stringify({ username, password }),
    cache: 'no-cache',
    headers: { 'Content-Type': 'application/json' },
    method: 'POST',
    mode: 'cors'
  });

  if (response.status === 401) {
    throw new BadCredentialsError('Invalid username/password combination');
  }

  const data = await response.json();

  return {
    authenticated: true,
    authorities: ['USER'],
    authToken: data.accessToken,
    tokenExpired: false,
    uid: data.uid,
    username
  };
};

export { authenticate };
