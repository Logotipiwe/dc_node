import AbstractRepo from "./AbstractRepo";
import List from "../model/List";
import Tables from "../model/Tables";
import todoService from "../services/todoService";

class ListRepo extends AbstractRepo<List>{
    getTable(): string {
        return Tables.LISTS;
    }

    async getOne(id: string) {
        const list = await super.getOne(id);
        const todos = await todoService.getAll()
        list.todos = todos.filter(t => t.listId === list.id)
        return list;
    }

    async getAll(): Promise<List[]> {
        let lists = await super.getAll();
        const todos = await todoService.getAll();
        lists.forEach(list=>{
            list.todos = todos.filter(t => t.listId === list.id)
        })
        return lists;
    }

    async saveOne(entity: List): Promise<List> {
        entity.todos = []
        return super.saveOne(entity);
    }

    async saveMany(entities: List[]): Promise<List[]> {
        entities.forEach(list=> list.todos=[])
        return super.saveMany(entities);
    }
}


export default new ListRepo()