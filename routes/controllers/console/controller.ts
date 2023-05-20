import todoService from "../../todoService";
import {printTodos} from "./consolePresenter";

export class EndConsoleException extends Error {

}
export async function processConsole(input: string): Promise<string> {
    const args = input.split(" ")
    if(args[0] === "end") return "end";
    let s = args[0].toLowerCase();
    if (s === "h") {
        return `r - получить все. c - создать. u - обновить`
    } else if (s === "r") {
        const todos = await todoService.getTodos();
        return printTodos(todos);
    } else if (s === "c") {
        if (!args[1]) return "name empty!"
        const todo = await todoService.createTodo(args[1]);
        return `created todo '${todo.name}'`;
    } else if (s === "u") {
        if (!args[2]) return "name empty!"
        const todo = await todoService.getTodo(args[1]);
        todo.name = args[2]
        await todoService.editTodo(todo);
        return `UPDATE SUCCESSFUL`;
    } else if(s === "d"){
        if(!args[1]) return "Id empty!";
        await todoService.deleteTodo(await todoService.getTodo(args[1]))
        return "DELETED SUCCESSFULLY"
    }
    return "aga";
}