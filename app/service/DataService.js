const Data = require('../model/Data')

class DataService {

    async saveData(fileId,data) {
        const newData = await Data.create({
            file : fileId,
            data : data
        })
        return newData
    }

    async getFileData(fileId) {
        return await Data.findOne({file:fileId})
                            .populate('file')
                            .exec()
    }

}

module.exports = DataService