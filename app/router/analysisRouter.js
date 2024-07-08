const { getDataTypesOfFileContent,createChart, streamData } = require("../controller/analysisController")

module.exports = (app) => {
    app.route("/analysis/getattributesWithType/:fileId")
    .get(getDataTypesOfFileContent)

    app.route("/analysis/createChart/")
    .post(createChart)

    app.route("/analysis/streamData/")
    .get(streamData)
}