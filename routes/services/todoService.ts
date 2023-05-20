import Todo from "../model/Todo";
import todosRepo from "../repos/TodosRepo";
import Entity from "../model/Entity";
import AbstractRepo from "../repos/AbstractRepo";
import CrudService from "./CrudService";

class TodoService extends CrudService<Todo> {
    _repo = todosRepo;
    getRepo(): AbstractRepo<Todo> {
        return this._repo;
    }
}

export default new TodoService();