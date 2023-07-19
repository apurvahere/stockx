"use client";

import React, { useState, useEffect } from "react";
import Highcharts from "highcharts";
import HighchartsExporting from "highcharts/modules/exporting";
import HighchartsReact from "highcharts-react-official";

if (typeof Highcharts === "object") {
  HighchartsExporting(Highcharts);
}

type LineChartProps = {
  data?: { data: number[] }[];
  categories: string[];
  chartTitle: string;
  markers?: Boolean;
  gradient?: Boolean;
  tooltip?: Boolean;
  showLineOnly?: Boolean;
  showGridLines?: Boolean;
  showNegative?: Boolean;
  showPositive?: Boolean;
  showDataPoints?: Boolean;
  chartType?: "spline" | "line";
  height?: number;
  width?: number;
};

const LineChart: React.FC<LineChartProps> = ({
  data,
  categories,
  chartTitle = "",
  markers = false,
  gradient = false,
  tooltip = true,
  chartType = "spline",
  showLineOnly = false,
  showGridLines = false,
  showNegative = false,
  showPositive = false,
  showDataPoints = true,
  height,
  width,
}) => {
  const [chartData, setChartData] = useState(data);

  const updatedData = data!.map((obj: any, index: number) => {
    if (index % 2 === 0) {
      return {
        ...obj,
        color: showNegative ? "red" : showPositive ? "green" : "#000",
        marker: {
          enabled: markers ? true : false,
        },
      };
    } else {
      return {
        ...obj,
        color: "#14B8A6",
        marker: {
          enabled: markers ? true : false,
        },
      };
    }
  });

  const [options, setOptions] = useState<Highcharts.Options>({
    chart: {
      type: chartType === "spline" ? "areaspline" : "line",
      backgroundColor:
        process.browser && localStorage.getItem("theme") === "dark"
          ? "#212b36"
          : "white",
      height: height,
      width: width,
    },
    // responsive: {
    //   rules: [
    //     {
    //       condition: {
    //         maxWidth: 500,
    //       },
    //     },
    //   ],
    // },
    title: {
      text: chartTitle,
    },
    // @ts-ignore
    xAxis: {
      categories: categories,
      lineColor: showLineOnly ? "transparent" : "#E5E7EB",
      labels: {
        enabled: showLineOnly ? false : true,
        style: {
          color: "#9CA3AF",
          fontFamily: "Inter",
          fontWeight: "500",
          fontSize: "12px",
          lineHeight: "16px",
          letterSpacing: "0.005em",
        },
      },
      title: {
        text: showLineOnly && null,
      },
    },
    // @ts-ignore
    yAxis: {
      title: {
        text: showLineOnly && null,
      },
      gridLineWidth: showGridLines ? 1 : 0,
      lineColor: showLineOnly ? "transparent" : "#E5E7EB",
      labels: {
        enabled: showLineOnly ? false : true,
        style: {
          color: "#9CA3AF",
          fontFamily: "Inter",
          fontWeight: "500",
          fontSize: "12px",
          lineHeight: "16px",
          letterSpacing: "0.005em",
        },
      },
    },
    plotOptions: {
      areaspline: {
        fillOpacity: gradient ? 0.1 : 0,
        marker: {
          enabled: markers ? true : false,
          symbol: "circle",
          lineColor: "white",
          lineWidth: showDataPoints ? 2 : 0,
          radius: showDataPoints ? 4 : 0,
        },
      },
      series: {
        marker: {
          enabled: markers ? true : false,
          symbol: "circle",
          lineColor: "white",
          lineWidth: showDataPoints ? 2 : 0,
          radius: showDataPoints ? 4 : 0,
        },
      },
    },
    tooltip: {
      enabled: tooltip ? true : false,
      backgroundColor: "#111827",
      style: {
        padding: "10px",
        backgroundColor: "#fff",
        border: "2px solid #000",
        position: "relative",
      },
      formatter: function () {
        function formatNumber(value: number): string {
          let formattedValue: string;
          if (value >= 1000 && value <= 1000000) {
            formattedValue = parseFloat((value / 1000).toFixed(2)) + "K";
          } else if (value >= 1000000 && value <= 10000000) {
            formattedValue = parseFloat((value / 1000000).toFixed(2)) + "M";
          } else if (value >= 10000000 && value <= 100000000) {
            formattedValue = parseFloat((value / 10000000).toFixed(2)) + "CR";
          } else if (value >= 100000000 && value <= 10000000000) {
            formattedValue = parseFloat((value / 100000000).toFixed(2)) + "BL";
          } else if (value >= 10000000000) {
            formattedValue =
              parseFloat((value / 10000000000).toFixed(2)) + "TR";
          } else {
            formattedValue = parseFloat(value.toFixed(2)).toString();
          }

          return formattedValue;
        }

        var tooltipCustom =
          '<div style="background-color: #000; color: #fff; padding: 10px; position: relative;">' +
          '<div style="position: absolute; top: -10px; left: 50%; transform: translateX(-50%); width: 0; height: 0; border-left: 10px solid transparent; border-right: 10px solid transparent; border-bottom: 10px solid #000;"></div>' +
          "<b>" +
          this.x +
          "</b>";

        tooltipCustom += this!.points!.reduce(function (s, point) {
          s +=
            '<br/><span style="font-size: 14px; color:' +
            point.color +
            '">' +
            '<span style="font-size: 15px;">•</span>' +
            '<span style="font-size: 15px;"> </span>' +
            formatNumber(point.y as number) +
            "</span>";
          return s;
        }, "");

        tooltipCustom += "</div>";

        return tooltipCustom;
      },
      shared: true,
    },
    series: updatedData,
    exporting: {
      enabled: false,
    },
    credits: {
      enabled: false,
    },
    legend: {
      enabled: false,
    },
  });

  const handleStorageChange = () => {
    setOptions({
      ...options,
      chart: {
        ...options.chart,
        backgroundColor:
          process.browser && localStorage.getItem("theme") === "dark"
            ? "#212b36"
            : "white",
      },
    });
  };

  useEffect(() => {
    if (process.browser) {
      window.addEventListener("storage", handleStorageChange);
    }
    return () => {
      if (process.browser) {
        window.removeEventListener("storage", handleStorageChange);
      }
    };
  }, []);

  useEffect(() => {
    setChartData(data);
    setOptions({
      ...options,
      series: updatedData?.map((data, index) => ({
        // @ts-ignore
        ...options!.series[index],
        data: data.data,
      })),
    });
  }, [data, chartData]);

  return (
    <div className="w-full bg-white dark:bg-dark-secondary rounded">
      <HighchartsReact highcharts={Highcharts} options={options} />
    </div>
  );
};

export default LineChart;
