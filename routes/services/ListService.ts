import CrudService from "./CrudService";
import List from "../model/List";
import AbstractRepo from "../repos/AbstractRepo";
import ListRepo from "../repos/ListRepo";
import listRepo from "../repos/ListRepo";


class ListService extends CrudService<List>{
    getRepo(): AbstractRepo<List> {
        return listRepo;
    }

}

const listService = new ListService();
export default listService