// total investment
var options = {
  series: [14, 23, 21, 17, 15, 10, 12, 17, 21],
  chart: {
    type: "polarArea",
    height: 237,
  },
  stroke: {
    colors: ["#fff"],
  },
  colors: [
    EdminAdminConfig.tertiary,
    EdminAdminConfig.secondary,
    EdminAdminConfig.primary,
  ],
  fill: {
    opacity: 0.9,
  },
  grid: {
    show: true,
    borderColor: "#000000",
  },
  legend: {
    show: false,
  },
  plotOptions: {
    polarArea: {
      rings: {
        strokeColor: EdminAdminConfig.light,
      },
      spokes: {
        connectorColors: EdminAdminConfig.light,
      },
    },
  },
  yaxis: {
    show: false,
    dataLabels: {
      enabled: true,
    },
    labels: {
      formatter: function (val) {
        return "$ " + val;
      },
    },
  },
  tooltip: {
    y: {
      formatter: function (val) {
        return "$ " + val;
      },
      labels: {
        show: false,
      },
    },
  },
  responsive: [
    {
      breakpoint: 1400,
      options: {
        chart: {
          height: 300,
        },
      },
    },
    {
      breakpoint: 1217,
      options: {
        chart: {
          height: 250,
        },
      },
    },
    {
      breakpoint: 1200,
      options: {
        chart: {
          height: 235,
        },
      },
    },
  ],
};
var chart = new ApexCharts(document.querySelector("#investment"), options);
chart.render();

//invest chart
var options = {
  series: [
    {
      name: "Earning",
      data: [
        200, 120, 280, 80, 200, 220, 120, 300, 195, 100, 30, 200, 110, 100, 210,
        230,
      ],
    },
    {
      name: "Earning",
      data: [100, 25, 10, 12, 13, 15, 10, 15, 10, 12, 14, 10, 08],
    },
  ],
  chart: {
    type: "bar",
    toolbar: {
      show: false,
    },
    height: 208,
    stacked: true,
  },
  states: {
    hover: {
      filter: {
        type: "darken",
        value: 1,
      },
    },
  },
  
  plotOptions: {
    bar: {
      horizontal: false,
      endingShape: "rounded",
      startingShape: "rounded",
      borderRadius: 2,
      columnWidth: "50%",
    },
  },
  dataLabels: {
    enabled: false,
  },
  grid: {
    show: true,
    strokeDashArray: 3,
    borderColor: "rgba(106, 113, 133, 0.30)",
  },
  xaxis: {
    categories: [
      "Sun",
      "",
      "Mon",
      "",
      "",
      "Tue",
      "",
      "",
      "Wed",
      "",
      "",
      "Thu",
      "",
      "Fri",
      "",
      "Sat",
    ],
    offsetX: 0,
    offsetY: 0,
    axisBorder: {
      low: 0,
      offsetX: 0,
      show: false,
    },
    axisTicks: {
      show: false,
    },
  },
  yaxis: {
    categories: ["$ 0", "$ 100", "$ 200", "$ 300", "$ 400"],
    labels: {
      formatter: function (val) {
        return "$" + val;
      },
    },
  },
  fill: {
    opacity: 1,
    colors: [EdminAdminConfig.primary, EdminAdminConfig.light],
  },
  tooltip: {
    enabled: true,
  },
  legend: {
    show: false,
  },
  responsive: [
    {
      breakpoint: 1500,
      options: {
        yaxis: {
          labels: {
            show: false,  // Hide y-axis labels for this breakpoint
          },
        },
      },
    },
    {
      breakpoint: 1400,
      options: {
        chart: {
          height: 195,
        },
      },
    },
    {
      breakpoint: 1236,
      options: {
        chart: {
          height: 210,
        },
      },
    },
    {
      breakpoint: 1200,
      options: {
        yaxis: {
          labels: {
            show: true,  // Hide y-axis labels for this breakpoint
          },
        },
      },
    },
    
  ],
};
var chart = new ApexCharts(document.querySelector("#investing"), options);
chart.render();
// client chart
var options = {
  series: [
    {
      data: [
        40, 50, 50, 50, 25, 25, 25, 60, 60, 60, 60, 45, 45, 45, 45, 25, 25, 25,
        25, 25, 60,
      ],
    },
  ],
  chart: {
    type: "line",
    height: 85,
    sparkline: {
      enabled: true,
    },
    dropShadow: {
      enabled: true,
      top: 8,
      left: 3,
      blur: 2,
      color: EdminAdminConfig.primary,
      opacity: 0.4,
    },
  },
  stroke: {
    curve: "stepline",
    width: 2,
  },
  colors: [EdminAdminConfig.primary],
  fill: {
    opacity: [0.5, 0.25, 1],
  },
  dataLabels: {
    enabled: false,
  },
  tooltip: {
    enabled: false,
  },
  markers: {
    hover: {
      sizeOffset: 4,
    },
    discrete: [
      {
        seriesIndex: 0,
        dataPointIndex: 1,
        fillColor: "#fff",
        strokeColor: EdminAdminConfig.primary,
        size: 3,
        shape: "circle",
      },
      {
        seriesIndex: 0,
        dataPointIndex: 4,
        fillColor: "#fff",
        strokeColor: EdminAdminConfig.primary,
        size: 3,
        shape: "circle",
      },
      {
        seriesIndex: 0,
        dataPointIndex: 7,
        fillColor: "#fff",
        strokeColor: EdminAdminConfig.primary,
        size: 3,
        shape: "circle",
      },
      {
        seriesIndex: 0,
        dataPointIndex: 11,
        fillColor: "#fff",
        strokeColor: EdminAdminConfig.primary,
        size: 3,
        shape: "circle",
      },
      {
        seriesIndex: 0,
        dataPointIndex: 15,
        fillColor: "#fff",
        strokeColor: EdminAdminConfig.primary,
        size: 3,
        shape: "circle",
      },
      {
        seriesIndex: 0,
        dataPointIndex: 20,
        fillColor: "#fff",
        strokeColor: EdminAdminConfig.primary,
        size: 3,
        shape: "circle",
      },
    ],
  },
  responsive: [
    {
      breakpoint: 1400,
      options: {
        chart: {
          height: 75,
        }
      },
    },
    {
      breakpoint: 1236,
      options: {
        chart: {
          height: 80,
        }
      },
    },
    {
      breakpoint: 1200,
      options: {
        chart: {
          height: 85,
        }
      },
    },
  ],
};

var chart = new ApexCharts(document.querySelector("#client"), options);
chart.render();

// New project

var Options = {
  series: [
    {
      name: "series1",
      data: [25, 30, 45, 25, 20, 22, 18, 19, 14],
    },
  ],
  colors: [
    EdminAdminConfig.secondary,
    "#f6ecf8",
    EdminAdminConfig.secondary,
    "#f6ecf8",
    EdminAdminConfig.secondary,
    "#f6ecf8",
    EdminAdminConfig.secondary,
    "#f6ecf8",
  ],
  chart: {
    height: 85,
    type: "bar",
    sparkline: {
      enabled: true,
    },
  },
  dataLabels: {
    enabled: false,
  },
  tooltip: {
    enabled: false,
    labels: {
      formatter: function (val) {
        return val;
      },
    },
  },
  stroke: {
    curve: "smooth",
  },
  plotOptions: {
    bar: {
      vertical: true,
      borderRadius: 3,
      distributed: true,
      columnWidth: "55%",
    },
  },
  responsive: [
    {
      breakpoint: 1701,
      options: {
        chart: {
          height: 78,
        }
      },
    },
    {
      breakpoint: 1236,
      options: {
        chart: {
          height: 80,
        }
      },
    },
    {
      breakpoint: 1200,
      options: {
        chart: {
          height: 85,
        }
      },
    },
  ],
};
var chart = new ApexCharts(document.querySelector("#project"), Options);
chart.render();

// all invoice
const datatable = new simpleDatatables.DataTable("#all-invoice", {
  paging: false,
  tabIndex: 2,
  sortable: false,
});
// total visit
var options = {
  series: [
    {
      name: "series1",
      data: [340, 20, 320, 40, 300, 20],
    },
    {
      name: "series2",
      data: [260, 300, 60, 220, 40, 320],
    },
  ],
  chart: {
    height: 80,
    type: "line",
    dropShadow: {
      enabled: true,
      top: 3,
      left: 1,
      blur: 3,
      color: [EdminAdminConfig.primary, EdminAdminConfig.secondary],
      opacity: 0.4,
    },
    toolbar: {
      show: false,
    },
  },
  dataLabels: {
    enabled: false,
  },
  tooltip: {
    enabled: false,
  },
  stroke: {
    curve: "smooth",
    width: 2,
  },
  colors: [EdminAdminConfig.primary, EdminAdminConfig.secondary],
  grid: {
    show: false,
  },
  xaxis: {
    show: false,
    axisBorder: {
      show: false,
    },
    axisTicks: {
      show: false,
    },
    labels: {
      show: false,
    },
  },
  yaxis: {
    show: false,
  },
  legend: {
    show: false,
  },
};

var chart = new ApexCharts(document.querySelector(".visit-chart"), options);
chart.render();
// total earning
var options = {
  series: [
    {
      data: [12, 10, 6, 14],
    },
  ],
  chart: {
    height: 125,
    type: "bar",
    offsetX: -10,
    toolbar: {
      show: false,
    },
    events: {
      click: function (chart, w, e) {},
    },
  },
  colors: [
    EdminAdminConfig.light,
    EdminAdminConfig.light,
    EdminAdminConfig.light,
    EdminAdminConfig.primary,
  ],
  plotOptions: {
    bar: {
      columnWidth: "45%",
      distributed: true,
    },
  },
  dataLabels: {
    enabled: false,
  },
  tooltip: {
    enabled: false,
  },
  grid: {
    show: true,
    strokeDashArray: 3,
    borderColor: "rgba(106, 113, 133, 0.30)",
  },
  legend: {
    show: false,
  },
  xaxis: {
    categories: ["21/11", "22/11", "23/11", "24/11"],
    axisBorder: {
      show: false,
    },
    axisTicks: {
      show: false,
    },
    labels: {
      style: {
        colors: [
          EdminAdminConfig.light,
          EdminAdminConfig.light,
          EdminAdminConfig.light,
          EdminAdminConfig.primary,
        ],
        fontSize: "12px",
      },
    },
  },
  yaxis: {
    categories: ["10K", "15K", "20K"],
    labels: {
      formatter: function (val) {
        return val + "K";
      },
    },
  },
  responsive: [
    {
      breakpoint: 1800,
      options: {
        yaxis: {
          labels: {
            show: false,  // Hide y-axis labels for this breakpoint
          },
        },
      },
    },
    {
      breakpoint: 1600,
      options: {
        chart: {
          height: 110,
        },
        xaxis: {
          labels: {
            style: {
              fontSize: "5px",
            },
          },
        },
      },
    },
    {
      breakpoint: 1530,
      options: {
        xaxis: {
          labels: {
            show: false,  // Hide y-axis labels for this breakpoint
          },
        },
      },
    },
    {
      breakpoint: 1200,
      options: {
        xaxis: {
          labels: {
            show: true,  // Hide y-axis labels for this breakpoint
          },
        },
        yaxis: {
          labels: {
            show: true,  // Hide y-axis labels for this breakpoint
          },
        },
      },
    },
    {
      breakpoint: 500,
      options: {
        xaxis: {
          labels: {
            show: false,  // Hide y-axis labels for this breakpoint
          },
        },
      },
    },
    {
      breakpoint: 400,
      options: {
        yaxis: {
          labels: {
            show: false,  // Hide y-axis labels for this breakpoint
          },
        },
      },
    },
  ],
};
var chart = new ApexCharts(document.querySelector("#earn-chart"), options);
chart.render();
// team member
var options = {
  series: [
    {
      name: "team 1", 
      data: [10, 10, 6, 6, 12, 12, 16, 16, 16],
    },
  ],
  chart: {
    height: 70,
    type: "line",
    opacity: 1,
    toolbar: {
      show: false,
    },
    dropShadow: {
      enabled: true,
      top: 2,
      left: 3,
      blur: 2,
      color: EdminAdminConfig.dark,
      opacity: 0.2,
    },
  },
  grid: {
    yaxis: {
      lines: {
        show: false,
      },
    },
  },
  dataLabels: {
    enabled: false,
  },
  fill: {
    opacity: [0.5, 0.25, 1],
  },
  stroke: {
    width: [3, 3],
    curve: "straight",
  },
  annotations: {
    points: [
      {
        x: 40,
        y: 10,
        marker: {
          size: 6,
          fillColor: EdminAdminConfig.tertiary, // Change the color to your desired color
          strokeColor: '#fff', // Change the color to your desired color
          strokeWidth: 3,
          shape: "circle",
          radius: 2,
        },
      },
    ],
  },
  xaxis: {
    offsetX: 0,
    offsetY: 0,
    labels: {
      low: 0,
      offsetX: 0,
      show: false,
    },
    axisBorder: {
      low: 0,
      offsetX: 0,
      show: false,
    },
    axisTicks: {
      show: false,
    },
  },
  legend: {
    show: false,
  },
  yaxis: {
    show: false,
  },
  tooltip: {
    enabled: false,
    x: {
      format: "MM",
    },
  },
  colors: [EdminAdminConfig.tertiary],
  responsive: [
    {
      breakpoint: 1530,
      options: {
        chart: {
          height: 90,
        },
      },
    },
  ],
};
var chart = new ApexCharts(document.querySelector("#team-chart"), options);
chart.render();

// monthly overview
var options = {
  series: [{
  name: 'Cash Flow',
  data: [-66, 50, 150, 66, 50, 150, -79, -50, -136, -54, -40, -140, 79, 49, -150, -70,
    50, 140, 60, 44, 130, -66, -30, -130, -70, -50,
  ]
}],
  chart: {
  type: 'bar',
  height: 290,
  offsetX: 0,
  offsetY: 0,
  toolbar: {
    show: false,
  },
},
plotOptions: {
  bar: {
    colors: {
      ranges: [
        {
          from: -150,
          to: -81,
          color: EdminAdminConfig.primary,
        }, 
        {
          from: -80,
          to: -51,
          color: EdminAdminConfig.secondary,
        },
        {
          from: -50,
          to: 0,
          color: EdminAdminConfig.tertiary,
        },
        {
          from: 0,
          to: 50,
          color: EdminAdminConfig.tertiary, 
        },
        {
          from: 51,
          to: 80,
          color: EdminAdminConfig.secondary,
        },
        {
          from: 81,
          to: 150,
          color: EdminAdminConfig.primary,
        }
      ]
    },
    columnWidth: '70%',
    borderRadius: 2
  }
},

colors: [
  EdminAdminConfig.primary
],
dataLabels: {
  enabled: false,
},
yaxis: {
  title: {
    show: false,
  },
  labels: {
    formatter: function (y) {
      return y.toFixed(0) + "%";
    }
  }
},

grid: {
  show: true,
  strokeDashArray: 3,
  borderColor: "rgba(106, 113, 133, 0.30)",
},
xaxis: {
  categories: [
    'Jan', '', 'Feb', '', 'Mar', '',
    'Apr', '', '', 'May', '', '',
    'Jun', '', '', 'Jul', '', 'Aug',
    '', 'Sep', '', 'Oct', '', 'Nov',
    '', 'Dec',
  ],
  labels: {
    rotate: -90,
    
  },
  axisBorder: {
    low: 0,
    offsetX: 0,
    show: false,
  },
  axisTicks: {
    show: false,
},
},
responsive: [
  {
    breakpoint: 1600,
    options: {
      chart: {
        height: 270,
      },
    },
  },
  {
    breakpoint: 380,
    options: {
      yaxis: {
        labels: {
          show: false,  // Hide y-axis labels for this breakpoint
        },
      },
    },
  },
],
};

var chart = new ApexCharts(document.querySelector("#monthly-overview"), options);
chart.render();