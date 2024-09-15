const mongoose = require("mongoose")
const dataFileSchema = new mongoose.Schema({
    name: {
        type:String,
        require:true,
    },
    path : {
        type:String,
        require:true
    },

},{timestamps:true})


const DataFile = mongoose.model("DataFile",dataFileSchema)
module.exports = DataFile