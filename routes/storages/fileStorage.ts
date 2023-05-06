import fs from "fs";
import AbstractStorage from "./abstractStorage";

export class FileStorage extends AbstractStorage{
    static storageType = "FILE"

    static create(){
        let storage = new FileStorage();
        return storage;
    }

    getStorageType(){
        return FileStorage.storageType;
    }

    getAll() {
        let data = fs.readFileSync('data.json', 'utf8');
        return JSON.parse(data);
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
        this.saveMany(entities);
        return entity;
    }

    saveMany(entities) {
        fs.writeFileSync("data.json", JSON.stringify(entities));
        return entities;
    }

    deleteAll() {
        fs.writeFileSync("data.json", "[]");
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
        // noinspection EqualityComparisonWithCoercionJS
        const entityToChange = entities.find(x => x.id == entity.id);
        if (!entityToChange) throw new Error("no entity found by id " + entity.id);

        const entityToSave = {...entityToChange, ...entity};

        // noinspection UnnecessaryLocalVariableJS
        const saved = this.saveOne(entityToSave);
        return saved;
    }
}