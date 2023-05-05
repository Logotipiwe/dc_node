
export default class Todo {
    constructor(name: string) {
        this.name = name;
    }

    name: string
    id: number

    static create(name: string){
        return new Todo(name)
    }
}