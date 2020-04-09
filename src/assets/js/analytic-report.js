////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
let myBorderWidth = 3;
if ($(window).width() > 990) {
    myBorderWidth = 3;
} else if ($(window).width() > 640) {
    myBorderWidth = 2;
} else {
    myBorderWidth = 2;
}


// line chart1
var canvasline1 = document.getElementById("line1");
var ctxline1 = canvasline1.getContext("2d");

// var originalStroke1 = ctxline1.stroke;
// ctxline1.stroke = function () {
//     ctxline1.save();
//     ctxline1.shadowColor = 'rgba(65, 210, 231, 0.3)';
//     ctxline1.shadowBlur = 10;
//     ctxline1.shadowOffsetX = 0;
//     ctxline1.shadowOffsetY = 5;
//     originalStroke1.apply(this, arguments)
//     ctxline1.restore();
// }

var line1 = new Chart(ctxline1, {
    type: 'line',
    data: {
        labels: ["JAN", "FEB", "MAR", "APR", "MAY", "JUN", "JUL", "AUG", "SEP", "OCT",
            "NOV", "DEC"
        ],
        datasets: [{
            label: "June",
            borderColor: '#44C3EB',
            borderWidth: myBorderWidth,
            fill: false,
            data: [20, 35, 40, 35, 15, 45, 70, 45, 20, 15, 20, 35],
            bezierCurve: true,
            pointRadius: myBorderWidth,
            pointHoverRadius: myBorderWidth + 1,
            pointBorderColor: "#44C3EB",
            pointBackgroundColor: "#fff",
        }]
    },
    options: {
        responsive: true,
        hoverMode: 'index',
        stacked: false,
        tooltips: {
            callbacks: {
                label: function (tooltipItem) {
                    return "$" + Number(tooltipItem.yLabel);
                }
            },
            backgroundColor: '#FFF',
            titleFontSize: 14,
            titleFontColor: '#000',
            bodyFontColor: '#000',
            bodyFontSize: 14,
            displayColors: false
        },
        legend: {
            display: false,
        },
        title: {
            display: false,
            text: 'Line Chart - Multi Axis'
        },
        scales: {
            xAxes: [{
                gridLines: {
                    display: false,
                },
                ticks: {
                    fontFamily: 'regular',
                    fontSize: 12,
                    fontColor: '#90A1B7',
                },
            }],
            yAxes: [{
                gridLines: {
                    drawBorder: false,
                },
                ticks: {
                    beginAtZero: true,
                    suggestedMax: 100,
                    fontFamily: 'regular',
                    fontSize: 12,
                    fontColor: '#1C2D41',
                    stepSize: 20,
                    padding: 20,
                    callback: function (label, index, labels) {
                        return ' $ ' + label;
                    }
                }
            }]
        }
    }
});


////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

// line chart2
var canvasline2 = document.getElementById("line2");
var ctxline2 = canvasline2.getContext("2d");

// var originalStroke2 = ctxline2.stroke;
// ctxline2.stroke = function () {
//     ctxline2.save();
//     ctxline2.shadowColor = 'rgba(104, 75, 212, 0.3)';
//     ctxline2.shadowBlur = 10;
//     ctxline2.shadowOffsetX = 0;
//     ctxline2.shadowOffsetY = 5;
//     originalStroke2.apply(this, arguments)
//     ctxline2.restore();
// }

var line2 = new Chart(ctxline2, {
    type: 'line',
    data: {
        labels: ["JAN", "FEB", "MAR", "APR", "MAY", "JUN", "JUL", "AUG", "SEP", "OCT",
            "NOV", "DEC"
        ],
        datasets: [{
            label: "June",
            borderColor: '#684BD4',
            borderWidth: myBorderWidth,
            fill: false,
            data: [20, 35, 20, 35, 15, 45, 70, 45, 20, 15, 20, 70],
            bezierCurve: true,
            pointRadius: myBorderWidth,
            pointHoverRadius: myBorderWidth + 1,
            pointBorderColor: "#684BD4",
            pointBackgroundColor: "#fff",
        }]
    },
    options: {
        responsive: true,
        hoverMode: 'index',
        stacked: false,
        tooltips: {
            callbacks: {
                label: function (tooltipItem) {
                    return "$" + Number(tooltipItem.yLabel);
                }
            },
            backgroundColor: '#FFF',
            titleFontSize: 14,
            titleFontColor: '#000',
            bodyFontColor: '#000',
            bodyFontSize: 14,
            displayColors: false
        },
        legend: {
            display: false,
        },
        title: {
            display: false,
            text: 'Line Chart - Multi Axis'
        },
        scales: {
            xAxes: [{
                gridLines: {
                    display: false,
                },
                ticks: {
                    fontFamily: 'regular',
                    fontSize: 12,
                    fontColor: '#90A1B7',
                },
            }],
            yAxes: [{
                gridLines: {
                    drawBorder: false,
                },
                ticks: {
                    beginAtZero: true,
                    suggestedMax: 100,
                    fontFamily: 'regular',
                    fontSize: 12,
                    fontColor: '#1C2D41',
                    stepSize: 20,
                    padding: 20,
                    callback: function (label, index, labels) {
                        return ' $ ' + label;
                    }
                }
            }]
        }
    }
});


////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

// line chart3
var canvasline3 = document.getElementById("line3");
var ctxline3 = canvasline3.getContext("2d");

// var originalStroke3 = ctxline3.stroke;
// ctxline3.stroke = function () {
//     ctxline3.save();
//     ctxline3.shadowColor = 'rgba(255, 131, 36, 0.3)';
//     ctxline3.shadowBlur = 10;
//     ctxline3.shadowOffsetX = 0;
//     ctxline3.shadowOffsetY = 5;
//     originalStroke3.apply(this, arguments)
//     ctxline3.restore();
// }

var line3 = new Chart(ctxline3, {
    type: 'line',
    data: {
        labels: ["JAN", "FEB", "MAR", "APR", "MAY", "JUN", "JUL", "AUG", "SEP", "OCT",
            "NOV", "DEC"
        ],
        datasets: [{
            label: "June",
            borderColor: '#FF8324',
            borderWidth: myBorderWidth,
            fill: false,
            data: [20, 35, 40, 70, 15, 45, 70, 45, 20, 15, 80, 35],
            bezierCurve: true,
            pointRadius: myBorderWidth,
            pointHoverRadius: myBorderWidth + 1,
            pointBorderColor: "#FF8324",
            pointBackgroundColor: "#fff",
        }]
    },
    options: {
        responsive: true,
        hoverMode: 'index',
        stacked: false,
        tooltips: {
            callbacks: {
                label: function (tooltipItem) {
                    return "$" + Number(tooltipItem.yLabel);
                }
            },
            backgroundColor: '#FFF',
            titleFontSize: 14,
            titleFontColor: '#000',
            bodyFontColor: '#000',
            bodyFontSize: 14,
            displayColors: false
        },
        legend: {
            display: false,
        },
        title: {
            display: false,
            text: 'Line Chart - Multi Axis'
        },
        scales: {
            xAxes: [{
                gridLines: {
                    display: false,
                },
                ticks: {
                    fontFamily: 'regular',
                    fontSize: 12,
                    fontColor: '#90A1B7',
                },
            }],
            yAxes: [{
                gridLines: {
                    drawBorder: false,
                },
                ticks: {
                    beginAtZero: true,
                    suggestedMax: 100,
                    fontFamily: 'regular',
                    fontSize: 12,
                    fontColor: '#1C2D41',
                    stepSize: 20,
                    padding: 20,
                    callback: function (label, index, labels) {
                        return ' $ ' + label;
                    }
                }
            }]
        }
    }
});


////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

// line chart4
var canvasline4 = document.getElementById("line4");
var ctxline4 = canvasline4.getContext("2d");

// var originalStroke4 = ctxline4.stroke;
// ctxline4.stroke = function () {
//     ctxline4.save();
//     ctxline4.shadowColor = 'rgba(17, 203, 122, 0.3)';
//     ctxline4.shadowBlur = 10;
//     ctxline4.shadowOffsetX = 0;
//     ctxline4.shadowOffsetY = 5;
//     originalStroke4.apply(this, arguments)
//     ctxline4.restore();
// }

var line4 = new Chart(ctxline4, {
    type: 'line',
    data: {
        labels: ["JAN", "FEB", "MAR", "APR", "MAY", "JUN", "JUL", "AUG", "SEP", "OCT",
            "NOV", "DEC"
        ],
        datasets: [{
            label: "June",
            borderColor: '#11CB7A',
            borderWidth: myBorderWidth,
            fill: false,
            data: [30, 10, 40, 35, 80, 45, 70, 45, 20, 15, 85, 35],
            bezierCurve: true,
            pointRadius: myBorderWidth,
            pointHoverRadius: myBorderWidth + 1,
            pointBorderColor: "#11CB7A",
            pointBackgroundColor: "#fff",
        }]
    },
    options: {
        responsive: true,
        hoverMode: 'index',
        stacked: false,
        tooltips: {
            callbacks: {
                label: function (tooltipItem) {
                    return "$" + Number(tooltipItem.yLabel);
                }
            },
            backgroundColor: '#FFF',
            titleFontSize: 14,
            titleFontColor: '#000',
            bodyFontColor: '#000',
            bodyFontSize: 14,
            displayColors: false
        },
        legend: {
            display: false,
        },
        title: {
            display: false,
            text: 'Line Chart - Multi Axis'
        },
        scales: {
            xAxes: [{
                gridLines: {
                    display: false,
                },
                ticks: {
                    fontFamily: 'regular',
                    fontSize: 12,
                    fontColor: '#90A1B7',
                },
            }],
            yAxes: [{
                gridLines: {
                    drawBorder: false,
                },
                ticks: {
                    beginAtZero: true,
                    suggestedMax: 100,
                    fontFamily: 'regular',
                    fontSize: 12,
                    fontColor: '#1C2D41',
                    stepSize: 20,
                    padding: 20,
                    callback: function (label, index, labels) {
                        return ' $ ' + label;
                    }
                }
            }]
        }
    }
});

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

// line chart5
var canvasline5 = document.getElementById("line5");
var ctxline5 = canvasline5.getContext("2d");

// var originalStroke5 = ctxline5.stroke;
// ctxline5.stroke = function () {
//     ctxline5.save();
//     ctxline5.shadowColor = 'rgba(245, 184, 0, 0.3)';
//     ctxline5.shadowBlur = 10;
//     ctxline5.shadowOffsetX = 0;
//     ctxline5.shadowOffsetY = 5;
//     originalStroke5.apply(this, arguments)
//     ctxline5.restore();
// }

var line5 = new Chart(ctxline5, {
    type: 'line',
    data: {
        labels: ["JAN", "FEB", "MAR", "APR", "MAY", "JUN", "JUL", "AUG", "SEP", "OCT",
            "NOV", "DEC"
        ],
        datasets: [{
            label: "June",
            borderColor: '#F5B800',
            borderWidth: myBorderWidth,
            fill: false,
            data: [20, 35, 75, 35, 15, 45, 70, 45, 20, 15, 45, 35],
            bezierCurve: true,
            pointRadius: myBorderWidth,
            pointHoverRadius: myBorderWidth + 1,
            pointBorderColor: "#F5B800",
            pointBackgroundColor: "#fff",
        }]
    },
    options: {
        responsive: true,
        hoverMode: 'index',
        stacked: false,
        tooltips: {
            callbacks: {
                label: function (tooltipItem) {
                    return "$" + Number(tooltipItem.yLabel);
                }
            },
            backgroundColor: '#FFF',
            titleFontSize: 14,
            titleFontColor: '#000',
            bodyFontColor: '#000',
            bodyFontSize: 14,
            displayColors: false
        },
        legend: {
            display: false,
        },
        title: {
            display: false,
            text: 'Line Chart - Multi Axis'
        },
        scales: {
            xAxes: [{
                gridLines: {
                    display: false,
                },
                ticks: {
                    fontFamily: 'regular',
                    fontSize: 12,
                    fontColor: '#90A1B7',
                },
            }],
            yAxes: [{
                gridLines: {
                    drawBorder: false,
                },
                ticks: {
                    beginAtZero: true,
                    suggestedMax: 100,
                    fontFamily: 'regular',
                    fontSize: 12,
                    fontColor: '#1C2D41',
                    stepSize: 20,
                    padding: 20,
                    callback: function (label, index, labels) {
                        return ' $ ' + label;
                    }
                }
            }]
        }
    }
});


////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

// line chart6
var canvasline6 = document.getElementById("line6");
var ctxline6 = canvasline6.getContext("2d");

// var originalStroke6 = ctxline6.stroke;
// ctxline6.stroke = function () {
//     ctxline6.save();
//     ctxline6.shadowColor = 'rgba(65, 210, 231, 0.3)';
//     ctxline6.shadowBlur = 10;
//     ctxline6.shadowOffsetX = 0;
//     ctxline6.shadowOffsetY = 5;
//     originalStroke6.apply(this, arguments)
//     ctxline6.restore();
// }

var line6 = new Chart(ctxline6, {
    type: 'line',
    data: {
        labels: ["JAN", "FEB", "MAR", "APR", "MAY", "JUN", "JUL", "AUG", "SEP", "OCT",
            "NOV", "DEC"
        ],
        datasets: [{
            label: "June",
            borderColor: '#44C3EB',
            borderWidth: myBorderWidth,
            fill: false,
            data: [20, 35, 40, 35, 15, 45, 70, 45, 20, 15, 20, 35],
            bezierCurve: true,
            pointRadius: myBorderWidth,
            pointHoverRadius: myBorderWidth + 1,
            pointBorderColor: "#44C3EB",
            pointBackgroundColor: "#fff",
        }]
    },
    options: {
        responsive: true,
        hoverMode: 'index',
        stacked: false,
        tooltips: {
            callbacks: {
                label: function (tooltipItem) {
                    return "$" + Number(tooltipItem.yLabel);
                }
            },
            backgroundColor: '#FFF',
            titleFontSize: 14,
            titleFontColor: '#000',
            bodyFontColor: '#000',
            bodyFontSize: 14,
            displayColors: false
        },
        legend: {
            display: false,
        },
        title: {
            display: false,
            text: 'Line Chart - Multi Axis'
        },
        scales: {
            xAxes: [{
                gridLines: {
                    display: false,
                },
                ticks: {
                    fontFamily: 'regular',
                    fontSize: 12,
                    fontColor: '#90A1B7',
                },
            }],
            yAxes: [{
                gridLines: {
                    drawBorder: false,
                },
                ticks: {
                    beginAtZero: true,
                    suggestedMax: 100,
                    fontFamily: 'regular',
                    fontSize: 12,
                    fontColor: '#1C2D41',
                    stepSize: 20,
                    padding: 20,
                    callback: function (label, index, labels) {
                        return ' $ ' + label;
                    }
                }
            }]
        }
    }
});


////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

// line chart7
var canvasline7 = document.getElementById("line7");
var ctxline7 = canvasline7.getContext("2d");

// var originalStroke7 = ctxline7.stroke;
// ctxline7.stroke = function () {
//     ctxline7.save();
//     ctxline7.shadowColor = 'rgba(104, 75, 212, 0.3)';
//     ctxline7.shadowBlur = 10;
//     ctxline7.shadowOffsetX = 0;
//     ctxline7.shadowOffsetY = 5;
//     originalStroke7.apply(this, arguments)
//     ctxline7.restore();
// }

var line7 = new Chart(ctxline7, {
    type: 'line',
    data: {
        labels: ["JAN", "FEB", "MAR", "APR", "MAY", "JUN", "JUL", "AUG", "SEP", "OCT",
            "NOV", "DEC"
        ],
        datasets: [{
            label: "June",
            borderColor: '#684BD4',
            borderWidth: myBorderWidth,
            fill: false,
            data: [20, 35, 20, 35, 15, 45, 70, 45, 20, 15, 20, 70],
            bezierCurve: true,
            pointRadius: myBorderWidth,
            pointHoverRadius: myBorderWidth + 1,
            pointBorderColor: "#684BD4",
            pointBackgroundColor: "#fff",
        }]
    },
    options: {
        responsive: true,
        hoverMode: 'index',
        stacked: false,
        tooltips: {
            callbacks: {
                label: function (tooltipItem) {
                    return "$" + Number(tooltipItem.yLabel);
                }
            },
            backgroundColor: '#FFF',
            titleFontSize: 14,
            titleFontColor: '#000',
            bodyFontColor: '#000',
            bodyFontSize: 14,
            displayColors: false
        },
        legend: {
            display: false,
        },
        title: {
            display: false,
            text: 'Line Chart - Multi Axis'
        },
        scales: {
            xAxes: [{
                gridLines: {
                    display: false,
                },
                ticks: {
                    fontFamily: 'regular',
                    fontSize: 12,
                    fontColor: '#90A1B7',
                },
            }],
            yAxes: [{
                gridLines: {
                    drawBorder: false,
                },
                ticks: {
                    beginAtZero: true,
                    suggestedMax: 100,
                    fontFamily: 'regular',
                    fontSize: 12,
                    fontColor: '#1C2D41',
                    stepSize: 20,
                    padding: 20,
                    callback: function (label, index, labels) {
                        return ' $ ' + label;
                    }
                }
            }]
        }
    }
});