import httpContext from "express-http-context";
import User from "../model/User";

class UserService {
    setUserInRequest(user: User) {
        httpContext.set("user", user)
    }

    clearUser() {
        httpContext.set("user", undefined);
    }

    getUser(): User {
        return httpContext.get("user");
    }
}

export default new UserService();