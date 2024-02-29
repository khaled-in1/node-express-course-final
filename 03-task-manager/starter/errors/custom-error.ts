class CustomAPIError extends Error {
  statusCode: any;
  constructor(message, statusCode) {
    super(message);
    this.statusCode = statusCode;
  }
}

const createCustomError = (msg, statusCode) => {
  return new CustomAPIError(msg, statusCode);
};

export { createCustomError, CustomAPIError };
