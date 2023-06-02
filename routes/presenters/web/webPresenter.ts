import List from "../../model/entities/List";
import httpContext from "express-http-context";
import listService from "../../services/ListService";

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

function getLoginInfo(user) {
    return `<h1>Здарова ${user.name}! <a href="/g_oauth/logout">Выйти</a> </h1> <br/>`
}

function getAuthForm() {
    return "<a href='https://accounts.google.com/o/oauth2/v2/auth?client_id=319710408255-ntkf14k8ruk4p98sn2u1ho4j99rpjqja.apps.googleusercontent.com&redirect_uri=http%3A%2F%2Flocalhost%3A3000%2Fg_oauth&response_type=code&scope=profile'>ВОЙТИ</a><br/>"
}

export async function getIndex(){
    const user = httpContext.get("user");
    if(user){
        const lists = await listService.getAll();
        return getLoginInfo(user) + getCreationForm() + printLists(lists);
    } else {
        return getAuthForm();
    }

}

export function printTodos(todos) {
    return todos.map(printTodo).join("<br/>")
}

function getDeleteForm(todo) {
    return `
<form action="/todos/delete/${todo.id}" method="post">
    <input type="hidden" name="id" value="${todo.id}">
    <input type="submit" value="Удалить todo ${todo.name}">
</form>
    `;
}

function getEditForm(todo) {
    return `
<form action="/todos/edit/${todo.id}" method="post">
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