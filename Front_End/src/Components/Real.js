import React, { Component } from 'react';
import '../App.css';
import Graph from './Graph';
import Nav from '../Components/Navegacion';





var dataGraph = [{vel: 0, Fecha: "Inicio"},{vel: 0, Fecha: "Inicio"}];


var idCar1 = ["XXXXXX"];


export class Real extends Component {
  constructor(props) {
    super(props);
    this.state = {
      datos: []
    }
  }

  componentDidMount() {
    loadScript("https://maps.googleapis.com/maps/api/js?key=AIzaSyDYNzG1CYSeQy-CEC3qAXca5-cmj-Cd6ho&libraries=drawing&callback=initMap")
    window.initMap = this.processMap;
  
    this.getData1();
    this.interval = setInterval(() => this.getData1(), 5000);
  }

  componentWillUnmount() {
    clearInterval(this.interval);
  }
  getData1 = _ => {this.setState({datos:"kk"})}
  

  processMap = () => {
    var map = new window.google.maps.Map(document.getElementById('map'), {
      center: { lat: 11.01947, lng: -74.85042 },
      zoom: 15
    })


    var getData = function () {
      var { name } = JSON.parse(localStorage.getItem('cars'));
      var { idCar } = JSON.parse(localStorage.getItem('Session'));
      var data = [];
      idCar1 = idCar.split(",");
      if (name) {
        if (name === "Todos") {
          for (var i = 0; i < idCar1.length; i++) {
            data[i] = idCar1[i];
          }
        } else {
          data = [name];
        }
      } else {
        data = ["ultimo2"]
      }
      var { url } = JSON.parse(localStorage.getItem('url'));
      fetch('http://' + url + ':4000', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
      })
        .then(response => response.json())
        .then(response => {
          if (response[0].lng === undefined) {
            console.log("NO hay nah")
          } else {
            drawPolis(response);
          }
        })
        .catch(err => console.error(err))
    }

    var aleatorio = function (inferior, superior) {
      let numPosibilidades = superior - inferior
      let aleat = Math.random() * numPosibilidades
      aleat = Math.floor(aleat)
      return parseInt(inferior) + aleat
    }

    var give_color = function () {
      let hexadecimal = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9", "A", "B", "C", "D", "E", "F"]
      let color_aleatorio = "#";
      for (let i = 0; i < 6; i++) {
        let posarray = aleatorio(0, hexadecimal.length)
        color_aleatorio += hexadecimal[posarray]
      }
      return color_aleatorio
    }


    var gLocsArray = [];
    var gMarArray = [];
    var i01 = 0;
    var colors = [];
    var drawPolis = function (lastLocs) {
      if (i01 === 0) {
        lastLocs.forEach(_ => {
          gLocsArray.push(new Array());
          gMarArray.push(new Array());
          colors.push(give_color());
          dataGraph.push({});
        });
      }
      
      var j01 = 0;
      var j02 = 0;
      gLocsArray.forEach(LocsCar => {
        dataGraph[j01].vel=lastLocs[j01].vel;
        dataGraph[j01].Fecha=lastLocs[j01].Fecha;
        dataGraph[j01].Sensor=lastLocs[j01].Sensor;
        dataGraph[j01].idCar=lastLocs[j01].idCar;
        gLocsArray[j01].push(new window.google.maps.LatLng(lastLocs[j01].lat, lastLocs[j01].lng));
        let ft = new window.google.maps.Polyline({ path: gLocsArray[j01], strokeColor: colors[j01], strokeOpacity: 0.8, strokeWeight: 8 });
        var polySize = gMarArray[j01].length;
        if (polySize > 0) {
          gMarArray[j01][polySize - 1].setMap(null);
        }
        ft.setMap(map);
        var numAu = j01 + 1;
        gMarArray[j01].push(
          
          new window.google.maps.Marker({

            position: gLocsArray[j01][polySize],
            map: map,
            title: 'AUTO ' + lastLocs[j01].idCar,
            icon: {
              url: 'https://img.icons8.com/metro/420/truck.png',
              scaledSize: new window.google.maps.Size(50, 50), // scaled size
              origin: new window.google.maps.Point(0,0), // origin
              anchor: new window.google.maps.Point(0, 0) // anchor
            }
          })
        )
        j01=j01+1;
      });


      i01 = i01 + 1;
    }
    



    getData();
    this.interval = setInterval(() => getData(), 5000);


  }



  render() {
    return (
      <main>
        <Nav />
        <div id="map"></div>
        <Graph dataGraph={dataGraph}/>
      </main>      
    )    
  }
}

function loadScript(url) {
  var index = window.document.getElementsByTagName("script")[0]
  var script = window.document.createElement("script")
  script.src = url
  script.async = true
  script.defer = true
  index.parentNode.insertBefore(script, index)
}

export default Real;
