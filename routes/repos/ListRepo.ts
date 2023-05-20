import AbstractRepo from "./AbstractRepo";
import List from "../model/List";
import Tables from "../model/Tables";


class ListRepo extends AbstractRepo<List>{
    getTable(): string {
        return Tables.LISTS;
    }

};


export default new ListRepo()