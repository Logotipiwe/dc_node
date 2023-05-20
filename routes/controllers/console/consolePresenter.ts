import Todo from "../../model/Todo";

export function printTodos(todos: Todo[]){
    let ans = "TODOS: \n";
    if(todos.length === 0){
        ans += "empty"
        return ans;
    }
    todos.forEach((todo, i)=>{
        ans += `${i}. Id: ${todo.id}; name: ${todo.name}\n`
    })
    return ans;
}