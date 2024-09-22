const axios = require("axios")

class AutomatedFeatureEngineerAPI {

    constructor(){
        this.BASE_URL = "http://0.0.0.0:8000"
        this.performFEAPI = this.BASE_URL + "/performFE/"
    }

    async performAutoFeatureEngineer(payload) {
        try {
            const result = await axios.post(this.performFEAPI,payload)
            console.log(result.data)
            return result.data
        }
        catch(err) {
            console.log(err)
            return err.toString();
        }

    }
}


module.exports = AutomatedFeatureEngineerAPI
