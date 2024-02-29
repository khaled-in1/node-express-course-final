import { CustomAPIError } from "../errors/custom-error";

const errorHandlerMiddleware = (err, req, res, next) => {
  console.log(err.message, err.status);
  if (err instanceof CustomAPIError) {
    return res.status(err.statusCode).json({ msg: err.message });
  }
  return res.status(500).json({ msg: "Somthing went wrong, please try again" });
};

export default errorHandlerMiddleware;
