import indexRouter from './webController';
import todosRouter from "./todosWebController"
import listsRouter from "./listsWebController"

export default new Map([
    ["/", indexRouter],
    ["/todos", todosRouter],
    ["/lists", listsRouter]
])