import Entity from "../model/entities/Entity";
import userService from "./UserService";

class AccessControl{
    hasAccessToOne(entity: Entity){
        const user = userService.getUser();
        return user.id === entity.userId;
    }

    filterMany(entities: Entity[]): Entity[] {
        const user = userService.getUser();
        return entities.filter(e=> e.userId === user.id)
    }
}

export default new AccessControl()