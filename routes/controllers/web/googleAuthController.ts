import express from "express";
import googleOAuthService from "../../auth/GoogleOAuthService";
const router = express.Router();
router.get("", async (req, res) => {
    const code = req.query.code.toString();
    const accessToken = await googleOAuthService.exchangeCodeToToken(code);
    res.cookie('access_token', accessToken, { httpOnly: true });
    res.redirect("/")
})

router.get("/logout", (req, res) => {
    res.cookie("access_token", undefined, { httpOnly: true })
    res.redirect("/")
})

export default router;