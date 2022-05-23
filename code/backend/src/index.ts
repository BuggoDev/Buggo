import mongoose from "mongoose";
import { app } from "./app";
import dotenv from "dotenv";

export const start = async () => {
  dotenv.config();
  if (!process.env.BUGGO_MONGO_URI) {
    throw new Error("BUGGO_MONGO_URI not defined!");
  }
  if (!process.env.JWT_KEY) {
    throw new Error("JWT_KEY not defined");
  }
  if (!process.env.JWT_EXPIRATION) {
    throw new Error("JWT_EXPIRATION not defined");
  }
  if (!process.env.GOOGLE_CLIENT_ID) {
    throw new Error("GOOGLE_CLIENT_ID not defined");
  }
  if (!process.env.GOOGLE_CLIENT_SECRET) {
    throw new Error("GOOGLE_CLIENT_SECRET not defined");
  }
  if (!process.env.GITHUB_CLIENT_ID) {
    throw new Error("GITHUB_CLIENT_ID not defined");
  }
  if (!process.env.GITHUB_CLIENT_SECRET) {
    throw new Error("GITHUB_CLIENT_SECRET not defined");
  }
  try {
    await mongoose.connect(process.env.BUGGO_MONGO_URI);
    console.log("Connected to MongoDB");
  } catch (err) {
    console.log(err);
  }

  app.listen(process.env.PORT || 4567, () => {
    console.log("Listening on port!");
  });
};

start();
