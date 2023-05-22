import express from "express";
import {getCreationForm, printTodos} from "../../presenters/web/webPresenter";
import todoService from "../../services/todoService";
import listService from "../../services/ListService";
import List from "../../model/List";
const router = express.Router();

router.post("/lists/create", async (req, res) => {
    const name = req.body.name;
    const type = req.body.type === "num" ? "num" : "bullet";
    if(name) {
        await listService.create(List.create(name,type));
    }
    res.redirect("/");
});

router.post('/lists/delete/:id', async (req, res) => {
    await listService.delete(req.params.id);
    res.redirect("/");
});

router.post('/lists/edit/:id', async (req, res) => {
    const id = req.params.id;
    const list = await listService.getOne(id);
    if(req.body.name) list.name = req.body.name;
    if(req.body.type) list.type = req.body.type === "num" ? "num" : "bullet";
    await listService.editOne(list);
    res.redirect("/");
});

// router.get('lists/', async function(req, res, next) {
//     const json = await listService.getAll();
//     res.send(getCreationForm() + printTodos(json));
// });

// console.log(process.env.DB)

export default router;