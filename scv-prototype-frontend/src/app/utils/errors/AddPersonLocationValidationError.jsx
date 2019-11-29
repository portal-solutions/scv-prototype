class AddPersonLocationValidationError extends Error {
  constructor(message) {
    super(message);
    this.name = 'AddLocationValidationError';
    this.locationMessage = null;
    this.programsMessage = null;
  }

  hasError() {
    return (
      (this.locationMessage !== null && this.locationMessage.length) ||
      (this.programsMessage !== null && this.programsMessage.length)
    );
  }
}

export default AddPersonLocationValidationError;
