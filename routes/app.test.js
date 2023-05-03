import {createTodo, deleteTodo, editTodo, getTodos} from "./service.js";
import {clearTodos} from "./repo";

beforeEach(()=>{
    clearTodos();
});

test('init todos = 0',  () => {
    const todos = getTodos();
    expect(todos.length).toBe(0);
});

test('create todo',  () => {
    let newName = "lol";
    const newTodo = createTodo(newName);
    const todos = getTodos();
    expect(todos.length).toBe(1);

    const newTodo2 = createTodo(newName);
    const todos2 = getTodos();
    expect(todos2.length).toBe(2);
});

test('delete todo',  () => {
    const newName = "AAAAA";
    const newTodo = createTodo(newName);
    const newTodo2 = createTodo(newName);
    deleteTodo(newTodo2.id);
    const list = getTodos();
    expect(list.length).toBe(1);
});

test('delete exactly needed todo', ()=>{
    const name = "name";
    createTodo(name)
    const todo2 = createTodo(name)
    createTodo(name)
    const todos = getTodos()
    deleteTodo(todo2.id)
    const todos2 = getTodos()
    const todosWithout2 = todos.filter(t=>t.id!==todo2.id);
    expect(todosWithout2).toEqual(todos2);
})

test("todos editing",  ()=>{
    const name1 = "name1";
    const name2 = "name2";
    const todo1 = createTodo(name1);
    const todo2 = createTodo(name1);
    const todo3 = createTodo(name1);

    const todo1edited = editTodo(todo1.id, name2);

    expect(todo1edited.name).toBe(name2);

    editTodo(todo2.id, name2);
    editTodo(todo3.id, name2);

    const todos = getTodos();

    const eachChanged = todos.every(t=>t.name === name2);
    expect(todos[0].name).toBe(name2);
    expect(eachChanged).toBeTruthy();
});

afterAll(()=>{
    clearTodos()
})