import AbstractStorage from "../abstractStorage";
import {Db, Document, MongoClient, WithId} from "mongodb";
import EnvAccessor from "../../EnvAccessor";

export default class MongoStorage extends AbstractStorage<WithId<Document>> {
    static storageType = "MONGO"
    _client: Db

    constructor() {
        super();
        const client = new MongoClient(EnvAccessor.getMongoUrl());
        const db = client.db(EnvAccessor.getMongoDbName());
        this._client = db;
        db.command({connectionStatus: 1, showPrivileges: false}).then(res => {
            console.log("Mongo connection result:")
            console.log(res)
        })
    }

    getStorageType() {
        return MongoStorage.storageType;
    }

    async getAll(table: string) {
        const collection = this._client.collection(table);
        return await collection.find().toArray();
    }

    async saveOne(table: string, entity: WithId<Document>) {
        const collection = this._client.collection(table);
        await collection.insertOne(entity)
        return entity
    }

    async saveMany(table: string, entities) {
        const collection = this._client.collection(table);
        await collection.insertMany(entities);
        return entities;
    }

    async deleteAll(table: string) {
        const collection = this._client.collection(table);
        await collection.deleteMany()
    }

    async deleteOne(table: string, entity: WithId<Document>) {
        const collection = this._client.collection(table);
        await collection.deleteOne({_id: entity._id})
    }

    async editOne(table: string, entity: WithId<Document>) {
        const collection = this._client.collection(table);
        await collection.updateOne({_id: entity._id}, {$set: entity})
        return entity;
    }

    async closeConnection() {
        // await this._client..close();
    }
}