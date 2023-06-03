class TodoTranspiler {
    _transpilers;

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
        }
        this.toObject = this.toObject.bind(this);
    }

    toObject(todo) {
        const mapper = this._transpilers[todo.savedBy]?.toObject;
        if (mapper) {
            return mapper(Object.assign({}, todo));
        } else {
            return todo;
        }
    }

    toRelation(todo) {
        const mapper = this._transpilers[todo.savedBy]?.toRelation;
        if (mapper) {
            return mapper(Object.assign({}, todo));
        } else {
            return todo;
        }
    }
}

export default new TodoTranspiler();