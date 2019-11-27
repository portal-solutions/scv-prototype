class InvalidSINError extends Error {
  constructor(message) {
    super(message);
    this.name = 'InvalidSINError';
  }
}

export default InvalidSINError;
