
export default class EnvAccessor{
    static getDbType(): string {
        return this.tryGetVar("DB")
    }

    static getBaseHost(): string{
        return this.tryGetVar("BASE_HOST")
    }

    static getBasePath(): string {
        try {
            return this.tryGetVar("BASE_PATH")
        } catch (e) {
            return ""
        }
    }

    static getMongoUrl(): string {
        return this.tryGetVar("MONGO_URL");
    }

    static getMongoDbName(): string {
        return this.tryGetVar("MONGO_DB_NAME");
    }

    static tryGetVar(name: string): string{
        if(!process.env[name]){
            throw new Error(`Cannot get ${name} env variable. Maybe it's not set!`)
        }
        return process.env[name];
    }

    static ensureNecessaryVars() {
        this.getBaseHost();
        this.getDbType();
    }
}