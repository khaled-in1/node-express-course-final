export default class CustomAPIError extends Error {
  statusCode: any;
  constructor(message, statusCode) {
    super(message);
    this.statusCode = statusCode;
  }
}
