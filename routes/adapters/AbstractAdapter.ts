

export default abstract class AbstractAdapter<EntityType, DocType>{
    abstract toDocuments(from: EntityType[]): DocType[]
    abstract toDocument(from: EntityType): DocType
    abstract toEntities(from: DocType[]): EntityType[]
    abstract toEntity(from: DocType): EntityType
}