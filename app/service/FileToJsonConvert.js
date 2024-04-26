const xlsx = require("xlsx")

class FileToJsonConvert {

    constructor(fileLoader) {
        this.fileLoader = fileLoader
    }

    convertToJson(pageNo) {
        this.fileLoader.loadFile()
        const sheetNames = this.fileLoader.getSheetNames()
        if(sheetNames && sheetNames.length > pageNo) {
            const sheetName = sheetNames[pageNo]
            const data = this.fileLoader.getSheetData(sheetName)
            return data
        }
        return null
    }
}

module.exports = FileToJsonConvert