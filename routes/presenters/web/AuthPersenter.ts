import User from "../../model/User";

class AuthPresenter {
    getLoginInfo(user: User) {
        return `<h1>Здарова ${user.name}! <a href="/g_oauth/logout">Выйти</a> </h1> <br/>`
    }

    getAuthForm() {
        return "<a href='https://accounts.google.com/o/oauth2/v2/auth?client_id=319710408255-ntkf14k8ruk4p98sn2u1ho4j99rpjqja.apps.googleusercontent.com&redirect_uri=http%3A%2F%2Flocalhost%3A3000%2Fg_oauth&response_type=code&scope=profile'>ВОЙТИ</a><br/>"
    }

}

export default new AuthPresenter()