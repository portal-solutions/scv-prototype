/* eslint-disable import/prefer-default-export */

import config from '../../../config';
import InvalidTokenError from './InvalidTokenError';

/**
 * This is a test method that will fetch a greeting from the API.
 * TODO :: GjB :: remove this when no longer useful
 */
const fetchGreetings = async (authToken) => {
  const url = `${config.api.baseUrl}/api/greetings`;

  const response = await fetch(url, {
    cache: 'no-cache',
    headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${authToken}` },
    method: 'GET',
    mode: 'cors'
  });

  if (response.status === 401) {
    throw new InvalidTokenError('Invalid token or token has expired');
  }

  if (!response.ok) {
    throw new Error(`Error on GET to ${url}; status=${response.status}`);
  }

  return response.json();
};

/**
 * Fetch a user profile from the backend API.
 */
const fetchProfile = async (authToken, uid) => {
  const url = `${config.api.baseUrl}/api/profiles/${uid}`;

  const response = await fetch(url, {
    cache: 'no-cache',
    headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${authToken}` },
    method: 'GET',
    mode: 'cors'
  });

  if (response.status === 401) {
    throw new InvalidTokenError('Invalid token or token has expired');
  }

  if (!response.ok) {
    throw new Error(`Error on GET to ${url}; status=${response.status}`);
  }

  return response.json();
};

export { fetchGreetings, fetchProfile };
