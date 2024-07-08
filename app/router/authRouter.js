const { register, login } = require("../controller/Auth")


module.exports = (app) => {
    app.route("/auth/register/")
    .post(register)

    app.route("/auth/login/")
    .post(login)
}