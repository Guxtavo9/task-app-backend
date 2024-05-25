// const express = require("express");
import express from "express";
import cors from "cors";
import authRouter from "./routers/authRouter.js";
import userRouter from "./routers/userRouter.js";
import { HOST, PORT } from "./config.js";
import taskRouter from "./routers/taskRouter.js";
import methodUrl from "./middlewares/methodUrl.js";
import cookieParser from "cookie-parser";

const app = express();

app.use(express.json());
app.use(cors({
  // "origin": ["http://localhost:3000", 'https://backend-api-express-p6sl.onrender.com'],
  'origin': '*',
  "methods": ['GET','PUT','POST','DELETE'],
  'allowedHeaders': ['Content-Type', 'Authorization']
}));
app.use(methodUrl);

app.use("/auth", authRouter);
app.use("/user", userRouter);
app.use("/task", taskRouter);
app.use(cookieParser);
app.listen(PORT, () => {
  console.log(`Server running on ${HOST}:${PORT}`);
});
