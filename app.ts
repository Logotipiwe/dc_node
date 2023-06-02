import express from "express";
import logger from "morgan";
import cookieParser from "cookie-parser"
import webControllers from "./routes/controllers/web";
import httpContext from "express-http-context";
import {authMiddleware} from "./routes/auth/authMiddleware";
import EnvAccessor from "./routes/EnvAccessor";

const app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(httpContext.middleware);

// app.use(authMiddleware)

webControllers.forEach((value, key) => {
    app.use(key, value)
})

EnvAccessor.ensureNecessaryVars()

export default app;
