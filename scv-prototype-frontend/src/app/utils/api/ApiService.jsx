/* eslint-disable import/prefer-default-export */

import config from '../../../config';
import InvalidTokenError from '../errors/InvalidTokenError';
import NotFoundError from '../errors/NotFoundError';

const SanitizeSIN = (sin) => sin.replace(/\D/g, '');

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
 * Fetch a user's payment details from the backend API.
 */
const fetchPaymentDetails = async (authToken, uid) => {
  const url = `${config.api.baseUrl}/api/profiles/${uid}/payment-details`;

  const response = await fetch(url, {
    cache: 'no-cache',
    headers: { Authorization: `Bearer ${authToken}`, 'Content-Type': 'application/json' },
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
 * Fetch a user's payment history from the backend API.
 */
const fetchPaymentHistory = async (authToken, uid) => {
  const url = `${config.api.baseUrl}/api/profiles/${uid}/payment-history`;

  const response = await fetch(url, {
    cache: 'no-cache',
    headers: { Authorization: `Bearer ${authToken}`, 'Content-Type': 'application/json' },
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

/**
 * Fetch a person's locations from the backend API.
 */
const fetchPerson = async (sin) => {
  const url = `${config.api.baseUrl}/api/persons/${SanitizeSIN(sin)}`;

  const response = await fetch(url, {
    cache: 'no-cache',
    method: 'GET',
    mode: 'cors'
  });

  if (response.status === 404) {
    throw new NotFoundError(`Person data was not found with sin ${sin}.`);
  }

  if (!response.ok) {
    throw new Error(`Error on GET to ${url}; status=${response.status}`);
  }

  return response.json();
};

/**
 * Fetch a person's locations from the backend API.
 */
const fetchPersonPrograms = async (sin) => {
  const url = `${config.api.baseUrl}/api/persons/${SanitizeSIN(sin)}/programs`;

  const response = await fetch(url, {
    cache: 'no-cache',
    method: 'GET',
    mode: 'cors'
  });

  if (response.status === 404) {
    throw new NotFoundError(`Person programs data was not found with sin ${SanitizeSIN(sin)}.`);
  }

  if (!response.ok) {
    throw new Error(`Error on GET to ${url}; status=${response.status}`);
  }

  return response.json();
};

/**
 * Fetch a person's locations from the backend API.
 */
const fetchPersonLocations = async (sin) => {
  const url = `${config.api.baseUrl}/api/persons/${SanitizeSIN(sin)}/locations`;

  const response = await fetch(url, {
    cache: 'no-cache',
    method: 'GET',
    mode: 'cors'
  });

  if (response.status === 404) {
    throw new NotFoundError(`Person locations data was not found with sin ${sin}.`);
  }

  if (!response.ok) {
    throw new Error(`Error on GET to ${url}; status=${response.status}`);
  }

  return response.json();
};

export {
  fetchGreetings,
  fetchPaymentDetails,
  fetchPaymentHistory,
  fetchProfile,
  fetchPerson,
  fetchPersonPrograms,
  fetchPersonLocations
};
