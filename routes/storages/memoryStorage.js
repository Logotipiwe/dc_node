import AbstractStorage from "./storage";

export class MemoryStorage extends AbstractStorage {
    _data;
    static storageType = "MEM"

    constructor() {
        super();
        this._data = [];
    }

    static create(){
        let storage = new MemoryStorage();
        return storage;
    }

    getStorageType(){
        return MemoryStorage.storageType;
    }

    getTodos() {
        return this._data;
    }

    saveTodo(todo) {
        const todos = this.getTodos();
        let indexToSave = todos.findIndex(t => t.id === todo.id);
        if (indexToSave !== -1) {
            todos.splice(indexToSave, 1, todo);
        } else {
            todo.id = todos.length + 1;
            todos.push(todo);
        }
        return todo;
    }

    saveTodos(todos) {
        this._data = [...todos];
        return this._data;
    }

    clearTodos() {
        this._data = [];
    }

    deleteTodo(todo) {
        const todos = this.getTodos();
        const indexToDelete = todos.findIndex(x => x.id == todo.id);
        todos.splice(indexToDelete, 1);
        this.saveTodos(todos);
        return true;
    }

    editTodo(todo) {
        const todos = this.getTodos();
        const todoToChange = todos.find(x => x.id == todo.id);
        if (!todoToChange) throw new Error("no todo found by id " + todo.id);

        const todoToSave = {...todoToChange, ...todo};

        const saved = this.saveTodo(todoToSave);
        return saved;
    }
}