export class MemoryStorage {
    _data;
    static storageType = "MEM"

    constructor() {
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
            todos.push(todo);
        }
        return todo;
    }

    saveTodos(todos) {
        this._data = [...todos];
    }

    clearTodos() {
        this._data = [];
    }

    deleteTodo(id) {
        const todos = this.getTodos();
        const indexToDelete = todos.findIndex(todo => todo.id == id);
        todos.splice(indexToDelete, 1);
        this.saveTodos(todos);
        return true;
    }

    editTodo(id, newName) {
        const todos = this.getTodos();
        // noinspection EqualityComparisonWithCoercionJS
        const todoToChange = todos.find(todo => todo.id == id);
        if (!todoToChange) throw new Error("no todo found by id " + id);

        todoToChange.name = newName;

        // noinspection UnnecessaryLocalVariableJS
        const saved = this.saveTodo(todoToChange);
        return saved;
    }
}