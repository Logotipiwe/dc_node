export default abstract class AbstractAdapter<EntityType, DocType>{
    toDocuments(from: EntityType[]): DocType[] {
        return from.map(this.toDocument);
    }

    abstract toDocument(from: EntityType): DocType

    toEntities(from: DocType[]): EntityType[] {
        return from.map(this.toEntity)
    }

    abstract toEntity(from: DocType): EntityType
}