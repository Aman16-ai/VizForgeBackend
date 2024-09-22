const ErrorProvider = require("../../Error/ErrorProvider")
const FeatureEngineerService = require("../../service/featureEngineer/index")


const autoFeatureEngineer = async(req,res,next) => {
    try {
        const featureEngineerSerivce = new FeatureEngineerService()

        if(!req.user) {
            throw new ErrorProvider(404,false,"User not found")
        }
        const userId = req.user._id
        const payload = {
            userId:userId,
            file_path : req.body.file_path,
            prompt : req.body.prompt
        }

        const result = await featureEngineerSerivce.performAutoFeatureEngineer(payload)
        console.log(result)
        return res.status(200).json({'status':true,'Response':result})
    }
    catch(err) {
        console.log(err)
        next(err);
    }
}

module.exports = {autoFeatureEngineer}