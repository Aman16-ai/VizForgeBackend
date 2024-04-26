class ChartBuilder {
  constructor() {
    this.option = {
      xAxis: {},
      yAxis: {},
      series: [
        {
          data: [],
          type: "",
        },
      ],
    };
  }

  setChartType(type) {
    this.option.series[0].type = type;
    return this;
  }

  setSeriesData(data) {
    this.option.series[0].data = data;
    return this;
  }

  setXAxisType(type) {
    this.option.xAxis = {
      ...this.option.xAxis,
      type: type,
    };
    return this;
  }
  setXAxisData(data) {
    this.option.xAxis = {
      ...this.option.xAxis,
      data: data,
    };
    return this;
  }
  setYAxisType(type) {
    this.option.yAxis = {
      ...this.option.yAxis,
      type: type,
    };
    return this;
  }

  build() {
    return this.option;
  }
}

module.exports = ChartBuilder;
