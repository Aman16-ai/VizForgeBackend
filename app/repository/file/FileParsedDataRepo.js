const Excel = require("exceljs")

class FileParseDataRepo {

    constructor() {
        this.wb = new Excel.Workbook()
    }

    getData(buffer) {
        const data = []
        this.wb.xlsx.load(buffer).then(workbook => {
            workbook.eachSheet((sheet,id)=> {
                sheet.eachRow((row,Index) => {
                    console.log(row.values)
                })
            })
        })
    }
}

module.exports = FileParseDataRepo