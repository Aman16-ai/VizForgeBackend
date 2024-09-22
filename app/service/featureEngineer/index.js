const AutomatedFeatureEngineerAPI = require("./automatedFeatureEngineerService")

class FeatureEngineerService {


    constructor() {
        this.autoFeatureEngineerAPI = new AutomatedFeatureEngineerAPI()
    }
    async performAutoFeatureEngineer(payload) {
        return this.autoFeatureEngineerAPI.performAutoFeatureEngineer(payload)
    }

}

module.exports = FeatureEngineerService