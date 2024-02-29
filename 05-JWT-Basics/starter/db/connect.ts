import { connect } from "mongoose";

const connectDB = (url) => {
  return connect(url, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false,
    useUnifiedTopology: true,
  });
};

export default connectDB;
