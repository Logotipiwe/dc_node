class TodoTranspiler {
    constructor() {
        this._transpilers = {
            "MONGO": {
                toObject: todo => {
                    todo.id = todo._id.toString();
                    return todo;
                },
                toRelation: todo => {
                    todo._id = todo.id;
                    return todo;
                }
            }
        };
        this.toObject = this.toObject.bind(this);
    }
    toObject(todo) {
        var _a;
        const mapper = (_a = this._transpilers[todo.savedBy]) === null || _a === void 0 ? void 0 : _a.toObject;
        if (mapper) {
            return mapper(Object.assign({}, todo));
        }
        else {
            return todo;
        }
    }
    toRelation(todo) {
        var _a;
        const mapper = (_a = this._transpilers[todo.savedBy]) === null || _a === void 0 ? void 0 : _a.toRelation;
        if (mapper) {
            return mapper(Object.assign({}, todo));
        }
        else {
            return todo;
        }
    }
}
export default new TodoTranspiler();
