import mongoose from "mongoose";
import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";
import dotenv from "dotenv";
import { authRouter } from "./src/routes/authRouter.js";
import { bookRouter } from "./src/routes/bookRouter.js";



dotenv.config();

const connect = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URI).then((data) => {
      console.log("MongoDB connected successfully", data.connection.host);
    });
  } catch (error) {
    console.log(error);
  }
};

connect();

const app = express();

app.use("*", cors({ origin: true, credentials: true }));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.get("/", (req, res) => {
  res.status(200).json({ data: "success" });
});

// Routes
app.use("/auth", authRouter);
app.use("/book", bookRouter);

app.listen(8000, () => {
    console.log("Listening on port 8000");
  });