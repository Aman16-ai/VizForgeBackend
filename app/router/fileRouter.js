const {uploadExcelFile,getAllUploadedFiles} = require("../controller/fileController")
const verifyTokenMiddleware = require("../middleware/AuthMiddleware")
const uploads = require("../middleware/fileUploadMiddleware")
module.exports = (app) => {
    app.route("/file/uploadFile/")
    .post(uploads.single("xl-file"),uploadExcelFile)

    app.route("/file")
    .get(getAllUploadedFiles)
}