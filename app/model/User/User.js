const mongoose = require("mongoose")
const userSchema = mongoose.Schema({
    firstName: {
        type:String,
        require:true
    },
    lastName: {
        type:String,
        require:true
    },
    username : {
        type:String,
        require:true,
        index:{unique:true}
    },
    email : {
        type:String,
        require:true,
        index:{unique:true}
    },
    password: {
        type:String,
        require:true
    },
},{timestamps:true})
module.exports = mongoose.model("User",userSchema);