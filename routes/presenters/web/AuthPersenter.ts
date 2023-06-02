import User from "../../model/User";
import EnvAccessor from "../../EnvAccessor";
import GoogleOAuthService from "../../auth/GoogleOAuthService";

class AuthPresenter {
    getLoginInfo(user: User) {
        return `<h1>Здарова ${user.name}! <a href="/g_oauth/logout">Выйти</a> </h1> <br/>`
    }

    getAuthForm() {
        const url = new URL(GoogleOAuthService.getCodeURL);
        let init: Record<string, string> = {
            client_id: GoogleOAuthService.clientId,
            redirect_uri: EnvAccessor.getBaseUrl() + "/g_oauth",
            response_type: "code",
            scope: "profile"
        };
        url.search = new URLSearchParams(init).toString();
        return `<a href='${url}'>ВОЙТИ</a><br/>`
    }

}

export default new AuthPresenter()