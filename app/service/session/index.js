const Redis = require("ioredis");
const redis = new Redis("rediss://default:AVNS_3X_MO9rW8S9VmWC8796@redis-381bc3a7-asaxena7531-fba0.a.aivencloud.com:22275");
const {v4:uuidv4} = require('uuid')
class SessionService {
  async getSessionID(req) {
    console.log(req.cookies)
    const sessionId = req.cookies.session_id;
    const existingSession = await redis.get(sessionId);

    // If no session exists, create a new one
    if (!existingSession) {
      const newSessionId = uuidv4();
      await redis.set(newSessionId, JSON.stringify({}), "EX", 600); // Set session to expire in 10 minutes
      console.log(`New session created with ID: ${newSessionId}`);
      return newSessionId;
    }

    return sessionId;
  }
}

module.exports = SessionService
