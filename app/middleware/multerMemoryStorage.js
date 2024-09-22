const multer = require("multer")
const storage = multer.memoryStorage()

const uploadInMemory = multer({storage})

module.exports = uploadInMemory