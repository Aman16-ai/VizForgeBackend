const analysisRouter = require("./analysisRouter")
const authRouter = require("./authRouter")
const featureEngineerRouter = require("./featureEngineerRouter")
const fileRouter = require("./fileRouter")
const userRouter = require("./userRouter")
const workspaceRouter = require("./workspaceRouter")
module.exports = (app) => {
    analysisRouter(app)
    fileRouter(app)
    authRouter(app)
    userRouter(app)
    workspaceRouter(app)
    featureEngineerRouter(app)
}