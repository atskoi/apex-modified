import React, { useState, useEffect } from "react";
// import "./apexcharts/apexcharts.js";
// import "./apexcharts/apexcharts.css";

const MarkerCharts = (props) => {
  const [options, setOptions] = useState({
    chart: {
      width: 1500,
      height: 600,
      type: "line",
      stacked: false,
      // animations: {speed: [0.5, 0.5, 0.5]}
    },
    dataLabels: {
      enabled: false
    },
    colors: ["#FF1654", "#247BA0", "#843f32"],
    series: [
      {
        name: "Series A",
        data: [1.4, 2, 2.5, 1.5, 2.5, 2.8, 3.8, 4.6, 2.2, 3.5, 3.9]
      },
      {
        name: "Series B",
        data: [20, 29, 37, 36, 44, 48, 30, 58, 40, 32, 31]
      },
      {
        name: "Series C",
        data: [5, 10, 15, 20, 25, 20, 35, 40, 43, 32, 22]
      },
      {
        name: "Series D",
        data: [2, 8, 3, 4, 1, 2, 6, 3, 7, 6, 2]
      },
      {
        name: "Series E",
        data: [7, 3, 2, 5, 3, 7, 7, 5, 8, 7, 9]
      }
    ],
    stroke: {
      width: [1, 1, 1]
    },
    plotOptions: {
      bar: {
        columnWidth: "20%"
      }
    },
    xaxis: {
      categories: [2009, 2010, 2011, 2012, 2013, 2014, 2015, 2016, 2017, 2018, 2019, 2020, 2021, 2022],
    },
    yaxis: [
      {
        axisTicks: {
          show: true
        },
        axisBorder: {
          show: true,
          color: "#FF1654"
        },
        labels: {
          style: {
            colors: "#FF1654"
          }
        },
        title: {
          text: "Series A",
          style: {
            color: "#FF1654"
          }
        }
      },
      {
        opposite: true,
        axisTicks: {
          show: true
        },
        axisBorder: {
          show: true,
          color: "#247BA0"
        },
        labels: {
          style: {
            colors: "#247BA0"
          }
        },
        title: {
          text: "Series B",
          style: {
            color: "#247BA0"
          }
        }
      }
    ],
    tooltip: {
      shared: false,
      intersect: true,
      x: {
        show: false
      }
    },
    legend: {
      horizontalAlign: "left",
      offsetX: 40
    },
    markers: {
      size: [5, 5, 5, 5, 5, 5, 5, 5, 5, 2.5, 2.5, 2.5],
      colors: ['#ffffff', '#ffffff', '#5480ff', '#13cfff', '#ff0604', '#ff7111', '#ff9f13', '#ffd62a', '#ffbcde', '#000000', 'transparent', '#000000'],
      strokeColors: ['#4949a4', '#4545ff', '#5480ff', '#13cfff', '#ff0604', '#ff7111', '#ff9f13', '#ffd62a', '#ffbcde', '#000000', '#ffffff', '#000000'],
      strokeWidth: [1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 4, 4],
      strokeOpacity: [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
      strokeDashArray: [1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 4, 4],
      fillOpacity: [1, 1, 0 , 0 , 0 ,0 ,0 ,0 ,0 ,0],
      discrete: [],
      shape: ["circle","diamond","rect","triangle","circle-trans","square-trans","rect","rect","circle",'rect',"rect","rect"],
      //shape: ["circle","square","triangle","diamond","circle","square","triangle","diamond","circle"],
      radius: 0,
      offsetX: 0,
      offsetY: 0,
      onClick: undefined,
      onDblClick: undefined,
      showNullDataPoints: true,
      hover: {
      size: undefined,
      sizeOffset: 3
      }
    }
  }
  );

  const [loaded, setLoaded] = useState(false)

  useEffect(() => {
    var chart = new window.ApexCharts(document.querySelector("#chart"), options);
    chart.render();
  }, [])

  return (
    <div id="chart" className="app" key={1}>
    </div>
  );
}

export default MarkerCharts;