// const { createWorkSpace, getUserAllWorkSpaces, getWorkspaceById, updateUserWorkspace } = require("../controller/workspace")
const controller = require("../controller/workspace")
const verifyTokenMiddleware = require("../middleware/AuthMiddleware")


module.exports = (app) => {
    app.route("/createWorkspace")
    .post(verifyTokenMiddleware,controller.createWorkSpace.bind(controller))

    app.route("/getUserAllWorkspace")
    .get(verifyTokenMiddleware,controller.getUserAllWorkSpaces.bind(controller))

    app.route("/workspace/:id")
    .get(verifyTokenMiddleware,controller.getWorkspaceById.bind(controller))
    .patch(verifyTokenMiddleware,controller.updateUserWorkspace.bind(controller))
    .delete(verifyTokenMiddleware,controller.deleteWorkspace.bind(controller))
}