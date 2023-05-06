import AbstractStorage from "./abstractStorage";
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

    async getAll() {
        return await this._client.find().toArray();
    }

    async saveOne(entity) {
        await this._client.insertOne(entity)
        return entity
    }

    async saveMany(entities) {
        await this._client.insertMany(entities);
        return entities;
    }

    async deleteAll() {
        await this._client.deleteMany()
    }

    async deleteOne(entity) {
        await this._client.deleteOne({_id: entity._id})
    }

    async editOne(entity) {
        await this._client.updateOne({_id: entity._id}, {$set: entity})
        return entity;
    }

    async closeConnection(){
        await this._client.close();
    }
}