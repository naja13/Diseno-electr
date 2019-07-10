import React, { Component } from 'react'
const { Line } = require("react-chartjs-2")
var data = [];
var labels = [];
var rgb = [];


class Graph extends Component {
  constructor(props) {
    super(props);
    this.state = {
    }
  }
  componentDidMount(){
    for (var i = 0; i <  10 ; i++) {
      rgb[i] = 'rgba('+Math.random()*256+','+Math.random()*256+','+Math.random()*256+')';
    }
  }
  render() {
    var datasets = [];
    var info = this.props.dataGraph;
    if (data.length < info.length) {
      data.push([0,0])
    }
    for (var i = 0; i < info.length - 2; i++) {
      data[i].push(parseInt(info[i].vel));
      if (data[i].length > 20) {
        data[i].shift();
      }
    }
    labels.push(info[0].Fecha);
    if (labels.length > 20) {
      labels.shift();
    }
    for (i = 0; i < info.length - 2; i++) {
      datasets.push({
        data: data[i],
        label: info[i].idCar,
        fill: false,
        lineTension: 0.1,
        backgroundColor: rgb[i],
        borderColor: rgb[i],
        borderCapStyle: 'butt',
        borderDash: [],
        borderDashOffset: 0.0,
        borderJoinStyle: 'miter',
        pointBorderColor: rgb[i],
        pointBackgroundColor: '#fff',
        pointBorderWidth: 1,
        pointHoverRadius: 5,
        pointHoverBackgroundColor: rgb[i],
        pointHoverBorderColor: rgb[i],
        pointHoverBorderWidth: 2,
        pointRadius: 1,
        pointHitRadius: 10,
      })
    }
    var chartData = {
      labels,
      datasets
    }

    return (
      <div className="limiter">
        <Line
          data={chartData}
          key={Math.random()}
          options={{
            title: {
              display: true,
              text: "Velocidad de los vehículos [Km/h]",
              fontSize: 20
            },
            legend: {
              display: true,
              position: "top"
            },
          }}
        />;
      </div>
    );
  }
}
export default Graph;