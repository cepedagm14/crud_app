import mongoose from "mongoose";

const MONGO_URL =
  "mongodb+srv://orgrim:orgrim@nextjscrud.wjy2dsw.mongodb.net/?retryWrites=true&w=majority";

const connectMongo = async () => {
  try {
    const { connection } = await mongoose.connect(MONGO_URL);
    if (connection.readyState == 1) {
      console.log("database connected");
    }
  } catch (error) {
    return Promise.reject(error);
  }
};

export default connectMongo;
