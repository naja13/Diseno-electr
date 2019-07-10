import React, {Component} from 'react';
import Nav from '../Navegacion';

class SignUp extends Component{
    state = {
        email : '',
        password : '',
        firstName: '',
        idCar : [{}],
        login :null  
    }
    
    handleChange = (e) =>{
        this.setState({
            [e.target.id]: e.target.value
        })
    }
    handleSubmit = (e) =>{
        var {url} = JSON.parse(localStorage.getItem('url'));
        e.preventDefault();
        fetch('http://'+url+':4000/signin', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(this.state)
        })
            .then(response => response.json())
            .then(response => {
                if(response.data === "Iniciado"){
                    this.setState({login:true, firstName:response.datos.firstName, idCar:response.datos.idCar});
                    console.log("response",response.datos.idCar);
                    localStorage.setItem('Session', JSON.stringify(this.state));
                    alert(response.data);
                    this.props.history.push('/Home');
                    window.location.reload()
                }else{
                    this.setState({login:false});
                    localStorage.setItem('Session', JSON.stringify(this.state));
                    alert(response.data);
                }
            })
            .catch(err => console.error(err));
    }
    render() {
        return(
            <div>
                <Nav />
                <div className="card" style={{ marginTop: "10px" }}>
                <div className="card-header">
                    Iniciar Sesión 
                </div>
                <div className = "card-body">
                    <form onSubmit = {this.handleSubmit} className = "white">
                        <div className = "form-group">
                            <input className = "form-control" type = "email" id = "email" onChange={this.handleChange} placeholder="Email"/>
                        </div>
                        <div className = "form-group">
                            <input  className = "form-control" type = "password" id = "password" onChange={this.handleChange} placeholder="Constraseña"/>
                        </div>
                        <button className = "btn btn-primary btn-block">Entrar</button>
                    </form>
                </div>
                </div>
            </div>
        )
    }
}

export default SignUp