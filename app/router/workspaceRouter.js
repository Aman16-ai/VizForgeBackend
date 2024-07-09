const { createWorkSpace, getUserAllWorkSpaces, getWorkspaceById } = require("../controller/workspace")
const verifyTokenMiddleware = require("../middleware/AuthMiddleware")


module.exports = (app) => {
    app.route("/createWorkspace")
    .post(verifyTokenMiddleware,createWorkSpace)

    app.route("/getUserAllWorkspace")
    .get(verifyTokenMiddleware,getUserAllWorkSpaces)

    app.route("/workspace/:id")
    .get(verifyTokenMiddleware,getWorkspaceById)
}