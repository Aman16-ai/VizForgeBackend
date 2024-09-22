const FileStorageService = require("../service/File/index")

async function firebaseFileUpload(req,res,next) {
    try {
        console.log('file middle',req.file)
        const storageService = new FileStorageService()
        const url = await storageService.uploadFile({type:req.file.mimetype,buffer:req.file.buffer, originalname : req.file.originalname})
        req.firebaseFileUrl = url
        next()
    }
    catch(err) {
        next(err)
    }

}
module.exports = firebaseFileUpload