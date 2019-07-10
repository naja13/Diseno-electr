import React, { Component } from 'react';
import { Map, Polyline, Marker, Polygon, GoogleApiWrapper } from 'google-maps-react';
var data = [{}];
var centro = { lat: 11.01947, lng: -74.85042 }

export class MapContainer extends Component {
  state = {
    position: {
      lat: 11.01947,
      lng: -74.85042
    }
  }
  onMarkerDragEnd = (coord) => {
    const { latLng } = coord;
    const lat = latLng.lat();
    const lng = latLng.lng();
    this.setState({
      position: { lat, lng }
    });
    this.props.onSelectLocation(this.state.position);
  };
  
  
  render() {
    let MarkerReal;
    let polygono;
    data = [{}];
    var poly = this.props.coords.map((dato, i) => {
      data = [data[data.length - 1], dato];
      return (
        <Polyline
          key={i}
          path={data}
          strokeColor="#0000FF"
          strokeOpacity={0.8}
          strokeWeight={2} />
      )
    })
    if (this.props.show === 1) {
      MarkerReal = <Marker position={this.props.marker} />
      centro = this.props.marker;
    } else {
      centro = this.state.position;
      if (this.props.hist === "Ubicacion") {
        MarkerReal = <Marker position={this.state.position} draggable={true}
          onDragend={(t, map, coord) => this.onMarkerDragEnd(coord)} />
        polygono = <Polygon
          paths={this.props.triangleCoords}
          strokeColor="#0000FF"
          strokeOpacity={0.8}
          strokeWeight={2}
          fillColor="#0000FF"
          fillOpacity={0.35}
        />
      }
    }
    return (
      <Map google={this.props.google} id = "mapa"
        center={centro} style={{ width: `85%` }}
        initialCenter={this.state.position}
        zoom={14}>
        
        {poly}
        {MarkerReal}
        {polygono}
      </Map>
    )
  }
}

export default GoogleApiWrapper({
  apiKey: ("AIzaSyDYNzG1CYSeQy-CEC3qAXca5-cmj-Cd6ho")
})(MapContainer)
