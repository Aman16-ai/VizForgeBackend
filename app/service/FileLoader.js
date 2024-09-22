const path = require("path")
const xlsx = require('xlsx')

class FileLoader {
  constructor(filePath) {
    this.absolutePath =filePath
    this.workBook = null;
  }

  loadFile() {
    this.workBook = xlsx.readFile(this.absolutePath);
  }

  getSheetNames() {
    if (this.workBook !== null) {
      return this.workBook.SheetNames;
    }
    return null;
  }

  getSheetData(sheetName) {
    if (this.workBook !== null) {
      return xlsx.utils.sheet_to_json(this.workBook.Sheets[sheetName]);
    }
    return null;
  }
}


module.exports = FileLoader
