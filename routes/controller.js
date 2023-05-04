import express from "express";
import {createTodo, deleteTodo, editTodo, getTodos} from "./service.js";
import {editTodoImpl, getTodosImpl} from "./repo";
import {getCreationForm, printTodos} from "./presenter";
const router = express.Router();

router.post("/create", (req, res) => {
    const name = req.body.name
    if(name) {
        createTodo(name);
    }
    res.redirect("/");
});

router.post('/delete/:id', async (req, res) => {
    console.log(req.params.id);
    await deleteTodo(req.body);
    res.redirect("/");
});

router.post('/edit/:id', async (req, res) => {
    await editTodo(req.body);
    res.redirect("/");
});

router.get('/', async function(req, res, next) {
    const json = await getTodos();
    res.send(getCreationForm() + printTodos(json));
});

console.log(process.env.DB)

export default router;