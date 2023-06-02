import Entity from "./Entity";
import Todo from "./Todo";

type ListType = "num"|"bullet"

export default class List extends Entity{
    id: string
    name: string
    type: ListType
    todos: Todo[] = [];

    static create(name: string, type: ListType, todos?: Todo[]){
        const list = new List()
        list.name = name;
        list.type = type;
        if(todos) list.todos = todos;

        return list;
    }

    edit(from: any){
        if(from.name) this.name = from.name;
        if(from.type) this.type = from.type === "num" ? "num" : "bullet";
    }
}