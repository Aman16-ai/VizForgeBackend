class ChartBuilder {
  constructor() {
    this.option = {
      xAxis: {
        axisLabel: {
          rotate: 90, // Default to vertical (90 degrees)
        },
      },
      yAxis: {},
      series: [
        {
          data: [],
          type: "",
        },
      ],
      tooltip: {
        trigger: "axis",
        axisPointer: {
          type: "shadow",
        },
      },
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

  setXAxisLabelRotation(angle) {
    this.option.xAxis.axisLabel = {
      ...this.option.xAxis.axisLabel,
      rotate: angle,
    };
    return this;
  }

  setTooltip(config = {}) {
    this.option.tooltip = {
      ...this.option.tooltip,
      ...config,
    };
    return this;
  }
  build() {
    return this.option;
  }
}

module.exports = ChartBuilder;
