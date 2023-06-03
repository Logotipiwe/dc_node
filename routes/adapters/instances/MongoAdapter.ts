import AbstractAdapter from "../AbstractAdapter";
import {Document, ObjectId, WithId} from "mongodb";
import Entity from "../../model/entities/Entity";

class MongoAdapter extends AbstractAdapter<Entity, WithId<Document>> {
    toDocument(from: Entity): WithId<Document> {
        return {...from, _id: new ObjectId(from.id)};
    }

    toEntity(from: WithId<Document>): Entity {
        let entity = {...from, id: from._id.toString(), userId: from.userId};
        delete entity._id;
        return entity;
    }

}

export default new MongoAdapter();