import Entity from "./Entity";

export default class Todo extends Entity{
    constructor(name: string, listId?: string) {
        super();
        this.name = name;
        this.listId = listId;
    }

    id: string
    name: string
    listId?: string

    static create(name: string, listId?: string){
        return new Todo(name, listId)
    }
}