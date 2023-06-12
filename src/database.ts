import env from "dotenv";
import mongoose from "mongoose";

env.config();
const uri = process.env.MONGODB_CONFIG;

async function connectDB() {
  try {
    // Connect with Mongoose
    if (uri) {
      await mongoose.connect(uri);
    } else {
      console.error("MongoDB URI is undefined");
      process.exit(1);
    }

    // Handle Mongoose connection errors
    mongoose.connection.on("error", (error) => {
      console.error("MongoDB connection error:", error);
    });

    console.log("DB Connected");
  } catch(err) {
    console.error("An error occurred:", err);
  }
}

module.exports = { connectDB };