import React, { Component } from 'react';
import Nav from './Navegacion';
import '../App.css';
import Calendario from "./Calendar.js";
import Graph from './graphs';


var data = {};
var grafica = [{ vel: 0, Fecha: "Inicio", idCar: "" }, { vel: 0, Fecha: "Inicio", idCar: "" }];
var dataa = [];
var uno = "2000-01-01 00:00:00";
var dos = "2019-09-31 00:00:00";
var mensajes = "0";
var flightPath = [];
var markersh = [];
var fi = null;
var ff = null;
var dataForDate = [];
var circle = null;
var idCar1 = ["XXXXXX"];


class App extends Component {

  constructor(props) {
    super(props);
    this.state = {
      datos: [{}],
      idCar: JSON.parse(localStorage.getItem('Session')).idCar.split(',')
    }
  }



  componentDidMount() {
    loadScript("https://maps.googleapis.com/maps/api/js?key=AIzaSyDYNzG1CYSeQy-CEC3qAXca5-cmj-Cd6ho&libraries=drawing&callback=initMap")
    window.initMap = this.processMap;
  }


  applyCallback(rangeDate) {
    var fiO = rangeDate.start.subtract(5, "hours");
    var ffO = rangeDate.end.subtract(5, "hours");
    fi = fiO._d.toISOString().replace('.000Z', '').replace('T', ' ');
    ff = ffO._d.toISOString().replace('.000Z', '').replace('T', ' ');
    console.log(fi);
    console.log(ff);
  }

  processMap = () => {
    //incialización el mapa
    var map = new window.google.maps.Map(document.getElementById('map'), {
      center: { lat: 11.01947, lng: -74.85042 },
      zoom: 15

    })

    var drawingManager = new window.google.maps.drawing.DrawingManager({
      drawingControlOptions: {
        drawingModes: ['marker', 'circle']
      }
    });
    document.getElementById("area-b").addEventListener("click", function () {
      drawingManager.setMap(map);
    })
    


    circle = null;
    var that = this;

    new window.google.maps.event.addListener(drawingManager, 'overlaycomplete', function (event) {
      // event.setMap(null);
      event.overlay.setMap(null);
      if (event.type === 'circle') {
        var center = event.overlay.getCenter();
        circle = {
          radius: event.overlay.getRadius(),
          center: {
            lat: center.lat(),
            long: center.lng()
          },
          overLay: event.overLay
        }
      }

      var circleJson = { 'lat': circle.center.lat, 'lng': circle.center.long, 'rad': circle.radius };


      var R = 6378137;
      var latr = (Math.PI * circleJson.lat) / 180;
      var lngr = (Math.PI * circleJson.lng) / 180;

      var latmax = (180 / Math.PI) * Math.asin(Math.sin(latr) * Math.cos(circle.radius / R) + Math.cos(latr) * Math.sin(circle.radius / R));
      var latmin = (180 / Math.PI) * Math.asin(Math.sin(latr) * Math.cos(circle.radius / R) - Math.cos(latr) * Math.sin(circle.radius / R));
      var longmax = (180 / Math.PI) * (lngr + Math.atan2(Math.sin(circle.radius / R) * Math.cos(latr), Math.cos(circle.radius / R) - Math.sin(latr) * Math.sin(latr)));
      var longmin = (180 / Math.PI) * (lngr + Math.atan2(-Math.sin(circle.radius / R) * Math.cos(latr), Math.cos(circle.radius / R) - Math.sin(latr) * Math.sin(latr)));

      var { name } = JSON.parse(localStorage.getItem('cars'));
      var { idCar } = JSON.parse(localStorage.getItem('Session'));
      var ids = [];
      idCar1 = idCar.split(",");
      console.log("name  ", name)
      if (name) {
        if (name === "Todos") {
          for (var i = 0; i < idCar1.length; i++) {
            ids[i] = idCar1[i];
          }
        } else {
          ids = [name];
        }
      } else {
        ids = ["ultimo2"]
      }




      data = {
        start: uno,
        end: dos,
        hist: "Posicion",
        startlat: latmin.toString(),
        endlat: latmax.toString(),
        startlng: longmax.toString(),
        endlng: longmin.toString(),
        idCar: ids
      }

      var { url } = JSON.parse(localStorage.getItem('url'));
      fetch('http://' + url + ':4000/ubicacion', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
      })
        .then(response => response.json())
        .then(response => {
          if (response[0].lng === undefined) {
            mensajes = "Sin resultados";
            console.log("nada");
          } else {
            mensajes = "";
            console.log("response.data: ", response.data);
            poliforid(response);
            grafica = response;
            that.setState({ datos: [{}] });
          }
        })
        .catch(err => console.error(err))
    })

    var poliforid = function (jdatos) {
      dataForDate = jdatos;
      let marker = null;
      let polvec = [];
      let polhis = [];
      let i = 0;
      let aid = null;

      let c = 0;
      jdatos.forEach(jdato => {
        if (i === 0) {
          aid = jdato.ID - 1;
        }
        polvec.push(new window.google.maps.LatLng(jdato.lat, jdato.lng));
        if (aid !== (jdato.ID - 1)) {
          polvec.pop();
          polhis.push(polvec);
          polvec = [];
          aid = jdato.ID - 1;
          c = 1;
        }
        aid = aid + 1;
        i = 1;
      });

      if (c === 0) {
        polhis.push(polvec);
      }
      flightPath = [];
      var color = null;

      var ii = 0;
      markersh = [];
      polhis.forEach(polvec => {
        var markerh = null;
        color = give_color();
        polvec.forEach(point => {
          var inf = 'El auto ' + jdatos[ii].idCar + ' pasó por aquí el ' + jdatos[ii].Fecha + ' a una velocidad de ' + jdatos[ii].vel + ' con un rmp de ' + jdatos[ii].Sensor;
          markerh = new window.google.maps.Marker({
            position: point,
            map: map,
            title: inf,
            icon: {
              url: "https://maps.gstatic.com/intl/en_us/mapfiles/markers2/measle_blue.png",
              size: new window.google.maps.Size(5, 5),
              anchor: new window.google.maps.Point(3, 3)
            }
          });
          markersh.push(markerh);
          ii = ii + 1;
        })


        let ft = new window.google.maps.Polyline({ path: polvec, strokeColor: color, strokeOpacity: 0.8, strokeWeight: 8 });
        ft.setMap(map);
        flightPath.push(ft);
      })

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


    document.getElementById("consul").addEventListener("click", function () {
      console.log(dataForDate);
      flightPath.forEach(ft => {
        ft.setMap(null);
      })
      markersh.forEach(mark => {
        mark.setMap(null);
      })
      console.log(circle);
      if (circle === null) {

        var { name } = JSON.parse(localStorage.getItem('cars'));
        var { idCar } = JSON.parse(localStorage.getItem('Session'));
        var ids = [];
        idCar1 = idCar.split(",");
        console.log("name  ", name)
        if (name) {
          if (name === "Todos") {
            for (var i = 0; i < idCar1.length; i++) {
              ids[i] = idCar1[i];
            }
          } else {
            ids = [name];
          }
        } else {
          ids = ["ultimo2"]
        }



        data = {
          start: fi,
          end: ff,
          idCar: ids
        }

        var { url } = JSON.parse(localStorage.getItem('url'));
        fetch('http://' + url + ':4000/fecha', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(data)
        })
          .then(response => response.json())
          .then(response => {

            if (response[0].lng === undefined) {
              mensajes = "Sin resultados";
            } else {
              mensajes = "";
              console.log(response)
              poliforid(response);
              grafica = response;
              that.setState({ datos: [{}] });

            }
          })
          .catch(err => console.error(err))



      } else {
        var dataWithDate = [];
        console.log(fi);
        console.log(ff);
        dataForDate.forEach(jdato => {
          if ((fi < jdato.Fecha) && (jdato.Fecha < ff)) {
            dataWithDate.push(jdato);
          }
        });
        poliforid(dataWithDate);
        circle = null;
      }

    });



  }

  render() {
    let Grap;
    var idCar = JSON.parse(localStorage.getItem('Session')).idCar.split(',');
    var { name } = JSON.parse(localStorage.getItem('cars'));
    if (name !== "Todos") {
      idCar = [name];
    }
    if (grafica[0].Fecha !== "Inicio") {
      Grap = idCar.map((dato, i) => {
        dataa = [];
        console.log("idCar[i]", grafica);
        for (var j = 0; j < grafica.length; j++) {
          if (grafica[j].idCar === idCar[i]) {
            dataa.push(grafica[j]);
          }
        }
        console.log("idCar[[[[", dataa)
        return (
          <Graph dataGraph={dataa} />
        )
      })
    }
    return (
      <main>
        <Nav />
        <div class="container">
          <div class="row">
            <div class="col-sm">
              <Calendario onSelectDate={this.applyCallback} />
            </div>
            <div class="col-sm">
              <input className="btn btn-primary" type="button" value="Aplicar el Filtro de Fechas" id="consul" />
            </div>
            <div class="col-sm">
              <input className="btn btn-primary" type="button" value="Seleccionar Región Geográfica" id="area-b" />
            </div>
          </div>
        </div>
        <div id="map"></div>
        {Grap}
      </main>
    );
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


export default App;
