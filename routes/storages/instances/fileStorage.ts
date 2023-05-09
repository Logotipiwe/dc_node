import fs from 'fs';
import AbstractStorage from "../abstractStorage";

export class FileStorage extends AbstractStorage<Object>{

    getAll(table:string) {
        let data = fs.readFileSync('data.json', 'utf8');
        return JSON.parse(data)[table];
    }

    saveOne(table: string, entity) {
        const entities = this.getAll(table);
        let indexToSave = entities.findIndex(t => t.id === entity.id);
        if (indexToSave !== -1) {
            entities.splice(indexToSave, 1, entity);
        } else {
            entity.id = entities.length + 1;
            entities.push(entity);
        }
        this.saveMany(table, entities);
        return entity;
    }

    saveMany(table: string, entities) {
        fs.writeFileSync("data.json", JSON.stringify(entities));
        return entities;
    }

    deleteAll(table:string) {
        fs.writeFileSync("data.json", "{}");
    }

    deleteOne(table: string, entity) {
        const entities = this.getAll(table);
        const indexToDelete = entities.findIndex(x => x.id == entity.id);
        entities.splice(indexToDelete, 1);
        this.saveMany(table, entities);
        return true;
    }

    editOne(table:string, entity: any) {
        const entities = this.getAll(table);
        // noinspection EqualityComparisonWithCoercionJS
        const entityToChange = entities.find(x => x.id == entity.id);
        if (!entityToChange) throw new Error("no entity found by id " + entity.id);

        const entityToSave = {...entityToChange, ...entity};

        // noinspection UnnecessaryLocalVariableJS
        const saved = this.saveOne(table, entityToSave);
        return saved;
    }

    getStorageType() {
        return "FILE"
    }
}