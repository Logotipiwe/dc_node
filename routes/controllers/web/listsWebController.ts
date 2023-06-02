import express from "express";
import listService from "../../services/ListService";
import List from "../../model/entities/List";
const router = express.Router();

router.post("/create", async (req, res, next) => {
    try {
        const name = req.body.name;
        const type = req.body.type === "num" ? "num" : "bullet";
        if (name) {
            await listService.create(List.create(name, type));
        }
        res.redirect("/");
    } catch (e) {
        next(e)
    }
});

router.post('/delete/:id', async (req, res, next) => {
    try {
        await listService.delete(req.params.id);
        res.redirect("/");
    } catch (e) {
        next(e)
    }
});

router.post('/edit/:id', async (req, res, next) => {
    try {
        const id = req.params.id;
        const list = await listService.getOne(id);
        list.edit(req.body);
        const edited = await listService.editOne(list);
        res.redirect("/");
    } catch (e) {
        next(e)
    }
});

export default router;