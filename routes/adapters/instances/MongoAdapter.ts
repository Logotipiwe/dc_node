import AbstractAdapter from "../AbstractAdapter";
import Todo from "../../model/Todo";
import {Document, ObjectId, WithId} from "mongodb";
import Entity from "../../model/Entity";

class MongoAdapter extends AbstractAdapter<Entity, WithId<Document>>{
    toDocument(from: Entity): WithId<Document> {
        return {...from, _id: new ObjectId(from.id)};
    }

    toEntity(from: WithId<Document>): Entity {
        let entity = {...from, id: from._id.toString()};
        delete entity._id;
        return entity;
    }

}

export default new MongoAdapter();