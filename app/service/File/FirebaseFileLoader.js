const FileLoader = require("../FileLoader")
const xlsx = require('xlsx')

class FirebaseFileLoader extends FileLoader {
    constructor(filePath,buffer) {
        super(filePath)
        this.buffer = buffer
    }


    loadFile() {
        this.workBook = xlsx.read(this.buffer,{type:'buffer'})
    }
} 

module.exports = FirebaseFileLoader