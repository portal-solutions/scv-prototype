/* eslint-disable import/prefer-default-export */
import config from '../../../config';
import InvalidSINError from './InvalidSINError';

/**
 * Authenticate a person by using the REST API.
 */
const authenticate = async (sin) => {
  // extract only numbers
  const cleanSin = sin.replace(/\D/g, '');

  const url = `${config.api.baseUrl}/api/persons/${cleanSin}`;
  const response = await fetch(url, { cache: 'no-cache' });

  if (response.status === 404) {
    throw new InvalidSINError('Invalid Social Insurance Number.');
  }

  const data = await response.json();

  return {
    authenticated: true,
    authorities: ['USER'],
    authToken: data.accessToken,
    tokenExpired: false,
    uid: data.PersonOtherIdentification.IdentificationID,
    username: data.PersonName.PersonFullName,
    sin,
    agreedTermsAndConditions: false
  };
};

export { authenticate };
