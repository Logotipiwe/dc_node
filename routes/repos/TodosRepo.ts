import AbstractRepo from "./AbstractRepo";
import Todo from "../model/Todo";

class TodosRepo extends AbstractRepo<Todo> {
    getTable(): string {
        return "todos";
    }
}

export default new TodosRepo()