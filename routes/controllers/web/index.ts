import indexRouter from './webController';
import todosRouter from "./todosWebController"
import listsRouter from "./listsWebController"
import gOauth from "./googleAuthController"

export default new Map([
    ["/", indexRouter],
    ["/todos", todosRouter],
    ["/lists", listsRouter],
    ["/g_oauth", gOauth]
])