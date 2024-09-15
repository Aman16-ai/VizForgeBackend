const csv = require('csv-parser')
const fs = require('fs')

class CsvService {
    async praseData(filePath) {
        const result = [];
        return new Promise((resolve,reject) => {
            fs.createReadStream(filePath)
            .pipe(csv())
            .on('data',(data) => {
                result.push(data)
            })
            .on('end',() => {
                resolve(result)
            })
            .on('error',(err) => {
                reject(err)
            })
        })

    }
}

module.exports = CsvService