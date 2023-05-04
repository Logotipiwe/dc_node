import factory from "./storages/storageFactory";
import {createTodo, deleteTodo, editTodo, getTodos} from "./service.js";
import {clearTodos} from "./repo";
import MongoStorage from "./storages/mongoStorage";


describe("mongo storage", () => {
    beforeEach(() => {
        process.env.DB = "MONGO";
    })

    test("creates", () => {
        const storage = factory.getStorage();
        expect(storage.getStorageType()).toBe("MONGO")
    })
})

describe.each(["FILE", "MEM", "MONGO"])(
    "with storage %p", (storageType) => {
        beforeEach(() => {
            process.env.DB = storageType;
        })
        afterAll(async () => {
            const storage = factory.getStorage();
            if (storage instanceof MongoStorage) {
                await storage.closeConnection();
            }
        })
        describe("storage", () => {
            test('type check', () => {
                const storage = factory.getStorage();
                expect(storage.getStorageType()).toBe(storageType)
            })
        })
        describe("transpiler works", () => {
            test('after creation', async () => {
                const name = "name";
                const todo1 = await createTodo(name);
                expect(Object.keys(todo1)).toContain('id')
                expect(todo1.id).toBeTruthy()
                expect(Object.keys(todo1)).toContain('name')
            });
        })
        describe('crud', () => {
            beforeEach(async () => {
                await clearTodos();
            });
            test('init todos = 0', async () => {
                const todos = await getTodos();
                expect(todos.length).toBe(0);
            });

            test('create todo', async () => {
                let newName = "lol";
                const newTodo = await createTodo(newName);
                const todos = await getTodos();
                expect(todos.length).toBe(1);

                const newTodo2 = await createTodo(newName);
                const todos2 = await getTodos();
                expect(todos2.length).toBe(2);
            });

            test('delete todo with await', async () => {
                const newName = "AAAAA";
                const newTodo = await createTodo(newName);
                const newTodo2 = await createTodo(newName);
                await deleteTodo(newTodo2);
                const list = await getTodos();
                await expect(list.length).toBe(1);
            });

            test('delete exactly needed todo', async () => {
                const name = "name";
                const todo1 = await createTodo(name)
                const todo2 = await createTodo(name)
                const todo3 = await createTodo(name)
                const todos = await getTodos()
                await expect(todos.length).toBe(3)
                await deleteTodo(todo2)
                const todos2 = await getTodos()
                await expect(todos2.length).toBe(2)
                const todosWithout2 = todos.filter(t => t.id !== todo2.id);
                await expect(todosWithout2).toEqual(todos2);
            })

            test("todos editing", async () => {
                const name1 = "name1";
                const name2 = "name2";
                const todo1 = await createTodo(name1);
                const todo2 = await createTodo(name1);
                const todo3 = await createTodo(name1);
                const todo1edited = await editTodo({...todo1, name: name2});
                expect(todo1edited.name).toBe(name2);
                await editTodo({...todo2, name: name2});
                await editTodo({...todo3, name: name2});

                const todos = await getTodos();

                const eachChanged = todos.every(t => t.name === name2);
                expect(todos[0].name).toBe(name2);
                expect(eachChanged).toBeTruthy();
            });

            afterAll(async () => {
                await clearTodos()
            })
        })
    })