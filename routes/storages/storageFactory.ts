
import {FileStorage} from "./fileStorage";
import {MemoryStorage} from "./memoryStorage";
import MongoStorage from "./mongoStorage";

class StorageFactory {
    static _storages = [
        MemoryStorage,
        FileStorage,
        MongoStorage
    ]

    static _instances = {}



    getStorage() {
        const dbType: string = StorageFactory.getDbType();
        const storageClass = StorageFactory._storages.find(s=>s.storageType === dbType);
        let instance = StorageFactory._instances[dbType];

        if(!instance) {
            instance = storageClass.create();
            StorageFactory._instances[dbType] = instance
        }

        return instance;
    }

    private static getDbType(): string {
        return process.env.DB || "";
    }
}

const factory = new StorageFactory();

export default factory;