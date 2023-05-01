import express from "express";
import {createTodo} from "./service.js";
const router = express.Router();

router.post("/create", (req, res) => {
    const name = req.body.name
    if(name) {
        createTodo(req.body.name).then(todos => {
            res.redirect("/");
        })
    } else {
        res.redirect("/");
    }
})

export default router;