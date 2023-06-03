import User from "../model/User";
import EnvAccessor from "../EnvAccessor";

class GoogleOAuthService {
    getCodeURL = "https://accounts.google.com/o/oauth2/v2/auth"
    clientId = "319710408255-ntkf14k8ruk4p98sn2u1ho4j99rpjqja.apps.googleusercontent.com"
    async authUser(accessToken: string){
        console.log("Authorizing with access_token = " + accessToken)
        const user = await fetch("https://www.googleapis.com/oauth2/v3/userinfo?alt=json", {
            headers: { "Authorization": "Bearer " + accessToken }
        }).then(r=>r.json());
        if(user.sub){
            console.log(`Successful for user ${user.sub}, ${user.name}`)
            return new User(user.sub, user.name);
        } else {
            console.log("Failed with ans: " + JSON.stringify(user))
            return null;
        }
    }

    async exchangeCodeToToken(code: string): Promise<string> {
        const details = {
            client_id: "319710408255-ntkf14k8ruk4p98sn2u1ho4j99rpjqja.apps.googleusercontent.com",
            client_secret: "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",
            code,
            grant_type: "authorization_code",
            redirect_uri: EnvAccessor.getBaseHost() + EnvAccessor.getMongoUrl() + "/g_oauth"
        }
        const formBody2 = [];
        for (const property in details) {
            const encodedKey = encodeURIComponent(property);
            const encodedValue = encodeURIComponent(details[property]);
            formBody2.push(encodedKey + "=" + encodedValue);
        }
        const formBody = formBody2.join("&");
        const result = await fetch('https://oauth2.googleapis.com/token', {
            method: 'POST',
            headers: { 'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8' },
            body: formBody
        }).then(res=>res.json());
        let accessToken = result.access_token;
        if(accessToken) {
            console.log(`Code ${code} exchanged to token ${accessToken}`)
        } else {
            console.log(`Code ${code} exchanging failed with ans: ${JSON.stringify(result)}`)
        }
        return accessToken;
    }
}

export default new GoogleOAuthService()