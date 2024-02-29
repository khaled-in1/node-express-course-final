import CustomAPIError from "./custom-error";
import { StatusCodes } from "http-status-codes";

class UnauthenticatedError extends CustomAPIError {
  constructor(message) {
    super(message, StatusCodes.UNAUTHORIZED);
    this.statusCode = StatusCodes.UNAUTHORIZED;
  }
}

export default UnauthenticatedError;
