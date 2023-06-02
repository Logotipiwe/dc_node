import express from "express";
import {getIndex} from "../../presenters/web/webPresenter";
import listService from "../../services/ListService";
const router = express.Router();

router.get('/', async function(req, res, next) {
    res.send(await getIndex());
});

console.log(process.env.DB)

export default router;