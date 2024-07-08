const getUser = require("../controller/User")
const verifyTokenMiddleware = require("../middleware/AuthMiddleware")


module.exports = (app) => {
    app.route("/user")
    .get(verifyTokenMiddleware,getUser)
}