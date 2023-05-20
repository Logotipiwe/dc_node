import express from "express";
import {getCreationForm, printTodos} from "./presenter";
import todoService from "../../todoService";
const router = express.Router();

router.post("/create", async (req, res) => {
    const name = req.body.name
    if(name) {
        await todoService.createTodo(name);
    }
    res.redirect("/");
});

router.post('/delete/:id', async (req, res) => {
    console.log(req.params.id);
    await todoService.deleteTodo(req.body);
    res.redirect("/");
});

router.post('/edit/:id', async (req, res) => {
    const id = req.params.id;
    await todoService.editTodo({...req.body, id});
    res.redirect("/");
});

router.get('/', async function(req, res, next) {
    const json = await todoService.getTodos();
    res.send(getCreationForm() + printTodos(json));
});

console.log(process.env.DB)

export default router;