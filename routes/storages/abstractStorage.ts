export default abstract class AbstractStorage<T> {
    static create<T extends AbstractStorage<any>>(this: { new(): T }) {
        return new this();
    }

    abstract getStorageType()

    abstract getAll(table: string): Promise<T[]>

    abstract saveOne(table: string, entity: T): Promise<T>

    abstract saveMany(table: string, entities: T[]): Promise<T[]>

    abstract deleteAll(table: string)

    abstract deleteOne(table: string, entity: T)

    abstract editOne(table: string, entity: T): Promise<T>
}