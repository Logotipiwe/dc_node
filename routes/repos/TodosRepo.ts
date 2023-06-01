import AbstractRepo from "./AbstractRepo";
import Todo from "../model/entities/Todo";
import EntitiesTables from "../model/entities/EntitiesTables";

class TodosRepo extends AbstractRepo<Todo> {
    getTable(): string {
        return EntitiesTables.TODOS;
    }
}

export default new TodosRepo()