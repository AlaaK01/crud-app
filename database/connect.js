import mongoose from "mongoose";


const connectToMongo = async () => {
  try {
    const { connection } = await mongoose.connect(process.env.MONGO_URI);
    if (connection.readyState == 1) {
      console.log("Datatbase Connected");
    }
  } catch (errors) {
    return Promise.reject(errors);
  }
};

export default connectToMongo;
