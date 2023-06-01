import Entity from "../model/entities/Entity";
import factory from "../storages/storageFactory";
import AdapterFactory from "../adapters/AdapterFactory";
import AbstractStorage from "../storages/abstractStorage";
import userService from "../auth/UserService";
import e from "express";
export default abstract class AbstractRepo<T extends Entity>{

    abstract getTable(): string;
    async getAll(): Promise<T[]>{
        const storage = factory.getStorage();
        const documents = await storage.getAll(this.getTable());
        const entityAdapter = AdapterFactory.getAdapter();
        return entityAdapter.toEntities(documents);
    }

    async getOne(id: string): Promise<T> {
        const storage: AbstractStorage<T> = factory.getStorage();
        const documents = await storage.getAll(this.getTable());
        const entityAdapter = AdapterFactory.getAdapter();
        const entities: T[] =  entityAdapter.toEntities(documents);
        return entities.find(e=>e.id === id);
    }
    async saveOne(entity: T): Promise<T>{
        const storage = factory.getStorage();
        this.handleCreation(entity)
        const entityAdapter = AdapterFactory.getAdapter();
        const savedTodo = await storage.saveOne(this.getTable(), entityAdapter.toDocument(entity));
        return entityAdapter.toEntity(savedTodo);
    }
    async saveMany(entities: T[]): Promise<T[]>{
        const storage = factory.getStorage();
        entities.forEach(this.handleCreation)
        const entityAdapter = AdapterFactory.getAdapter();
        const saved = await storage.saveMany(this.getTable(), entityAdapter.toDocuments(entities));
        return entityAdapter.toEntities(saved);
    }
    async deleteAll(): Promise<boolean>{
        await factory.getStorage().deleteAll(this.getTable());
        return true;
    }
    async deleteOne(id: string): Promise<boolean>{
        const toDelete = await this.getOne(id);
        const adapter = AdapterFactory.getAdapter()
        await factory.getStorage().deleteOne(this.getTable(), adapter.toDocument(toDelete))
        return true
    }
    async editOne(entity: T): Promise<T>{
        const adapter = AdapterFactory.getAdapter()
        return await factory.getStorage().editOne(this.getTable(), adapter.toDocument(entity))
    }

    handleCreation(entity: T): void{
        entity.userId = userService.getUser().id;
    }
}