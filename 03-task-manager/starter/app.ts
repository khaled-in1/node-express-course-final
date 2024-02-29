import express from "express";
const app = express();
import { router } from "./routes/tasks";
import connectDB from "./db/connect";
require("dotenv").config();
import { notFound } from "./middleware/not-found";
import errorHandlerMiddleware from "./middleware/error-handler";

app.use(express.static("./public"));
app.use(express.json());

app.use("/api/v1/tasks", router);
app.use(notFound);
app.use(errorHandlerMiddleware);

const port = process.env.PORT || 3000;

const start = async () => {
  try {
    await connectDB(process.env.MONGO_URI);
    app.listen(port, () => {
      console.log(`The server is listening on port ${port}...`);
    });
  } catch (error) {
    console.log(error);
  }
};

start();
