import factory from "./storages/storageFactory";
import todoTranspiler from "./adapters/todoTranspiler";


export async function getTodosImpl(){
    const storage = factory.getStorage();
    const todos = await storage.getTodos();
    return todos.map(todoTranspiler.toObject);
}
export async function saveTodoImpl(todo){
    const storage = factory.getStorage();
    todo.savedBy = storage.getStorageType();
    todo = todoTranspiler.toRelation(todo);
    const savedTodo = await storage.saveTodo(todo);
    return todoTranspiler.toObject(savedTodo);
}

async function saveTodosImpl(todos){
    const storage = factory.getStorage();
    todos.forEach(todo=>todo.savedBy = storage.getStorageType())
    todos = todos.map(todoTranspiler.toRelation);
    const savedTodos = await storage.saveTodos(todos);
    return savedTodos.map(todoTranspiler.toObject)
}

export async function clearTodos(){
    await factory.getStorage().clearTodos()
}
export async function deleteTodoImpl(todo){
    todo = todoTranspiler.toRelation(todo);
    const isDeleted = await factory.getStorage().deleteTodo(todo);
    return isDeleted
}
export async function editTodoImpl(todo){
    todo = todoTranspiler.toRelation(todo);
    const edited = await factory.getStorage().editTodo(todo);
    return todoTranspiler.toObject(edited);
}