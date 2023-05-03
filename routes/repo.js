import {StorageFactory} from "./storages/storageFactory";

export function initStorage() {
    const factory = new StorageFactory()
    storage = factory.getStorage();
}

let storage;

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
    return storage.editTodo(id, newName);
}

