const mongoose = require("mongoose");

const DataSchema = new mongoose.Schema({
  file : {
    type : mongoose.Schema.Types.ObjectId,
    ref : 'DataFile'
  },
  data: [mongoose.Schema.Types.Mixed],
},{timestamps:true});


module.exports = mongoose.model('Data',DataSchema)