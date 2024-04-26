const ChartBuilder = require("./Chart/ChartBuilder");
class DataAnalysis {
  constructor(data) {
    this.data = data;
  }

  createDataForScatterPlot(attributeX, attributeY) {
    const scatterPlotData = [];
    this.data.forEach((d) => {
      if (d) {
        scatterPlotData.push([d[attributeX], d[attributeY]]);
      }
    });
    return scatterPlotData;
  }

  createDataForBarPlot(attributeX, attributeY) {
    const barPlotSeriesData = [];
    const barPlotXAxisData = [];
    this.data.forEach((d) => {
      barPlotSeriesData.push(d[attributeY]);
      barPlotXAxisData.push(d[attributeX]);
    });
    return { seriesData: barPlotSeriesData, xAxisData: barPlotXAxisData };
  }
  generateChart(type, attributeX, attributeY) {
    let seriesData = [];
    const chartBuilder = new ChartBuilder();
    chartBuilder.setChartType(type);

    if (type === "scatter") {
      seriesData = this.createDataForScatterPlot(attributeX, attributeY);
      chartBuilder.setSeriesData(seriesData);
    } else if (type === "bar") {
      const { seriesData, xAxisData } = this.createDataForBarPlot(
        attributeX,
        attributeY
      );
      chartBuilder
        .setXAxisType("category")
        .setXAxisData(xAxisData)
        .setSeriesData(seriesData);
    }
    
    return chartBuilder.build();
  }
}

module.exports = DataAnalysis;
