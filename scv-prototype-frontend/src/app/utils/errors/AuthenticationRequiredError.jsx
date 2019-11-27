class AuthenticationRequiredError extends Error {
  constructor(message) {
    super(message);
    this.name = 'AuthenticationRequiredError';
  }
}

export default AuthenticationRequiredError;
