import todoService from "../../services/todoService";
import consolePresenter from "./TodosConsolePresenter";
import Todo from "../../model/Todo";
import todoConsoleController from "./TodoConsoleController";


function getHelp() {
    return "Type {ENTITY} C/r/u/d";
}

export async function processConsole(input: string): Promise<string> {
    const args = input.split(" ")
    if(args[0] === "end") return "end";
    let s = args[0].toLowerCase();
    if(s === "todo") {
        return todoConsoleController.processConsole(args.splice(1));
    // } else if (s === "list"){
        //     return
    }
    return getHelp();
}