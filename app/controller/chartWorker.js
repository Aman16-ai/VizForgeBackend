// chartWorker.js
const { parentPort, workerData } = require("worker_threads");
const FirebaseFileLoader = require("../service/File/FirebaseFileLoader");
const FireBaseStorageService = require("../service/File/index");
const FileToJsonConvert = require("../service/FileToJsonConvert");
const DataAnalysis = require("../service/analysis/index");
const DataFile = require("../model/DataFile");
const db = require("../config/db")
const mongoose = require("mongoose")
const Redis = require("ioredis");
const RedisFileService = require("../service/File/RedisFileService");
const redis = new Redis()
// Perform the heavy task here
async function createChart() {
  try {
    // await db()

    const {
      session_id,
      chartType,
      attributeX,
      attributeY,
      aggregationX,
      aggregationY,
      startRange,
      endRange,
    } = workerData;

    // Fetch file and convert it to JSON

    // const file = await DataFile.findById(fileId);
    // const buffer = await new FireBaseStorageService().getFileBuffer(file.path);
    const redisFileService = new RedisFileService()
    const buffer = await redisFileService.getFileBuffer(session_id)
    const fileLoader = new FirebaseFileLoader(null, buffer);
    const jsonConvert = new FileToJsonConvert(fileLoader);
    const data = jsonConvert.convertToJson(0);
    // Generate the chart
    const dataAnalysis = new DataAnalysis(data);
    const chart = dataAnalysis.generateChart(
      chartType,
      attributeX,
      attributeY,
      aggregationX,
      aggregationY,
      startRange,
      endRange
    );

    // Send the result back to the main thread
    parentPort.postMessage({ success: true, chart });
  } catch (err) {
    // In case of an error, send it back to the main thread
    parentPort.postMessage({ success: false, error: err.message });
  }
  finally {
    // mongoose.connection.close()
  }
}

// Execute the worker task
createChart();
