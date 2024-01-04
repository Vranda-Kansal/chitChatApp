// To connect frontened with mongodb use mongoose
import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

const USERNAME = process.env.DB_USERNAME;
const PASSWORD = process.env.DB_PASSWORD;

const Connection = async () => {
  const URL = `mongodb://user:Vranda987@ac-ue93a7w-shard-00-00.5lzq04w.mongodb.net:27017,ac-ue93a7w-shard-00-01.5lzq04w.mongodb.net:27017,ac-ue93a7w-shard-00-02.5lzq04w.mongodb.net:27017/?ssl=true&replicaSet=atlas-kqj61l-shard-0&authSource=admin&retryWrites=true&w=majority`;
  try {
    await mongoose.connect(URL, { useUnifiedTopology: true });
    console.log("database connected successfully");
  } catch (err) {
    console.log("Error while connecting with database", err.message);
  }
};

export default Connection;
