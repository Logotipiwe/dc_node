import AbstractRepo from "./AbstractRepo";
import Todo from "../model/Todo";
import Tables from "../model/Tables";

class TodosRepo extends AbstractRepo<Todo> {
    getTable(): string {
        return Tables.TODOS;
    }
}

export default new TodosRepo()