const { getDataTypesOfFileContent,createChart } = require("../controller/analysisController")

module.exports = (app) => {
    app.route("/analysis/getattributesWithType/:fileId")
    .get(getDataTypesOfFileContent)

    app.route("/analysis/createChart/")
    .post(createChart)
}