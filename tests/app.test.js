// import {createTodo, getTodos} from "../routes/service.js";
const {createTodo, getTodos} = require("../routes/service");

test('create todo', async () => {
    const todos = await getTodos();
    const todos2 = await createTodo("lol");
    expect(todos.length+1).toBe(todos2.length);
});