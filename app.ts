import express from "express";
import logger from "morgan";
import indexRouter from "./routes";
import createRouter from "./routes/controller"

const app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use("/", indexRouter);
app.use(createRouter)

export default app;
