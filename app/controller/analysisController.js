const FileLoader = require("../service/FileLoader");
const FileToJsonConvert = require("../service/FileToJsonConvert");
const DataFile = require("../model/DataFile");
const FileDataMetaData = require("../service/analysis/FileDataMetaData");
const ApiResponse = require("../utils/ApiResponse");
const DataAnalysis = require("../service/analysis/index");
const fs = require("fs");
const ErrorProvider = require("../Error/ErrorProvider");
const XlsxStreamReader = require("xlsx-stream-reader");
const convertor = require("../utils/TypeConvertor");
// get the file id from client converting the file into json and checking the data manully
// controller 2 generating the graphs
// data[0] = {
//   'S.No.': 15,
//   'Student Name': 'Mehul Pandey',
//   'Roll No': 2015602719,
//   'Company Name': 'Infosys (HackwithInfy)',
//   'Salary Package\r\n(LPA)': 8
// },
const getDataTypesOfFileContent = async (req, res, next) => {
  try {
    const fileId = req.params.fileId;
    const file = await DataFile.findById(fileId);
    const fileLoader = new FileLoader(file.path)
    const jsonConvert = new FileToJsonConvert(fileLoader)
    const data = jsonConvert.convertToJson(0)
    // console.log(data)
    const fileDataMetaData = new FileDataMetaData(data)
    const attributesWithTypes = fileDataMetaData.getAttributesWithType()

    // approach two
    const filePath = file.path;
    console.log("file path ", file.path);
    if (!fs.existsSync(filePath)) {
      return res.status(404).send("File not found");
    }

    // // Create a new ExcelJS workbook reader
    // const workbookStream = fs.createReadStream(filePath);
    // let columns = [];
    // let parsedData = [];
    // var workBookReader = new XlsxStreamReader();
    // workBookReader.on("error", function (error) {
    //   throw error;
    // });
    // workBookReader.on("worksheet", function (workSheetReader) {
    //   if (workSheetReader.id > 1) {
    //     // we only want first sheet
    //     workSheetReader.skip();
    //     return;
    //   }

    //   function onRow(row) {
    //     if(row.attributes.r == 2) {
    //       workSheetReader.removeListener('row',onRow)
    //     }
    //     else if (row.attributes.r == 1) {
    //       // do something with row 1 like save as column names
    //       console.log(row.values);
    //       columns = row.values.filter((r) => r !== "");
    //       console.log("columns", columns);
    //     } else {
    //       const rowData = {};
    //       row = row.values.filter((r) => r !== "");
    //       row.forEach(function (rowVal, colNum) {
    //         rowData[columns[colNum]] = rowVal;
    //       });
    //       parsedData.push(rowData);
    //     }
    //   }
    //   workSheetReader.on("row", onRow);
    //   workSheetReader.on("end", function () {
    //     console.log(workSheetReader.rowCount);
    //     // const fileDataMetaData = new FileDataMetaData(parsedData);
    //     // const attributesWithTypes = fileDataMetaData.getAttributesWithType();
    //     return res.status(200).json(ApiResponse(false, 500, parsedData));
    //   });

    //   // call process after registering handlers
    //   workSheetReader.process();
    // });
    // workBookReader.on("end", function () {
    //   // end of workbook reached
    // });

    // fs.createReadStream(filePath).pipe(workBookReader);

    return res.status(200).json(ApiResponse(false, 500, attributesWithTypes));
  } catch (err) {
    next(err);
  }
};

const createChart = async (req, res, next) => {
  try {
    const fileId = req.body.fileId;
    const file = await DataFile.findById(fileId);
    const fileLoader = new FileLoader(file.path);
    const jsonConvert = new FileToJsonConvert(fileLoader);
    const data = jsonConvert.convertToJson(0);

    const chartType = req.body.type;
    const attributeX = req.body.attributeX;
    const attributeY = req.body.attributeY;
    const startRange = req.body.start
    const endRange = req.body.end
    const dataAnalysis = new DataAnalysis(data);
    const chart = dataAnalysis.generateChart(
      chartType, 
      attributeX, 
      attributeY,
      startRange,
      endRange
    );
    return res.status(201).json(ApiResponse(false, 201, chart));
  } catch (err) {
    next(err);
  }
};


const streamData = async(req,res,next) => {
  try {

    res.setHeader('Content-Type', 'text/event-stream');
    res.setHeader('Cache-Control', 'no-cache');
    res.setHeader('Connection', 'keep-alive');
    const fileId = req.query.fileId;
    const file = await DataFile.findById(fileId);
    const fileLoader = new FileLoader(file.path);
    const jsonConvert = new FileToJsonConvert(fileLoader);
    const data = jsonConvert.convertToJson(0);

    const attributeX = req.query.attributeX;
    const attributeY = req.query.attributeY;

    const dataAnalysis = new DataAnalysis(data);
    const { seriesData, xAxisData } = dataAnalysis.createDataForBarPlot(
      attributeX,
      attributeY,
    );


    

    console.log('rimmomg ')
    const sendData = (data)=> {
      res.write(`data: ${JSON.stringify(data)}\n\n`);
    }
    let index = 0;
    const intervalId = setInterval(() => {
      if(index < seriesData.length) {
        sendData(seriesData[index]);
        index++;
      } else {
        clearInterval(intervalId);
        res.end();
      }
    },100);

    req.on('close',() => {
      clearInterval(intervalId);
      res.end();
    })
  }
  catch(err) {
    next(err);
  }
}

module.exports = { getDataTypesOfFileContent, createChart,streamData };
