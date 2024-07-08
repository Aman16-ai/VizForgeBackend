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

  createDataForBarPlot(attributeX, attributeY,start=0,end=this.data.length) {
    const barPlotSeriesData = [];
    const barPlotXAxisData = [];
    // this.data.forEach((d) => {
    //   barPlotSeriesData.push(d[attributeY]);
    //   barPlotXAxisData.push(d[attributeX]);
    // });
    for(let i =start;i<end;i++) {
      barPlotXAxisData.push(this.data[i][attributeX]);
      barPlotSeriesData.push(this.data[i][attributeY]);
    }
    return { seriesData: barPlotSeriesData, xAxisData: barPlotXAxisData };
  }
  generateChart(type, attributeX, attributeY,start=0,end=this.data.length) {
    let seriesData = [];
    const chartBuilder = new ChartBuilder();
    chartBuilder.setChartType(type);

    if (type === "scatter") {
      seriesData = this.createDataForScatterPlot(attributeX, attributeY);
      chartBuilder.setSeriesData(seriesData);
    } else if (type === "bar") {
      const { seriesData, xAxisData } = this.createDataForBarPlot(
        attributeX,
        attributeY,
        start,
        end
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


