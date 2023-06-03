import Todo from "../../model/entities/Todo";

class TodosConsolePresenter {
    printTodos(todos: Todo[]) {
        let ans = "TODOS: \n";
        if (todos.length === 0) {
            ans += "empty"
            return ans;
        }
        todos.forEach((todo, i) => {
            let listIdToDisplay = todo.listId?.substring(0, Math.min(3, todo.listId.length));
            ans += `${i}. Id: ${todo.id}; name: ${todo.name}; List: ${listIdToDisplay}\n`
        })
        return ans;
    }

    getHelp(): string {
        return `r - получить все. c - создать. u - обновить`;
    }


}

let consolePresenter = new TodosConsolePresenter();
export default consolePresenter;