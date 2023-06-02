import List from "../../model/entities/List";
import Todo from "../../model/entities/Todo";

class TodosPresenter {

    printTodos = (todos: Todo[]) => {
        return todos.map(this.printTodo).join("<br/>");
    }

    getDeleteForm = (todo: Todo) => {
        return `
    <form action="/todos/delete/${todo.id}" method="post">
        <input type="hidden" name="id" value="${todo.id}">
        <input type="submit" value="Удалить todo ${todo.name}">
    </form>
        `;
    };

    getEditForm = (todo: Todo) => {
        return `
            <form action="/todos/edit/${todo.id}" method="post">
                <input type="text" name="name" placeholder="Edit...">
                <input type="hidden" name="id" value="${todo.id}">
            </form>
        `;
    };

    printTodo = (todo: Todo) => {
        return todo.id + ". " + todo.name
            + this.getEditForm(todo)
            + this.getDeleteForm(todo);
    };
}

export default new TodosPresenter()