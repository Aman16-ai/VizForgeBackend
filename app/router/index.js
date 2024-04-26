const analysisRouter = require("./analysisRouter")
const fileRouter = require("./fileRouter")
module.exports = (app) => {
    analysisRouter(app)
    fileRouter(app)
}