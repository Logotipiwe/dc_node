import AbstractConsoleController from "../../presenters/AbstractConsoleController";
import listService from "../../services/ListService";
import listsConsolePresenter from "../../presenters/console/ListsConsolePresenter";
import List from "../../model/entities/List";


class ListConsoleController extends AbstractConsoleController {
    async processConsole(args: string[]): Promise<string> {
        const action = args[0];
        if (action === "r") {
            const lists = await listService.getAll()
            if (lists.length === 0) return "EMPTY"
            return listsConsolePresenter.printLists(lists)
        } else if (action === "c") {
            const listName = args[1];
            const listType = args[2] === "num" ? "num" : "bullet"
            const list = await listService.create(
                List.create(args[1], listType));
            return `LIST ${list.id} CREATED!`
        } else if (action === "d") {
            const idToDelete = args[1];
            await listService.delete(idToDelete)
            return `DELETED ${idToDelete}!`
        } else if (action === "da") {
            await listService.deleteAll();
            return "DELETED ALL!";
        }
        return this.getHelp();
    }

    getHelp() {
        return "crud epta";
    }

}

export default new ListConsoleController()