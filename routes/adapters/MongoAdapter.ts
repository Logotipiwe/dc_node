import AbstractAdapter from "./AbstractAdapter";
import Todo from "../model/Todo";
import {Document, ObjectId, WithId} from "mongodb";
import Entity from "../model/Entity";

class MongoAdapter extends AbstractAdapter<Entity, WithId<Document>>{
    toDocument(from: Entity): WithId<Document> {
        return {...from, _id: new ObjectId(from.id)};
    }

    toDocuments(from: Entity[]): WithId<Document>[] {
        return from.map(this.toDocument);
    }

    toEntities(from: WithId<Document>[]): Entity[] {
        let entities = from.map(this.toEntity);
        return entities;
    }

    toEntity(from: WithId<Document>): Entity {
        return {...from, id: from._id.toString()};
    }

}

export default new MongoAdapter();