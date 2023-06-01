import Todo from "../model/entities/Todo";
import todosRepo from "../repos/TodosRepo";
import Entity from "../model/entities/Entity";
import AbstractRepo from "../repos/AbstractRepo";
import CrudService from "./CrudService";
import List from "../model/entities/List";
import SecuredCrudService from "./SecuredCrudService";

class TodoService extends SecuredCrudService<Todo> {
    _repo = todosRepo;
    getRepo(): AbstractRepo<Todo> {
        return this._repo;
    }

    async getByList(list: List){
        const all = await this.getAll();
        return all.filter(todo=> todo.listId === list.id);
    }
}

export default new TodoService();