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
        console.log(req.params.id);
        await todoService.delete(req.body);
        res.redirect("/");
    } catch (e) {
        next(e)
    }
});

router.post('/edit/:id', async (req, res) => {
    const id = req.params.id;
    await todoService.editOne({...req.body, id});
    res.redirect("/");
});

router.get('/', async function(req, res, next) {
    const todos = await todoService.getAll();
    res.send(listsPresenter.creationForm() + todosPresenter.printTodos(todos));
});

console.log(process.env.DB)

export default router;