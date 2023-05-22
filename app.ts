import express from "express";
import logger from "morgan";
import indexRouter from "./routes/controllers/web/webController";
import todosRouter from "./routes/controllers/web/todosWebController"
import listsRouter from "./routes/controllers/web/listsWebController"

const app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use("/", indexRouter);
app.use("/todos", todosRouter)
app.use(listsRouter)

export default app;
