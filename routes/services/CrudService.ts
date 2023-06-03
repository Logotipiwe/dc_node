import Entity from "../model/entities/Entity";
import AbstractRepo from "../repos/AbstractRepo";

export default abstract class CrudService<E extends Entity> {
    abstract getRepo(): AbstractRepo<E>


    async create(newEntity: E): Promise<E> {
        return await this.getRepo().saveOne(newEntity);
    }

    async delete(id: string): Promise<boolean> {
        return await this.getRepo().deleteOne(id);
    }

    async editOne(entity: E): Promise<E> {
        return await this.getRepo().editOne(entity);
    }

    async getOne(id: string): Promise<E> {
        let entities = await this.getAll();
        return entities.find(t => t.id === id);
    }

    async getAll(): Promise<E[]> {
        return await this.getRepo().getAll();
    }

    async deleteAll() {
        await this.getRepo().deleteAll();
    }
}
