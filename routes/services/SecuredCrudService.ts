import CrudService from "./CrudService";
import Entity from "../model/entities/Entity";
import accessControl from "../auth/AccessControl";
import userService from "../auth/UserService";


export default abstract class SecuredCrudService<E extends Entity> extends CrudService<E>{

    async create(newEntity: E): Promise<E> {
        this.handleCreation(newEntity)
        return super.create(newEntity);
    }

    async delete(id: string): Promise<boolean> {
        this.checkAccess(await this.getOneInsecure(id));
        return super.delete(id);
    }

    async editOne(entity: E): Promise<E> {
        this.checkAccess(entity)
        return super.editOne(entity);
    }

    async getOne(id: string): Promise<E> {
        let oneInsecure = await this.getOneInsecure(id);
        this.checkAccess(oneInsecure);
        return oneInsecure;
    }

    async getAll(): Promise<E[]> {
        let all = await super.getAll();
        return all.filter(e=> this.hasAccess(e));
    }

    async getOneInsecure(id: string): Promise<E> {
        return super.getOne(id);
    }

    checkAccess(entity: E){
        if(!this.hasAccess(entity)){
            throw new Error("No access")
        }
    }

    hasAccess(entity: E){
        return accessControl.hasAccessToOne(entity);

    }

    handleCreation(entity: E): void{
        entity.userId = userService.getUser().id;
    }
}
