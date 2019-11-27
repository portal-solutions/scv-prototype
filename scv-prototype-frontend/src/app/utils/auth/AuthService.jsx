/* eslint-disable import/prefer-default-export */
import { fetchPerson } from '../api/ApiService';
import NotFoundError from '../errors/NotFoundError';
import InvalidSINError from '../errors/InvalidSINError';

/**
 * Authenticate a person by using the REST API.
 */
const authenticate = async (sin) => {
  try {
    const data = await fetchPerson(sin);

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
  } catch (err) {
    if (err instanceof NotFoundError) {
      throw new InvalidSINError('Invalid Social Insurance Number.');
    }

    throw err;
  }
};

export { authenticate };
