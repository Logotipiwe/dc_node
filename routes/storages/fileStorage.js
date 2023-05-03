import fs from "fs";

export class FileStorage {
    static storageType = "FILE"

    static create(){
        let storage = new FileStorage();
        return storage;
    }

    getStorageType(){
        return FileStorage.storageType;
    }

    getTodos() {
        let data = fs.readFileSync('data.json', 'utf8');
        return JSON.parse(data);
    }

    saveTodo(todo) {
        const todos = this.getTodos();
        let indexToSave = todos.findIndex(t => t.id === todo.id);
        if (indexToSave !== -1) {
            todos.splice(indexToSave, 1, todo);
        } else {
            todos.push(todo);
        }
        this.saveTodos(todos);
        return todo;
    }

    saveTodos(todos) {
        fs.writeFileSync("data.json", JSON.stringify(todos));
    }

    clearTodos() {
        fs.writeFileSync("data.json", "[]");
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