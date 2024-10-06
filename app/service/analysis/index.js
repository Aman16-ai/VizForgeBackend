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

  createDataForBarPlot(
    attributeX,
    attributeY,
    aggregationX = "value",
    aggregationY = "sum",
    start = 0,
    end = this.data.length
  ) {
    const mp = new Map();
  
    // Aggregate the data
    for (let i = start; i < end; i++) {
      let x = this.data[i][attributeX];
      let y = this.data[i][attributeY];
  
      if (aggregationX === "value") {
        if (!mp.has(x)) {
          if(aggregationY === 'count') {
            mp.set(x,1)
          }
          else {
            mp.set(x, y);
          }
        } else {
          switch (aggregationY) {
            case "sum":
              mp.set(x, mp.get(x) + y);
              break;
            case "count":
              mp.set(x, mp.get(x) + 1);
              break;
            case "max":
              mp.set(x, Math.max(mp.get(x), y));
              break;
            case "min":
              mp.set(x, Math.min(mp.get(x), y));
              break;
            default:
              mp.set(x, mp.get(x) + y);
          }
        }
      }
    }
  
    // Convert Map to arrays for plotting
    const barPlotXAxisData = [];
    const barPlotSeriesData = [];
    for (let [key, value] of mp) {
      barPlotXAxisData.push(key);
      barPlotSeriesData.push(value);
    }
  
    return { seriesData: barPlotSeriesData, xAxisData: barPlotXAxisData };
  }
  generateChart(
    type,
    attributeX,
    attributeY,
    aggregationX = "value",
    aggregationY = "sum",
    start = 0,
    end = this.data.length
  ) {
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
        aggregationX,
        aggregationY,
        start,
        end
      );
      chartBuilder
        .setXAxisType("category")
        .setXAxisData(xAxisData)
        .setXAxisLabelRotation(90)
        .setSeriesData(seriesData);
    }

    return chartBuilder.build();
  }
}

module.exports = DataAnalysis;
