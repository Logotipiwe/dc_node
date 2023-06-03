import express from "express";
import listService from "../../services/ListService";
import httpContext from "express-http-context";
import listsPresenter from "../../presenters/web/ListsPresenter";
import authPresenter from "../../presenters/web/AuthPersenter";
import {authMiddleware} from "../../auth/authMiddleware";

const router = express.Router();

router.get('/', [authMiddleware, async function (req, res, next) {
    try {
        let page = ""
        const user = httpContext.get("user");
        if (user) {
            const lists = await listService.getAll();
            page += authPresenter.getLoginInfo(user)
                + listsPresenter.creationForm()
                + listsPresenter.printLists(lists);
        } else {
            page += authPresenter.getAuthForm();
        }
        res.send(page);
    } catch (e) {
        next(e)
    }
}]);
export default router;