const mongoose = require("mongoose")
const workSpaceShecma = new mongoose.Schema({
    name : {
        type:String,
        index:{unique:true},
        require:true
    },
    user : {
        type : mongoose.Schema.Types.ObjectId,
        ref : "User",
        require:true,
    },
    file : {
        type : mongoose.Schema.Types.ObjectId,
        ref : "DataFile",
        require:true,
    }
},{timestamps:true})

module.exports = mongoose.model("Workspace",workSpaceShecma)
