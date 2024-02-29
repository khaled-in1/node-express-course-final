require("dotenv").config();
require("express-async-errors");

import express from "express";
const app = express();

import { router as mainRouter } from "./routes/main";

import { notFound as notFoundMiddleware } from "./middleware/not-found";
import { errorHandlerMiddleware as errorHandlerMiddleware } from "./middleware/error-handler";

// middleware
app.use(express.static("./public"));
app.use(express.json());

app.use("/api/v1", mainRouter);

app.use(notFoundMiddleware);
app.use(errorHandlerMiddleware);

const port = process.env.PORT || 3000;

const start = async () => {
  try {
    app.listen(port, () =>
      console.log(`Server is listening on port ${port}...`)
    );
  } catch (error) {
    console.log(error);
  }
};

start();
