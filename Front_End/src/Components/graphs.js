import React, { Component } from 'react'
const { Line } = require("react-chartjs-2")
var rgb = [];


class Graph extends Component {
  constructor(props) {
    super(props);
    this.state = {
      idCar: JSON.parse(localStorage.getItem('Session')).idCar.split(',')
    }
  }
  componentDidMount() {
    for (var i = 0; i < 10; i++) {
      rgb[i] = 'rgba(' + Math.random() * 256 + ',' + Math.random() * 256 + ',' + Math.random() * 256 + ')';
    }
  }
  render() {
    if (info[0].idCar) {
      var datasets = [];
      var data = [];
      var labels = [];
      var info = this.props.dataGraph;
      for (var i = 0; i < info.length; i++) {
        data.push(parseInt(info[i].vel));
        labels.push(info[i].Fecha);
      }
      datasets.push({
        data: data,
        label: info[0].idCar,
        fill: false,
        lineTension: 0.1,
        backgroundColor: 'rgba(' + Math.random() * 256 + ',' + Math.random() * 256 + ',' + Math.random() * 256 + ')',
        borderColor: 'rgba(' + Math.random() * 256 + ',' + Math.random() * 256 + ',' + Math.random() * 256 + ')',
        borderCapStyle: 'butt',
        borderDash: [],
        borderDashOffset: 0.0,
        borderJoinStyle: 'miter',
        pointBorderColor: 'rgba(' + Math.random() * 256 + ',' + Math.random() * 256 + ',' + Math.random() * 256 + ')',
        pointBackgroundColor: '#fff',
        pointBorderWidth: 1,
        pointHoverRadius: 5,
        pointHoverBackgroundColor: 'rgba(' + Math.random() * 256 + ',' + Math.random() * 256 + ',' + Math.random() * 256 + ')',
        pointHoverBorderColor: 'rgba(' + Math.random() * 256 + ',' + Math.random() * 256 + ',' + Math.random() * 256 + ')',
        pointHoverBorderWidth: 2,
        pointRadius: 1,
        pointHitRadius: 10,
      })
      var chartData = {
        labels,
        datasets
      }
    }
    return (
      <div className="limiter">
        <Line
          data={chartData}
          key={Math.random()}
          options={{
            title: {
              display: true,
              text: "Velocidad del vehículo [Km/h]",
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