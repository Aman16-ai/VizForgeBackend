const analysisRouter = require("./analysisRouter")
const authRouter = require("./authRouter")
const fileRouter = require("./fileRouter")
const userRouter = require("./userRouter")
const workspaceRouter = require("./workspaceRouter")
module.exports = (app) => {
    analysisRouter(app)
    fileRouter(app)
    authRouter(app)
    userRouter(app)
    workspaceRouter(app)
}