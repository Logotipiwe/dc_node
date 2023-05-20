import express from "express";
import {getCreationForm, printTodos} from "../../presenters/web/webPresenter";
import todoService from "../../services/todoService";
const router = express.Router();

router.post("/create", async (req, res) => {
    const name = req.body.name
    if(name) {
        await todoService.create(name);
    }
    res.redirect("/");
});

router.post('/delete/:id', async (req, res) => {
    console.log(req.params.id);
    await todoService.delete(req.body);
    res.redirect("/");
});

router.post('/edit/:id', async (req, res) => {
    const id = req.params.id;
    await todoService.editOne({...req.body, id});
    res.redirect("/");
});

router.get('/', async function(req, res, next) {
    const json = await todoService.getAll();
    res.send(getCreationForm() + printTodos(json));
});

console.log(process.env.DB)

export default router;