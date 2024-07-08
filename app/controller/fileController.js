const DataFile = require("../model/DataFile")
const ErrorProvider = require("../Error/ErrorProvider") 
const ApiResponse = require("../utils/ApiResponse")
const uploadExcelFile = async(req,res,next) => {
    try {
        const file = req.file
        const absolute_path = file.path
        console.log(absolute_path)
        const dataFile = new DataFile({
            name:file.originalname,
            path:absolute_path
        })
        const obj = await dataFile.save()
        console.log(obj)
        return res.status(201).json({"status":201,"Response":{"Message":"File uploaded","fileId":dataFile._id,"filePath":obj.path}})
    }
    catch(err) {
        next(err)
    }
}

const getAllUploadedFiles = async(req,res,next) => {
    try {
        const files = await DataFile.find({})
        if(!files) {
            throw new ErrorProvider(404,false,"Files not found")
        }
        return res.status(200).json(ApiResponse(false,200,files))
    }
    catch(err) {
        next(err)
    }
}
module.exports = {uploadExcelFile,getAllUploadedFiles}