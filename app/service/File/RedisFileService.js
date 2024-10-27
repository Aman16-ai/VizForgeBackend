const Redis = require("ioredis")
const ErrorProvider = require("../../Error/ErrorProvider")
const redis = new Redis("rediss://default:AVNS_3X_MO9rW8S9VmWC8796@redis-381bc3a7-asaxena7531-fba0.a.aivencloud.com:22275")

class RedisFileService {


    async uploadFileBuffer(sessionId,buffer) {
        await redis.set(sessionId,JSON.stringify({fileBuffer:buffer.toString('base64')}),'EX',3600)
        return true
    }

    async getFileBuffer(sessionId) {
        const sessionData = await redis.get(sessionId)
        if(!sessionData) {
            throw new ErrorProvider(404,false,"file data not found")
        }
        const {fileBuffer} = JSON.parse(sessionData)
        const buffer = Buffer.from(fileBuffer,'base64')
        return buffer
    }
}

module.exports = RedisFileService