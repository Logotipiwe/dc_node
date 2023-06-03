import googleOAuthService from "./GoogleOAuthService";
import userService from "./UserService";

export const authMiddleware = async (req, res, next) => {
    console.log("Authorizing...")
    let accessToken = res.req.cookies.access_token;
    console.log("AT: " + accessToken);
    const user = await googleOAuthService.authUser(accessToken)
    if(user){
        userService.setUserInRequest(user)
    } else {
        userService.clearUser()
        console.log("Unauthorized")
        if(res.req.path !== "/") res.redirect("/");
    }
    next();
}