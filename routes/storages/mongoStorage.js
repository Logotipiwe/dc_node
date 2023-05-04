import AbstractStorage from "./storage";
import {MongoClient} from "mongodb";

export default class MongoStorage extends AbstractStorage {
    static storageType = "MONGO"
    constructor() {
        super();
        this._client = new MongoClient("mongodb://root:example@localhost:27017/")
            .db("db").collection('col');
    }

    _client

    static create(){
        return new MongoStorage();
    }

    getStorageType(){
        return MongoStorage.storageType;
    }

    async getTodos() {
        return await this._client.find().toArray();
    }

    async saveTodo(todo) {
        await this._client.insertOne(todo);
        return todo;
    }

    async saveTodos(todos) {
        await this._client.insertMany(todos);
        // await new Promise(resolve => setTimeout(resolve,500))
        return todos;
    }

    async clearTodos() {
        await this._client.deleteMany()
    }

    async deleteTodo(todo) {
        await this._client.deleteOne({_id: todo._id})
        // await new Promise(resolve => setTimeout(resolve,200))
    }

    async editTodo(todo) {
        await this._client.updateOne({_id: todo._id}, {$set: todo})
        // await new Promise(resolve => setTimeout(resolve,200))
        return todo;
    }

    async closeConnection(){
        await this._client.close();
    }
}