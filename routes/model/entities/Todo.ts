import Entity from "./Entity";

export default class Todo extends Entity {
    id: string
    name: string
    listId?: string

    constructor(name: string, listId?: string) {
        super();
        this.name = name;
        this.listId = listId;
    }

    static create(name: string, listId?: string) {
        return new Todo(name, listId)
    }

    edit(from: any) {
        if (from.name) this.name = from.name
        if (from.listId) this.listId = from.listId
    }
}