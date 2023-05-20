import todoService from "../../services/todoService";
import consolePresenter from "./TodosConsolePresenter";
import Todo from "../../model/Todo";

class TodoConsoleController {
    getHelp(): string {
        return "c - create. u - update. d - delete. r - read"
    }

    async processConsole(args: string[]): Promise<string> {
        const s = args[0];
        if (s === "h") {
            return this.getHelp();
        } else if (s === "r") {
            const todos = await todoService.getAll();
            return consolePresenter.printTodos(todos);
        } else if (s === "c") {
            if (!args[1]) return "name empty!"
            const todo = await todoService.create(Todo.create(args[1]));
            return `created todo '${todo.name}'`;
        } else if (s === "u") {
            if (!args[2]) return "name empty!"
            const todo = await todoService.getOne(args[1]);
            todo.name = args[2]
            await todoService.editOne(todo);
            return `UPDATE SUCCESSFUL`;
        } else if(s === "d"){
            let id = args[1];
            if(!id) return "Id empty!";
            const deleted = await todoService.delete(id);
            if (deleted) return "DELETED SUCCESSFULLY"
            else return "DELETING ERROR"
        }

        return this.getHelp();
    }
}

export default new TodoConsoleController();