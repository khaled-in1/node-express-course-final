const User = require("../models/User");
import jwt, { JwtPayload } from "jsonwebtoken";
import { UnauthenticatedError } from "../errors";
import { stringify } from "querystring";

const auth = (req, res, next) => {
  const authHeaders = req.headers.authorization;

  if (!authHeaders || !authHeaders.startsWith("Bearer")) {
    throw new UnauthenticatedError("Authentication invalid");
  }

  const token = authHeaders.split(" ")[1];
  try {
    // const decoded = jwt.decode(token, { complete: true });
    // if (decoded === null) {
    //   return res.status(401).send({ success: false });
    // }
    // const load = decoded.payload;
    const payload = jwt.verify(token, process.env.JWT_SECRET!) as JwtPayload;
    console.log("The payload is: ", payload.userId);

    req.user = {
      userID: payload.userId,
      name: payload.name,
    };
    console.log("payload.userID ", payload.userID);
    console.log("The name ", payload.name);

    next();
  } catch (error) {
    throw new UnauthenticatedError("Athentication invalid");
  }
};

export default auth;
