const { autoFeatureEngineer } = require("../controller/featureEngineer")
const verifyTokenMiddleware = require("../middleware/AuthMiddleware")


module.exports = (app) => {
    app.route("/performAutoFE/")
    .post(verifyTokenMiddleware, autoFeatureEngineer)
}
