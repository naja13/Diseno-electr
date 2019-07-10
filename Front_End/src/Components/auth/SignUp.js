import React, {Component} from 'react';
import Nav from '../Navegacion';


class SignUp extends Component{
    state = {
        email : '',
        password : '',
        firstName : '',
        lastName : '', 
        idCar: ''
    }
    handleChange = (e) =>{
        this.setState({
            [e.target.id]: e.target.value
        })
    }
    handleSubmit = (e) =>{
        var {url} = JSON.parse(localStorage.getItem('url'));
        e.preventDefault();
        fetch('http://'+url+':4000/signup', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(this.state)
        })
            .then(response => response.json())
            .then(response => {
                if(response.data === "Registrado"){
                    alert('Se Registró')
                    this.props.history.push('/signin');
                }else{
                    alert(response.data);
                }
            })
            .catch(err => console.error(err))
    }
    render() {
        return(
            <div>
                <Nav />
                <div className="card" style={{ marginTop: "10px" }}>
                <div className="card-header">
                    Registrar Cuenta
                </div>
                <div className = "card-body">
                    <form onSubmit = {this.handleSubmit} className = "white">
                        <div className = "form-group">
                            <input  className = "form-control" type = "text" id = "firstName" onChange={this.handleChange} placeholder="Nombre"/>
                        </div>
                        <div className = "form-group">
                            <input className = "form-control" type = "text" id = "lastName" onChange={this.handleChange} placeholder="Apellido"/>
                        </div>
                        <div className = "form-group">
                            <input className = "form-control" type = "email" id = "email" onChange={this.handleChange} placeholder="Email"/>
                        </div>
                        <div className = "form-group">
                            <input  className = "form-control" type = "password" id = "password" onChange={this.handleChange} placeholder="Contraseña"/>
                        </div>
                        <div className = "form-group">
                            <input  className = "form-control" type = "text" id = "idCar" onChange={this.handleChange} placeholder="Auto ID"/>
                        </div>
                        <button className = "btn btn-primary btn-block">Registrar </button>
                    </form>
                </div>
                </div>
            </div>
        )
    }
}

export default SignUp;