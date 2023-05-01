
export function getCreationForm(){
    return `
<form action="/create" method="post"> 
    <input type="text" placeholder="Name..." name="name">
    <input type="submit">
</form> 
    `
}

export function printTodos(todos){
    return todos.map(printTodo).join("<br/>")
}
function printTodo(todo){
    return todo.id + ". " + todo.name;
}