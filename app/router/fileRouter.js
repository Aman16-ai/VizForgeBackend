const {uploadExcelFile,getAllUploadedFiles} = require("../controller/fileController")
const verifyTokenMiddleware = require("../middleware/AuthMiddleware")
const uploads = require("../middleware/fileUploadMiddleware")
const uploadInMemory = require("../middleware/multerMemoryStorage")
const firebaseFileUpload = require("../middleware/firebaseUploadMiddleware")
module.exports = (app) => {
    app.route("/file/uploadFile/")
    .post(uploadInMemory.single("xl-file"),firebaseFileUpload,uploadExcelFile)

    app.route("/file")
    .get(getAllUploadedFiles)
}