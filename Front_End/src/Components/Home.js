import React, { Component } from 'react';
import Nav from '../Components/Navegacion';
//import Graph from './Graph';


export class Home extends Component {
    render() {
        return (
            <div>
                <Nav />
                <div style ={{ "text-align": "center"}}>
                    <img src={require('../images/logo.PNG')}  />
                </div>
                <div style ={{"text-align": "justify", "margin-left": "5%", "margin-right": "5%"}}>
                    <h2>Somos una empresa creada para suplir las necesidades de seguridad, tecnología y comunicación a nivel local en sitios en los cuales, a través de nuestro servicio de rastreo de forma satelital pueda brindarle seguridad a su negocio.</h2>
                </div>
                <div style ={{"text-align": "center"}}>
                    <img src={require('../images/serviciostodo.png')}  /> 
                    <img src={require('../images/beneficios.png')}  /> 
                </div> 
            </div>
        );
    }
}

export default Home;