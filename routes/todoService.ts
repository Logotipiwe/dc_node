import Todo from "./model/Todo";
import todosRepo from "./repos/TodosRepo";

class TodoService {
    _repo = todosRepo;
    async createTodo(name) {
        const newTodo = Todo.create(name)
        return await todosRepo.saveOne(newTodo);
    }

    async deleteTodo(todo) {
        return await todosRepo.deleteOne(todo);
    }

    async editTodo(todo): Promise<Todo> {
        return await todosRepo.editOne(todo);
    }

    async getTodo(id: string){
        let todos = await this.getTodos();
        return todos.find(t=>t.id === id);
    }

    async getTodos() {
        return await todosRepo.getAll();
    }
}

export default new TodoService();