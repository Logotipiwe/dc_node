import express from "express";
import googleOAuthService from "../../auth/GoogleOAuthService";
const router = express.Router();
router.get("", async (req, res, next) => {
    try {
        const code = req.query.code.toString();
        console.log(`Logging in with code: ${code}`)
        const accessToken = await googleOAuthService.exchangeCodeToToken(code);
        res.cookie('access_token', accessToken, {httpOnly: true});
        res.redirect("/")
    } catch (e) {
        next(e)
    }
})

router.get("/logout", (req, res, next) => {
    try {
        res.cookie("access_token", "", {httpOnly: true})
        res.redirect("/")
    } catch (e) {
        next(e)
    }
})

export default router;