import Entity from "../model/Entity";
import factory from "../storages/storageFactory";
import AdapterFactory from "../adapters/AdapterFactory";
export default abstract class AbstractRepo<T extends Entity>{

    abstract getTable(): string;
    async getAll(): Promise<T[]>{
        const storage = factory.getStorage();
        const documents = await storage.getAll(this.getTable());
        const entityAdapter = AdapterFactory.getAdapter();
        return entityAdapter.toEntities(documents);
    }
    async saveOne(entity: T): Promise<T>{
        const storage = factory.getStorage();
        const entityAdapter = AdapterFactory.getAdapter();
        const savedTodo = await storage.saveOne(this.getTable(), entityAdapter.toDocument(entity));
        return entityAdapter.toEntity(savedTodo);
    }
    async saveMany(entities: T[]): Promise<T[]>{
        const storage = factory.getStorage();
        const entityAdapter = AdapterFactory.getAdapter();
        const saved = await storage.saveMany(this.getTable(), entityAdapter.toDocuments(entities));
        return entityAdapter.toEntities(saved);
    }
    async deleteAll(): Promise<boolean>{
        await factory.getStorage().deleteAll(this.getTable());
        return true;
    }
    async deleteOne(entity: T): Promise<boolean>{
        const adapter = AdapterFactory.getAdapter()
        await factory.getStorage().deleteOne(this.getTable(), adapter.toDocument(entity))
        return true
    }
    async editOne(entity: T): Promise<T>{
        const adapter = AdapterFactory.getAdapter()
        return await factory.getStorage().editOne(this.getTable(), adapter.toDocument(entity))
    }
}