export default abstract class AbstractTranspiler<EntityType, DocType> {
    abstract toDocuments(from: EntityType[]): DocType[]

    abstract toDocument(from: EntityType): DocType

    abstract toEntities(from: DocType[]): EntityType[]

    abstract toEntity(from: DocType): EntityType
}