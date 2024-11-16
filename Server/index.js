import cors from "cors"; //it is add for security purpose
import express from "express";
import mongoose from "mongoose";
import * as dotenv from "dotenv";

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ extended: true }));

//error handler
app.use((err, req, res, next) => {
  const status = err.status || 500;
  const message = err.message || "Something went wrong!";
  return res.status(status).json({
    success: false,
    status,
    message,
  });
});

//default get
app.get("/", (req, res) => {
  res.status(200).json({
    message: "Welcome to the Node.js API!",
  });
});

//function to connect to mongodb
const connectMongoDB = () => {
  mongoose.set("strictQuery", true);
  mongoose
    .connect(process.env.MONGODB_URL)
    .then(() => console.log("MongoDB connected"))
    .catch((error) => {
      console.error("Couldn't connect to MongoDB");
      console.error(error);
    });
};

//function to start the server
const startServer = async () => {
  try {
    connectMongoDB();
    app.listen(8000, () => console.log("Server started on port 8000"));
  } catch (error) {
    console.log(error);
  }
};

startServer();
