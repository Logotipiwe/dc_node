import AbstractStorage from "./abstractStorage";
import MongoStorage from "./instances/mongoStorage";
import MemoryStorage from "./instances/memoryStorage";
import EnvAccessor from "../EnvAccessor";
import {FileStorage} from "./instances/fileStorage";

class StorageFactory {
    static _storages = {
        "MONGO": ()=> new MongoStorage(),
        "MEM": () => new MemoryStorage(),
        "FILE": () => new FileStorage()
    }

    static _instances: {[key: string]: AbstractStorage<any>} = {}

    getStorage(): AbstractStorage<any> {
        const dbType: string = EnvAccessor.getDbType();

        let instance = StorageFactory._instances[dbType];

        if (!instance) {
            instance = StorageFactory._storages[dbType]();
            StorageFactory._instances[dbType] = instance;
        }

        return instance;
    }
}

const factory = new StorageFactory();

export default factory;
