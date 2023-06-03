import indexRouter from './webController';
import todosRouter from "./todosWebController"
import listsRouter from "./listsWebController"
import gOauth from "./googleAuthController"
import {authMiddleware} from "../../auth/authMiddleware";

let logging = (req, res, next) => {
    console.log("===REQUEST===")
    console.log("URL: " + req.url)
    console.log("BODY: " + JSON.stringify(req.body))
    next()
};
export default new Map([
    ["/", [logging, indexRouter]],
    ["/todos", [authMiddleware, todosRouter]],
    ["/lists", [authMiddleware, listsRouter]],
    ["/g_oauth", [gOauth]]
])