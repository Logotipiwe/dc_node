import mongoAdapter from "./instances/MongoAdapter";
import EnvAccessor from "../EnvAccessor";
import AbstractAdapter from "./AbstractAdapter";
import emptyAdapter from "./instances/EmptyAdapter";

export default class AdapterFactory {
    static _adapters: Record<string, AbstractAdapter<any, any>> = {
        "MONGO": mongoAdapter
    }

    static getAdapter(): AbstractAdapter<any, any> {
        const dbType = EnvAccessor.getDbType();
        let adapter = this._adapters[dbType];
        if (!adapter) return emptyAdapter;
        return adapter;
    }
}