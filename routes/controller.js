import express from "express";
import {createTodo, deleteTodo} from "./service.js";
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

router.post('/delete/:id', (req, res) => {
    console.log(req.params.id);
    deleteTodo(req.params.id);
    res.redirect("/");
});

router.post('/edit/:id', (req, res) => {
    editTodoImpl(req.params.id, req.body.name);
    res.redirect("/");
});

router.get('/', async function(req, res, next) {
    const json = getTodosImpl();
    res.send(getCreationForm() + printTodos(json));
});

console.log(process.env.DB)

export default router;