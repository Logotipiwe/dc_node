import express from "express";
import logger from "morgan";
import webControllers from "./routes/controllers/web";

const app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

webControllers.forEach((value, key) => {
    app.use(key, value)
})

export default app;
