import storageFactory from "./storages/storageFactory";
import MongoStorage from "./storages/instances/mongoStorage";
import MemoryStorage from "./storages/instances/memoryStorage";
import {MongoClient, ObjectId} from "mongodb";
import todosRepo from "./repos/TodosRepo";

describe("first", () => {
    test("mongo stor", () => {
        process.env.DB = "MONGO"
        const storage = storageFactory.getStorage();
        expect(storage).toBeInstanceOf(MongoStorage)
    })
    test("mem stor", () => {
        process.env.DB = "MEM"
        const storage = storageFactory.getStorage();
        expect(storage).toBeInstanceOf(MemoryStorage)
    })
    test("mongo itself", async () => {
        const db = new MongoClient("mongodb://root:example@localhost:27017/").db("db");
        const db1 = db.collection("todos");
        const res = await db1.insertOne({_id: new ObjectId("agggggggggaa"), name: "BBBBB"})
        console.log(res)
        const all = await db1.find().toArray();
        expect(all.length).toBeGreaterThan(0)
    })
    test("todos table", async () => {
        process.env.DB = "MONGO"
        const all = await todosRepo.getAll();
        console.log(all)
        expect(all.length).toBeGreaterThan(0)
    })
})