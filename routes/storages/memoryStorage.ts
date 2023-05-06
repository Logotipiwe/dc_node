import AbstractStorage from "./abstractStorage";

export class MemoryStorage extends AbstractStorage {
    _data;
    static storageType = "MEM"

    constructor() {
        super();
        this._data = [];
    }

    static create(){
        let storage = new MemoryStorage();
        return storage;
    }

    getStorageType(){
        return MemoryStorage.storageType;
    }

    getAll() {
        return this._data;
    }

    saveOne(entity) {
        const entities = this.getAll();
        let indexToSave = entities.findIndex(t => t.id === entity.id);
        if (indexToSave !== -1) {
            entities.splice(indexToSave, 1, entity);
        } else {
            entity.id = entities.length + 1;
            entities.push(entity);
        }
        return entity;
    }

    saveMany(entities) {
        this._data = [...entities];
        return this._data;
    }

    deleteAll() {
        this._data = [];
    }

    deleteOne(entity) {
        const entities = this.getAll();
        const indexToDelete = entities.findIndex(x => x.id == entity.id);
        entities.splice(indexToDelete, 1);
        this.saveMany(entities);
        return true;
    }

    editOne(entity) {
        const entities = this.getAll();
        const entityToChange = entities.find(x => x.id == entity.id);
        if (!entityToChange) throw new Error("no entity found by id " + entity.id);

        const entityToSave = {...entityToChange, ...entity};

        const saved = this.saveOne(entityToSave);
        return saved;
    }
}