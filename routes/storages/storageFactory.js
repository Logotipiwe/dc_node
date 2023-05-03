import {FileStorage} from "./fileStorage";
import {MemoryStorage} from "./memoryStorage";

export class StorageFactory {
    static _storages = [
        MemoryStorage, FileStorage
    ]

    getStorage() {
        const dbType = process.env.DB;
        const storageClass = StorageFactory._storages.find(s=>s.storageType === dbType);
        return storageClass.create();
    }
}