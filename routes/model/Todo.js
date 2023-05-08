import Entity from "./Entity";
export default class Todo extends Entity {
    constructor(name) {
        super();
        this.name = name;
    }
    static create(name) {
        return new Todo(name);
    }
}
