// create initial empty chart for perfomance
var ctx_live = document.getElementById("performanceChart");
var performanceChart = new Chart(ctx_live, {
type: 'line',
data: {
  labels: [],
  datasets: [{
    data: [],
    borderWidth: 3,
    borderColor: '#00c0ef',
    label: 'CPU usage',
  },
  {
    data: [],
    borderWidth: 3,
    borderColor: '#FF0000',
    label: 'Memory usage',
  }
  ]
},
options: {
  responsive: true,
  title: {
    display: true,
    text: "Chart.js - Dynamically Update Chart Via Ajax Requests",
  },
  legend: {
    display: false
  },
  scales: {
    yAxes: [{
      ticks: {
        beginAtZero: true,
      }
    }]
  }
}
});

// create initial empty chart for IISent
var ctx_live = document.getElementById("internetChartSent");
var internetChartSent = new Chart(ctx_live, {
type: 'bar',
data: {
  labels: ["Sent"],
  datasets: []
},
options: {
  responsive: true,
  title: {
    display: true,
    text: "Chart.js - Dynamically Update Chart Via Ajax Requests",
  },
  legend: {
    display: false
  },
  scales: {
    yAxes: [{
      ticks: {
        beginAtZero: true,
      }
    }]
  }
}
});

// create initial empty chart for IIRecv
var ctx_live = document.getElementById("internetChartRecv");
var internetChartRecv = new Chart(ctx_live, {
type: 'bar',
data: {
  labels: ["Recv"],
  datasets: []
},
options: {
  responsive: true,
  title: {
    display: true,
    text: "Chart.js - Dynamically Update Chart Via Ajax Requests",
  },
  legend: {
    display: false
  },
  scales: {
    yAxes: [{
      ticks: {
        beginAtZero: true,
      }
    }]
  }
}
});

// this post id drives the data
var postId = 1;
// logic to get new data
var getData = function () {
$.ajax({
  url: '/api/v1/getData',
  success: function (data) {
    // process your data to pull out what you plan to use to update the chart
    // e.g. new label and a new data point

    // add new label and data point to chart's underlying data structures
    performanceChart.data.labels.push(postId++);

    performanceChart.data.datasets[0].data.push(data.cpuLoad);
    performanceChart.data.datasets[1].data.push(data.memory);

    // re-render the chart
    performanceChart.update();


    let interfacesMap = createNewDatasets(data.interfaces,internetChartSent, true);
    
    let array = [];
    for (let element of interfacesMap.values()) {
      array.push(element);
    }

    internetChartSent.data.datasets = array;

    // re-render the chart
    internetChartSent.update();

    let interfacesMap2 = createNewDatasets(data.interfaces,internetChartRecv, false);

    let array2 = [];
    for (let element of interfacesMap.values()) {
      array2.push(element);
    }
    internetChartRecv.data.datasets = array2;

    // re-render the chart
    internetChartRecv.update();

  }
});
}

var createNewDatasets = function (inputList, chart, isSent) {
let interfaceMap = new Map();

for (let i = 0; i < chart.data.datasets.length; i++) {
  let currentDataset = chart.data.datasets[i];
  interfaceMap.set(currentDataset.label, currentDataset);
}

for (let i = 0; i < inputList.length; i++) {
  let currentInterface = inputList[i];

  if (interfaceMap.has(currentInterface.label)) {
    interfaceMap.get(currentInterface.label).data[0] = isSent ? currentInterface.sent :
    currentInterface.recv;
  } else {
    let interface = isSent ?
    {
      data: [currentInterface.sent],
      label: currentInterface.label
    }
    :
    {
      data: [currentInterface.recv],
      label: currentInterface.label
    }
    ;

    interfaceMap.set(currentInterface.label, interface);
  }
}
return interfaceMap;
};




// get new data every 5 seconds
setInterval(getData, 5000);