import List from "../../model/entities/List";
import todosPresenter from "./TodosPresenter";

class ListsPresenter {
    creationForm() {
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

    printLists = (lists: List[]): string => {
        return lists.map((list, i) => {
            return `${i}. ${list.name}<br/>
            ${this.newTodoForm(list)}<br/>
            ${this.deletionForm(list)}<br/>
            TODOs:<br/> 
            <div style="margin-left: 20px">${list.todos.map(todosPresenter.printTodo)}</div>
            `;
        }).join("<br/>");
    };

    newTodoForm = (list: List) => {
        return `<form action="/todos/create" method="post">
            <input name="name" placeholder="Name...">
            <input name="list" type="hidden" value="${list.id}">
            <input type="submit" value="+todo">
        </form>`;
    };

    deletionForm = (list: List) => {
        return `<form action="/lists/delete/${list.id}" method="post">
            <input type="submit" value="-list">
        </form>`;
    };
}

export default new ListsPresenter()