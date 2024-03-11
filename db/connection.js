import mongoose from "mongoose";

const mongodb = process.env.MONGODB_URL;

export async function ConnectDB() {
  try {
    await mongoose.connect(mongodb);
  } catch (error) {
    console.error(error);
  }
}
