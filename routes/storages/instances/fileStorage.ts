import * as fs from 'fs';
import AbstractStorage from "../abstractStorage";
import Entity from "../../model/Entity";
import e from "express";

export class FileStorage extends AbstractStorage<Entity>{
    private getDataFromFile(){
        return JSON.parse(fs.readFileSync('data.json', 'utf8'));
    }

    private saveDataToFile(data: Entity){
        return fs.writeFileSync("data.json", JSON.stringify(data));
    }

    async getAll(table:string) {
        let json = this.getDataFromFile();
        if(!json[table]){
            json[table] = [];
        }
        return json[table];
    }

    async saveOne(table: string, entity) {
        let savedEntities = await this.saveMany(table, [entity]);
        return savedEntities[0];
    }

    async saveMany(table: string, entities: Entity[]) {
        const data = this.getDataFromFile();
        if(!data[table]){
            data[table] = []
        }
        const existing: Entity[] = data[table];
        entities.forEach(toSave=>{
            let indexToSave = existing.findIndex(t => t.id === toSave.id);
            if (indexToSave !== -1) {
                existing.splice(indexToSave, 1, toSave);
            } else {
                toSave.id = existing.length + 1;
                existing.push(toSave);
            }
        })
        this.saveDataToFile(data);

        return entities;
    }

    async deleteAll(table:string) {
        const data = this.getDataFromFile();
        data[table] = []
        this.saveDataToFile(data);
        return true;
    }

    async deleteOne(table: string, entity) {
        const data = this.getDataFromFile();
        const entities = data[table];
        const indexToDelete = entities.findIndex(x => x.id == entity.id);
        entities.splice(indexToDelete, 1);
        this.saveDataToFile(data)
        return true;
    }

    async editOne(table:string, entity: Entity) {
        return this.saveOne(table, entity)
    }

    getStorageType() {
        return "FILE"
    }
}