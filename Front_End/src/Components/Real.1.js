import React, { Component } from 'react';
import '../App.css';
import Maps from './MapContainer';
import Tabla from './Tabla';
import Nav from './Navegacion';

var coords = [];
var idCar1 = ["XXXXXX"];

export class Real extends Component {
  state = {
    datos: []
  }
  componentDidMount() {
    this.getData();
    this.interval = setInterval(() => this.getData(), 5000);
  }
  componentWillUnmount() {
    clearInterval(this.interval);
  }
  getData = _ => {
    var {name} = JSON.parse(localStorage.getItem('cars'));
    var {idCar} = JSON.parse(localStorage.getItem('Session'));
    var data = [];
    idCar1 = idCar.split(",");
    console.log("name  ", name)
    if (name) {
      if(name === "Todos"){
        for(var i = 0; i < idCar1.length ; i++){
          data[i] = idCar1[i];
        }        
      }else{
        data = [name];
      }
    }else{
      data = ["ultimo2"]
    }
    console.log("data: ", data)
    var { url } = JSON.parse(localStorage.getItem('url'));
    fetch('http://' + url + ':4000', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data)
    })
      .then(response => response.json())
      .then(response => this.setState({ datos : response }))
      .catch(err => console.error(err))
  }
  render() {
    var mapa = null;
    for(var k = 0; k < this.state.datos.length; k++){   
      if(this.state.datos[k]){
        if(this.state.datos[k].length !== 0){
          console.log("ss:  ", this.state.datos[k])
          var pp = [this.state.datos[k]];
          mapa = pp.map((dato, i) => {
            if (coords[coords.length - 1] !== dato) {
              coords.push({ lat: parseFloat(dato.lat), lng: parseFloat(dato.lng) });
            }
            const marker = { lat: parseFloat(dato.lat), lng: parseFloat(dato.lng) };
            return (
              <Maps key={i} coords={coords} marker={marker} show={1} />
              
            )
          })
        }
      }else{
        mapa = <div>Sin resultados...</div>;
      }
    }
    return (
      <div>
        <Nav />
        <Tabla datos={this.state.datos} show={1} />
        {mapa}
      </div>
    )
  }
}

export default Real;
