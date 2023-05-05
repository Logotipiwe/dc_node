import {deleteTodoImpl, editTodoImpl, getTodosImpl, saveTodoImpl} from "./repo";
import Todo from "./model/Todo";

export async function createTodo(name){
    const newTodo = Todo.create(name)
    await saveTodoImpl(newTodo);
    return newTodo;
}
export async function deleteTodo(todo){
    await deleteTodoImpl(todo);
}
export async function editTodo(todo): Promise<Todo> {
    return await editTodoImpl(todo);
}
export async function getTodos(){
    return await getTodosImpl();
}