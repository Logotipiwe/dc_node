import Entity from "./Entity";

export default class Todo extends Entity{
    constructor(name: string) {
        super();
        this.name = name;
    }

    name: string
    id: number

    static create(name: string){
        return new Todo(name)
    }
}