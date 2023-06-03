import express from "express";
import logger from "morgan";
import cookieParser from "cookie-parser"
import webControllers from "./routes/controllers/web";
import httpContext from "express-http-context";
import EnvAccessor from "./routes/EnvAccessor";

EnvAccessor.ensureNecessaryVars()

const app = express();
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(httpContext.middleware);

webControllers.forEach((value, key) => {
    app.use(EnvAccessor.getBasePath() + key, value)
})

export default app;
