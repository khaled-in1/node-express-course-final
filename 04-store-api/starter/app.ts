require("dotenv").config();
require("express-async-errors");
//async errors

import express from "express";
const app = express();

import connectDB from "./db/connect";
import { router as productsRouter } from "./routes/products";

import { notFound as notFoundMiddleware } from "./middleware/not-found";
import errorMiddleware from "./middleware/error-handler";

//middleware
app.use(express.json());

//routes
app.get("/", (req, res) => {
  res.send(`<h1>store API</h1><a href="/api/v1/products">products route</a>`);
});

app.use("/api/v1/products", productsRouter);

// products route

app.use(notFoundMiddleware);
app.use(errorMiddleware);

const port = process.env.PORT || 3000;
const start = async () => {
  try {
    //connectDB
    await connectDB(process.env.MONGO_URI);
    app.listen(port, () => {
      console.log(`The server is listening on port ${port}...`);
    });
  } catch (error) {
    console.log(error);
  }
};

start();
