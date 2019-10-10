/* eslint-disable import/prefer-default-export */

import config from '../../../config';
import InvalidTokenError from './InvalidTokenError';

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

export { fetchGreetings };
