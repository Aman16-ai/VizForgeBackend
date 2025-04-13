const axios = require('axios');

class ChartDataRepository {
    constructor(payload) {
        this.chartData = {};
        this.payload = payload;
    }

    async getChartData() {
        try {
            const response = await axios.post('http://127.0.0.1:8000/api/fileData/chart/data', this.payload);
            this.chartData = response.data.data;
            return this.chartData;
        } catch (error) {
            console.error('Error fetching chart data:', error);
            throw error;
        }
    }
}

module.exports = ChartDataRepository;