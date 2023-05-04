
class TodoTranspiler{
    constructor() {
        this._transpilers = {
            "MONGO": todo=>{
                todo.id = todo._id.toString();
                return todo;
            }
        }
        this.toObject = this.toObject.bind(this);
    }

    _transpilers;

    toObject(todo){
        const mapper = this._transpilers[todo.savedBy];
        if(mapper){
           return mapper(todo);
        } else {
            return todo;
        }
    }
}

export default new TodoTranspiler();