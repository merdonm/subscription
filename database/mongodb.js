import mongoose from "mongoose";
import { DB_URI, NODE_ENV } from "../config/env.js";

if (!DB_URI) {
  throw new Error(
    "Please define MONGODB_URI in process.env.<development/production>.local env"
  );
}

const connectToDatabase = async () => {
  try {
    await mongoose.connect(DB_URI);
    console.log("DB connected to", NODE_ENV);
  } catch (error) {
    console.log("Error in connecting DB", error);
    process.exit(1);
  }
};

export default connectToDatabase;
