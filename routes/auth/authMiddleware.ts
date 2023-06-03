import googleOAuthService from "./GoogleOAuthService";
import userService from "./UserService";

export const authMiddleware = async (req, res, next) => {
    console.log("Authorizing...")
    let accessToken = res.req.cookies.access_token;
    if( accessToken ){
        const user = await googleOAuthService.authUser(accessToken)
        if(user) {
            console.log("Authorized")
            userService.setUserInRequest(user)
            return next();
        }
    }
    userService.clearUser()
    console.log("Unauthorized")
    if(res.req.path !== "/") {
        res.redirect("/");
    }
    next();
}