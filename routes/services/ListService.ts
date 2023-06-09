import List from "../model/entities/List";
import AbstractRepo from "../repos/AbstractRepo";
import listRepo from "../repos/ListRepo";
import todoService from "./TodoService";
import SecuredCrudService from "./SecuredCrudService";


class ListService extends SecuredCrudService<List> {
    getRepo(): AbstractRepo<List> {
        return listRepo;
    }

    async delete(id: string): Promise<boolean> {
        const list = await this.getOne(id);
        const listTodos = await todoService.getByList(list);
        listTodos.forEach(t => todoService.delete(t.id))
        return super.delete(id);
    }
}

const listService = new ListService();
export default listService