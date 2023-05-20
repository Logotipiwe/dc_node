import todoService from "../../services/todoService";
import consolePresenter from "../../presenters/console/TodosConsolePresenter";
import Todo from "../../model/Todo";
import todoConsoleController from "./TodoConsoleController";
import listConsoleController from "./ListConsoleController";


function getHelp() {
    return "Type {ENTITY} C/r/u/d";
}

export async function processConsole(input: string): Promise<string> {
    const args = input.split(" ")
    if(args[0] === "end") return "end";
    let s = args[0].toLowerCase();
    let restArgs = args.splice(1);
    if(s === "todo") {
        return todoConsoleController.processConsole(restArgs);
    } else if (s === "list"){
        return listConsoleController.processConsole(restArgs)
    }
    return getHelp();
}