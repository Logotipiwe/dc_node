import AbstractStorage from "../abstractStorage";
import Todo from "../../model/Todo";
import e from "express";

export default class MemoryStorage extends AbstractStorage<Object> {
    _data: Object

    constructor() {
        super();
        this._data = {};
    }

    async getAll(table:string) {
        if(!this._data[table]){
            this._data[table] = [];
        }
        return this._data[table];
    }

    async saveOne(table: string, entity: Todo) {
        const entities = await this.getAll(table);
        let indexToSave = entities.findIndex(t => t.id === entity.id);
        if (indexToSave !== -1) {
            entities.splice(indexToSave, 1, entity);
        } else {
            entity.id = entities.length + 1;
            entities.push(entity);
        }
        return entity;
    }

    async saveMany(table: string, entities) {
        entities.map(entity => {
            return this.saveOne(table, entity);
        })
        return entities
    }

    async deleteAll(table: string, ) {
        this._data[table] = [];
    }

    async deleteOne(table: string, entity) {
        const entities = await this.getAll(table);
        const indexToDelete = entities.findIndex(x => x.id == entity.id);
        entities.splice(indexToDelete, 1);
        await this.saveMany(table,entities);
        return true;
    }

    async editOne(table: string, entity) {
        const entities = await this.getAll(table);
        const entityToChange = entities.find(x => x.id == entity.id);
        if (!entityToChange) throw new Error("no entity found by id " + entity.id);

        const entityToSave = {...entityToChange, ...entity};

        const saved = this.saveOne(table,entityToSave);
        return saved;
    }

    getStorageType() {
        return "MEM"
    }
}