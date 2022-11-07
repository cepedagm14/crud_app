import mongoose from "mongoose";

const URL =
  "mongodb+srv://orgrim:orgrim@nextjscrud.wjy2dsw.mongodb.net/?retryWrites=true&w=majority";

const connectMongo = async () => {
  try {
    const { connection } = await mongoose.connect(URL);

    if (connection.readyState == 1) {
      console.log("Database Connected");
    }
    console.log(connection);
  } catch (errors) {
    return Promise.reject(errors);
  }
};

export default connectMongo;
