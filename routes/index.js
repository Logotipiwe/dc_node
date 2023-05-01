import express from "express";
const router = express.Router();
import {getCreationForm, printTodos} from "./presenter.js";
import {getTodos} from "./service.js";

router.get('/', async function(req, res, next) {
  const b = await new Promise((resolve, reject) => resolve(1));

  const a = await getTodos();
  console.log(a);
  getTodos().then(json => {
    res.send(getCreationForm() + printTodos(json));
  });
});

export default router;
