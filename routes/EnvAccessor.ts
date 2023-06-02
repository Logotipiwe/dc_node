
export default class EnvAccessor{
    static getDbType(): string {
        return this.tryGetVar("DB")
    }

    static getBaseUrl(): string{
        return this.tryGetVar("BASE")
    }

    static getMongoUrl(): string {
        return this.tryGetVar("MONGO_URL");
    }

    static tryGetVar(name: string): string{
        if(!process.env[name]){
            throw new Error(`Cannot get ${name} env variable. Maybe it's not set!`)
        }
        return process.env[name];
    }

    static ensureNecessaryVars() {
        this.getBaseUrl();
        this.getDbType();
    }
}