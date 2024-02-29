require("dotenv").config();
require("express-async-errors");
import express from "express";
const app = express();
// import helmet from "helmet";
// import cors from "cors";
// import xss from "xss-clean";
// import rateLimiter from "express-rate-limit";
//ConnectDB
import connectDB from "./db/connect";
import authenticateduser from "./middleware/authentication";
//Routers
import authRouter from "./routes/auth";
import jobsRouter from "./routes/jobs";

// error handler
import notFoundMiddleware from "./middleware/not-found";
import errorHandlerMiddleware from "./middleware/error-handler";

app.use(express.json());
// extra seurity packages
app.set("trust proxy", 1);
// app.use(
//   rateLimiter({
//     windowMs: 15 * 60 * 1000, // 15 minutes
//     limit: 100, // Limit each IP to 100 requests per `window` (here, per 15 minutes).
//   })
// );
// app.use(helmet());
// app.use(cors());
// app.use(xss());

// routes

app.use("/api/v1/auth", authRouter);
app.use("/api/v1/jobs", authenticateduser, jobsRouter);

app.use(notFoundMiddleware);
app.use(errorHandlerMiddleware);

const port = process.env.PORT || 3000;

const start = async () => {
  try {
    await connectDB(process.env.MONGO_URI);
    app.listen(port, () =>
      console.log(`Server is listening on port ${port}...`)
    );
  } catch (error) {
    console.log(error);
  }
};

start();
