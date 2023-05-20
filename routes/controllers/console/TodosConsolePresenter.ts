import Todo from "../../model/Todo";

class TodosConsolePresenter {
    printTodos(todos: Todo[]) {
        let ans = "TODOS: \n";
        if (todos.length === 0) {
            ans += "empty"
            return ans;
        }
        todos.forEach((todo, i) => {
            ans += `${i}. Id: ${todo.id}; name: ${todo.name}\n`
        })
        return ans;
    }
    getHelp(): string{
        return `r - получить все. c - создать. u - обновить`;
    }


}

let consolePresenter = new TodosConsolePresenter();
export default consolePresenter;