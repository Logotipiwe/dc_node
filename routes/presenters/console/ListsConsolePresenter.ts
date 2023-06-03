import List from "../../model/entities/List";
import Todo from "../../model/entities/Todo";


class ListsConsolePresenter {
    printLists(lists: List[]): string {
        let res = "";
        lists.forEach((list, i) => {
            res += this.printList(list, i)
        })
        return res;
    }

    printList(list, i) {
        let res = `${i}. List ${list.id}:${list.name}. Todos: \n`;
        if (list.todos.length === 0) res += "NO TODOS\n";
        list.todos.forEach((todo: Todo, i) => {
            const point = list.type === "num" ? `${i} ` : "* ";
            res += `${point}. Id:${todo.id}; Name: ${todo.name}\n`
        })
        return res;
    };
}

export default new ListsConsolePresenter();