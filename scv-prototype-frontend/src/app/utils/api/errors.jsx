/**
 * A custom error class intended to be thrown on authentication errors.
 */
class InvalidTokenError extends Error {
  constructor(message) {
    super(message);
    this.name = 'InvalidTokenError';
  }
}

// eslint-disable-next-line import/prefer-default-export
export { InvalidTokenError };
