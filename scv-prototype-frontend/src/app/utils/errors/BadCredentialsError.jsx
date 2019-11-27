class BadCredentialsError extends Error {
  constructor(message) {
    super(message);
    this.name = 'BadCredentialsError';
  }
}

export default BadCredentialsError;
