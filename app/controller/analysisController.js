const FileLoader = require("../service/FileLoader")
const FileToJsonConvert = require("../service/FileToJsonConvert")
const DataFile = require("../model/DataFile")
const FileDataMetaData = require("../service/analysis/FileDataMetaData")
const ApiResponse = require("../utils/ApiResponse")
const DataAnalysis = require("../service/analysis/index")
// get the file id from client converting the file into json and checking the data manully
// controller 2 generating the graphs
const getDataTypesOfFileContent = async (req,res,next) => {
  try {
    const fileId = req.params.fileId
    const file = await DataFile.findById(fileId)
    const fileLoader = new FileLoader(file.path)
    const jsonConvert = new FileToJsonConvert(fileLoader)
    const data = jsonConvert.convertToJson(0)

    const fileDataMetaData = new FileDataMetaData(data)
    const attributesWithTypes = fileDataMetaData.getAttributesWithType()
    return res.status(500).json(ApiResponse(false,500,attributesWithTypes))
  }
  catch(err) {
    next(err)
  }
}

const createChart = async (req,res,next) => {
  try {
    const fileId = req.body.fileId
    const file = await DataFile.findById(fileId)
    const fileLoader = new FileLoader(file.path)
    const jsonConvert = new FileToJsonConvert(fileLoader)
    const data = jsonConvert.convertToJson(0)

    const chartType = req.body.type
    const attributeX = req.body.attributeX
    const attributeY = req.body.attributeY
    const dataAnalysis = new DataAnalysis(data)
    const chart = dataAnalysis.generateChart(chartType,attributeX,attributeY)
    return res.status(201).json(ApiResponse(false,201,chart))
  }
  catch(err) {
    next(err)
  }
}
module.exports = {getDataTypesOfFileContent,createChart}