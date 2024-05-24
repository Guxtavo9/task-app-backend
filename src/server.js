// const express = require('express')
import express from "express";
// import cors from "cors";
// import userRouter from "./routers/authRouter.js";
import usersRouter from "./routers/usersRouter.js";
import { HOST, PORT } from "./config.js";
// import productRouter from "./routers/productRouter.js";
// import methodUrl from "./middlewares/methodUrl.js";
// import cookieParser from 'cookie-parser'

const app = express();

app.use(express.json());
// app.use(cors({
//   // "origin": ["http://localhost:3000", 'http://localhost:8081/', 'https://backend-api-express-p6sl.onrender.com/'],
//   'origin': '*',
//   "methods": ['GET','PUT','POST','DELETE'],
//   'allowedHeaders': ['Content-Type', 'Authorization']
// }));
// app.use(methodUrl);

app.use("/user", usersRouter);
// app.use("/product", productRouter);
// app.use(cookieParser);
app.listen(PORT, () => {
  console.log(`Server running on ${HOST}:${PORT}`);
});

