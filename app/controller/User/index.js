const ErrorProvider = require("../../Error/ErrorProvider")
const User = require("../../model/User/User")

const getUser = async(req,res,next) => {
    try {
        const user = req.user
        return res.status(200).json({status:true,Response:user})
    }
    catch(err) {
        next(err)
    }
}

module.exports = getUser