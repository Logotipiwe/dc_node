import {Identifiable} from "./entities/Identifiable";

export default class User implements Identifiable {
    constructor(id, name) {
        this._id = id;
        this._name = name;
    }

    private _id: string

    get id(): string {
        return this._id;
    }

    set id(value: string) {
        this._id = value;
    }

    private _name: string

    get name(): string {
        return this._name;
    }

    set name(value: string) {
        this._name = value;
    }

}