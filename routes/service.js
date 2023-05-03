import {deleteTodoImpl, editTodoImpl, getTodosImpl, saveTodoImpl} from "./repo.js";

function constructTodo(name) {
    const todos = getTodosImpl();
    return {id: todos.length + 1, name};
}

export function createTodo(name){
    const newTodo = constructTodo(name);
    saveTodoImpl(newTodo);
    return newTodo;
}
export function deleteTodo(id){
    deleteTodoImpl(id);
}
export function editTodo(id, name){
    return editTodoImpl(id, name);
}
export function getTodos(){
    return getTodosImpl();
}