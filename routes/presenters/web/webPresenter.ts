export function getCreationForm() {
    return `
<form action="/create" method="post"> 
    <input type="text" placeholder="Name..." name="name">
    <input type="submit">
</form> 
    `
}

export function printTodos(todos) {
    return todos.map(printTodo).join("<br/>")
}

function getDeleteForm(todo) {
    return `
<form action="/delete/${todo.id}" method="post">
    <input type="hidden" name="id" value="${todo.id}">
    <input type="submit" value="Удалить todo ${todo.name}">
</form>
    `;
}

function getEditForm(todo) {
    return `
<form action="/edit/${todo.id}" method="post">
    <input type="text" name="name" placeholder="Edit...">
    <input type="hidden" name="id" value="${todo.id}">
</form>
    `;
}

function printTodo(todo) {
    return todo.id + ". " + todo.name
        + getEditForm(todo)
        + getDeleteForm(todo);
}