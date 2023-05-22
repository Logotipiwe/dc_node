import express from "express";
import {getIndex} from "../../presenters/web/webPresenter";
import listService from "../../services/ListService";
const router = express.Router();

router.get('/', async function(req, res, next) {
    const lists = await listService.getAll();
    res.send(getIndex(lists));
});

console.log(process.env.DB)

export default router;