import express from "express";
import listService from "../../services/ListService";
import List from "../../model/entities/List";
const router = express.Router();

router.post("/create", async (req, res) => {
    const name = req.body.name;
    const type = req.body.type === "num" ? "num" : "bullet";
    if(name) {
        await listService.create(List.create(name,type));
    }
    res.redirect("/");
});

router.post('/delete/:id', async (req, res) => {
    await listService.delete(req.params.id);
    res.redirect("/");
});

router.post('/edit/:id', async (req, res) => {
    const id = req.params.id;
    const list = await listService.getOne(id);
    if(req.body.name) list.name = req.body.name;
    if(req.body.type) list.type = req.body.type === "num" ? "num" : "bullet";
    await listService.editOne(list);
    res.redirect("/");
});

export default router;