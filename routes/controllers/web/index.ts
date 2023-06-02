import indexRouter from './webController';
import todosRouter from "./todosWebController"
import listsRouter from "./listsWebController"
import gOauth from "./googleAuthController"
import {authMiddleware} from "../../auth/authMiddleware";

export default new Map([
    ["/", [indexRouter]],
    ["/todos", [authMiddleware, todosRouter]],
    ["/lists", [authMiddleware, listsRouter]],
    ["/g_oauth", [gOauth]]
])