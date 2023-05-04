import fs from "fs";
import AbstractStorage from "./storage";

export class FileStorage extends AbstractStorage{
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
            todo.id = todos.length + 1;
            todos.push(todo);
        }
        this.saveTodos(todos);
        return todo;
    }

    saveTodos(todos) {
        fs.writeFileSync("data.json", JSON.stringify(todos));
        return todos;
    }

    clearTodos() {
        fs.writeFileSync("data.json", "[]");
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
        // noinspection EqualityComparisonWithCoercionJS
        const todoToChange = todos.find(x => x.id == todo.id);
        if (!todoToChange) throw new Error("no todo found by id " + todo.id);

        todoToChange.name = todo.name;

        // noinspection UnnecessaryLocalVariableJS
        const saved = this.saveTodo(todoToChange);
        return saved;
    }
}