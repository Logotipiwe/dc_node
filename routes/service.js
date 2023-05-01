import {promises} from "fs";

function constructTodo(id, name){
    return {id, name};
}

export function createTodo(name){
    return getTodos().then(todos=>{
        todos.push(constructTodo(todos.length + 1, name));
        return saveTodos(todos);
    });
}
export function getTodos(){
    return promises.readFile('data.json', 'utf8')
        .then(JSON.parse);
}
export function saveTodos(todos){
    return promises.writeFile("data.json", JSON.stringify(todos)).then(()=>{
        return todos;
    });
}