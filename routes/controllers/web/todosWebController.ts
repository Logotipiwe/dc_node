import express from "express";
import todoService from "../../services/TodoService";
import Todo from "../../model/entities/Todo";
import listsPresenter from "../../presenters/web/ListsPresenter";
import todosPresenter from "../../presenters/web/TodosPresenter";

const router = express.Router();

router.post("/create", async (req, res, next) => {
    try {
        const name = req.body.name
        const list = req.body.list;
        if (name) {
            const todo = Todo.create(name, list)
            await todoService.create(todo);
        }
        res.redirect("/");
    } catch (e) {
        next(e)
    }
});

router.post('/delete/:id', async (req, res, next) => {
    try {
        console.log("Deleting: " + req.params.id);
        await todoService.delete(req.body);
        res.redirect("/");
    } catch (e) {
        next(e)
    }
});

router.post('/edit/:id', async (req, res, next) => {
    try {
        const id = req.params.id;
        const todo = await todoService.getOne(id);
        todo.edit(req.body)
        const edited = await todoService.editOne(todo);
        res.redirect("/");
    } catch (e) {
        next(e)
    }
});

router.get('/', async function (req, res, next) {
    try {
        const todos = await todoService.getAll();
        res.send(listsPresenter.creationForm() + todosPresenter.printTodos(todos));
    } catch (e) {
        next(e)
    }
});

export default router;