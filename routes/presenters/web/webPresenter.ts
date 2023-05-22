import List from "../../model/List";

export function getCreationForm() {
    return `
<form action="/lists/create" method="post"> 
    <input type="text" placeholder="Name..." name="name">
    <select name="type">
        <option value="num">Нумерованный</option> 
        <option value="bullet">Маркированный</option>
    </select>
    <input type="submit" value="+ список">
</form> 
    `
}

export function getIndex(lists: List[]){
    return getCreationForm() + printLists(lists);

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

function printAddTodoToListForm(list: List) {
    return `<form action="/todos/create" method="post">
        <input name="name" placeholder="Name...">
        <input name="list" type="hidden" value="${list.id}">
        <input type="submit" value="+todo">
    </form>`
}

function printListDeleteForm(list: List) {
    return `<form action="/lists/delete/${list.id}" method="post">
        <input type="submit" value="-list">
    </form>`
}

function printLists(lists: List[]): string {
    return lists.map((list, i)=>{
        return `${i}. ${list.name}<br/>
        ${printAddTodoToListForm(list)}<br/>
        ${printListDeleteForm(list)}<br/>
        TODOs:<br/> 
        <div style="margin-left: 20px">${list.todos.map(printTodo)}</div>
        `;
    }).join("<br/>")
}