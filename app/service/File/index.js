const FileStorageRepo = require("../../repository/file/FileStorageRepo")

class FileStorageService {


    constructor() {
        this.fileStorageRepo = new FileStorageRepo()
    }

    async uploadFile(file) {
        return await this.fileStorageRepo.upload(file)
    }

    async getFileBuffer(fileURL) {
        return await this.fileStorageRepo.getFileBuffer(fileURL)
    }
}

module.exports = FileStorageService