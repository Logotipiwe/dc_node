import factory from "./storages/storageFactory";
import MongoStorage from "./storages/mongoStorage";


export async function getTodosImpl(){
    const storage = factory.getStorage();
    const todos = await storage.getTodos();
    return todos.map(transpile);
}
export async function saveTodoImpl(todo){
    const storage = factory.getStorage();
    todo.savedBy = storage.getStorageType()
    const savedTodo = await storage.saveTodo(todo);
    return transpile(savedTodo);
}

async function saveTodosImpl(todos){
    const storage = factory.getStorage();
    todos.forEach(todo=>todo.savedBy = storage.getStorageType())
    const savedTodos = await storage.saveTodos(todos);
    return savedTodos.map(transpile)
}

export async function clearTodos(){
    await factory.getStorage().clearTodos()
}
export async function deleteTodoImpl(todo){
    const isDeleted = await factory.getStorage().deleteTodo(todo);
    return isDeleted
}
export async function editTodoImpl(todo){
    const edited = await factory.getStorage().editTodo(todo);
    return transpile(edited);
}


function transpile(todo){
    if(todo.savedBy === MongoStorage.storageType){
        todo.id = todo._id.toString();
        return todo;
    } else {
        return todo
    }
}