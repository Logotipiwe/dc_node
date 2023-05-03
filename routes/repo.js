import fs from "fs";

class FileStorage {
    getTodos(){
        let data = fs.readFileSync('data.json', 'utf8');
        return JSON.parse(data);
    }
    saveTodo(todo){
        const todos = this.getTodos();
        let indexToSave = todos.findIndex(t=>t.id===todo.id);
        if(indexToSave !== -1){
            todos.splice(indexToSave, 1, todo);
        } else {
            todos.push(todo);
        }
        this.saveTodos(todos);
        return todo;
    }

    saveTodos(todos){
        fs.writeFileSync("data.json", JSON.stringify(todos));
    }

    clearTodos(){
        fs.writeFileSync("data.json", "[]");
    }

    deleteTodo(id){
        const todos = this.getTodos();
        const indexToDelete = todos.findIndex(todo=>todo.id == id);
        todos.splice(indexToDelete, 1);
        this.saveTodos(todos);
        return true;
    }

    editTodo(id, newName){
        const todos = this.getTodos();
        // noinspection EqualityComparisonWithCoercionJS
        const todoToChange = todos.find(todo=>todo.id == id);
        if(!todoToChange) throw new Error("no todo found by id " + id);

        todoToChange.name = newName;

        // noinspection UnnecessaryLocalVariableJS
        const saved = this.saveTodo(todoToChange);
        return saved;
    }
}
class MemoryStorage {
    constructor() {
        this._data = {}
    }

    getTodos(){
        return this._data
    }
    saveTodo(todo){
        const todos = this.getTodos();
        let indexToSave = todos.findIndex(t=>t.id===todo.id);
        if(indexToSave !== -1){
            todos.splice(indexToSave, 1, todo);
        } else {
            todos.push(todo);
        }
        this.saveTodos(todos);
        return todo;
    }

    saveTodos(todos){
        this._data = [...todos];
    }

    clearTodos(){
        this._data = {};
    }

    deleteTodo(id){
        const todos = this.getTodos();
        const indexToDelete = todos.findIndex(todo=>todo.id == id);
        todos.splice(indexToDelete, 1);
        this.saveTodos(todos);
        return true;
    }

    editTodo(id, newName){
        const todos = this.getTodos();
        // noinspection EqualityComparisonWithCoercionJS
        const todoToChange = todos.find(todo=>todo.id == id);
        if(!todoToChange) throw new Error("no todo found by id " + id);

        todoToChange.name = newName;

        // noinspection UnnecessaryLocalVariableJS
        const saved = this.saveTodo(todoToChange);
        return saved;
    }
}

const storage = new FileStorage();

export function getTodosImpl(){
    return storage.getTodos()
}
export function saveTodoImpl(todo){
    storage.saveTodo(todo);
}
function saveTodos(todos){
    storage.saveTodos(todos);
}

export function clearTodos(){
    storage.clearTodos()
}
export function deleteTodoImpl(id){
    return storage.deleteTodo(id)
}
export function editTodoImpl(id, newName){
    storage.editTodo(id, newName);
}

