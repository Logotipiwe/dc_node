import express from "express";
// import path from "path";
// import cookieParser from "cookie-parser";
import logger from "morgan";
import indexRouter from "./routes/index.js";
import createRouter from "./routes/controller.js"

var app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use('/', indexRouter);
app.use(createRouter)

export default app;
