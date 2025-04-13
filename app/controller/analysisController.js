const FileLoader = require("../service/FileLoader");
const FileToJsonConvert = require("../service/FileToJsonConvert");
const DataFile = require("../model/DataFile");
const FileDataMetaData = require("../service/analysis/FileDataMetaData");
const ApiResponse = require("../utils/ApiResponse");
const DataAnalysis = require("../service/analysis/index");
const FirebaseFileLoader = require("../service/File/FirebaseFileLoader");
const FireBaseStorageService = require("../service/File/index");
const { Worker } = require("worker_threads");
const path = require("path");
const RedisFileService = require("../service/File/RedisFileService");
const getDataTypesOfFileContent = async (req, res, next) => {
  try {
    // const fileId = req.params.fileId;
    // const file = await DataFile.findById(fileId);

    // const fileBuffer = await new FireBaseStorageService().getFileBuffer(
    //   file.path
    // );
    const session_id = req.cookies.session_id
    const redisFileService = new RedisFileService()
    const buffer = await redisFileService.getFileBuffer(session_id)
    const fileLoader = new FirebaseFileLoader(null, buffer);
    const jsonConvert = new FileToJsonConvert(fileLoader);
    const data = jsonConvert.convertToJson(0);
    const fileDataMetaData = new FileDataMetaData(data);
    const attributesWithTypes = fileDataMetaData.getAttributesWithType();

    return res.status(200).json(ApiResponse(false, 500, attributesWithTypes));
  } catch (err) {
    next(err);
  }
};

const createChart = async (req, res, next) => {
  try {
    const session_id = req.cookies.session_id
    const redisFileService = new RedisFileService()
    const buffer = await redisFileService.getFileBuffer(session_id)
    // const fileId = req.body.fileId;
    // const file = await DataFile.findById(fileId);
    // const buffer = await new FireBaseStorageService().getFileBuffer(file.path);
    const fileLoader = new FirebaseFileLoader(null, buffer);
    const jsonConvert = new FileToJsonConvert(fileLoader);
    const data = jsonConvert.convertToJson(0);

    const chartType = req.body.type;
    const attributeX = req.body.attributeX;
    const aggregationX = req.body.aggregationX;
    const aggregationY = req.body.aggregationY;
    const attributeY = req.body.attributeY;
    const startRange = req.body.start
    const endRange = req.body.end
    const dataAnalysis = new DataAnalysis(data,req.cookies.session_id);
    const chart = await dataAnalysis.generateChart(
      chartType,
      attributeX,
      attributeY,
      aggregationX,
      aggregationY,
      startRange,
      endRange
    );
    return res.status(201).json(ApiResponse(false, 201, chart));

    
    // Create a worker to handle the chart generation
    // const worker = new Worker(path.resolve(__dirname, './chartWorker.js'), {
    //   workerData: {
    //     session_id,
    //     chartType,
    //     attributeX,
    //     attributeY,
    //     aggregationX,
    //     aggregationY,
    //     startRange,
    //     endRange,
    //   },
    // });

    // worker.on("message", (message) => {
    //   if (message.success) {
    //     return res.status(201).json(ApiResponse(false, 201, message.chart));

    //   } else {
    //     next(new Error(message.error));
    //   }
    // });

    // worker.on("error", (err) => {
    //   next(err);
    // });


    // worker.on("exit", (code) => {
    //   if (code !== 0) {
    //     next(new Error(`Worker stopped with exit code ${code}`));
    //   }
    // });
  } catch (err) {
    next(err);
  }
};

const streamData = async (req, res, next) => {
  try {
    res.setHeader("Content-Type", "text/event-stream");
    res.setHeader("Cache-Control", "no-cache");
    res.setHeader("Connection", "keep-alive");
    const fileId = req.query.fileId;
    const file = await DataFile.findById(fileId);
    const fileLoader = new FileLoader(file.path);
    const jsonConvert = new FileToJsonConvert(fileLoader);
    const data = jsonConvert.convertToJson(0);

    const attributeX = req.query.attributeX;
    const attributeY = req.query.attributeY;

    console.log("session_id",req.cookies.session_id)
    const dataAnalysis = new DataAnalysis(data,req.cookies.session_id);
    const { seriesData, xAxisData } = dataAnalysis.createDataForBarPlot(
      attributeX,
      attributeY
    );

    console.log("rimmomg ");
    const sendData = (data) => {
      res.write(`data: ${JSON.stringify(data)}\n\n`);
    };
    let index = 0;
    const intervalId = setInterval(() => {
      if (index < seriesData.length) {
        sendData(seriesData[index]);
        index++;
      } else {
        clearInterval(intervalId);
        res.end();
      }
    }, 100);

    req.on("close", () => {
      clearInterval(intervalId);
      res.end();
    });
  } catch (err) {
    next(err);
  }
};

module.exports = { getDataTypesOfFileContent, createChart, streamData };
