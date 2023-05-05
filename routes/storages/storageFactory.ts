
import {FileStorage} from "./fileStorage";
import {MemoryStorage} from "./memoryStorage";
import MongoStorage from "./mongoStorage";

class StorageFactory {
    static _storages = [
        MemoryStorage,
        FileStorage,
        MongoStorage
    ]

    static _instances: {[x: number]: string} = {}

    getStorage() {
        const dbType = process.env.DB;
        const storageClass = StorageFactory._storages.find(s=>s.storageType === dbType);
        let instance = StorageFactory._instances[storageClass];

        if(!instance) {
            instance = storageClass.create();
            StorageFactory._instances[storageClass] = instance
        }

        return instance;
    }
}

const factory = new StorageFactory();

export default factory;