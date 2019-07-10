import React, { Component } from 'react';
import '../App.css';

export class Tabla extends Component {
  render() {
    console.log("datos: ", this.props.datos.lenght)
    if(this.props.show === 1 && this.props.datos.lenght > 0){
      var todos = this.props.datos.map((dato, i) => {
      return (
        <tr key = {{i}}>
          <th><div>{dato.ID}</div></th>
          <th><div>{dato.Fecha}</div></th>
          <th><div>{dato.lat}</div></th>
          <th><div>{dato.lng}</div></th>
          <th><div>{dato.vel}</div></th>
          <th><div>{dato.idCar}</div></th>
        </tr>
      )
    })
    }
    return (
      <table className="table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Fecha</th>
            <th>Latitud</th>
            <th>Longitud</th>
            <th>Velocidad</th>
            <th>Carro</th>
          </tr>
        </thead>
        <tbody>
          {todos}
        </tbody>
      </table>
    )
  }
}

export default Tabla;