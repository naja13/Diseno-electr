import React, {Component} from 'react';
import Nav from './Navegacion';

class Count extends Component{
    state = {
        email : JSON.parse(localStorage.getItem('Session')).email,
        idCar : "",
        idcarRem : "",
        login :null  
    }
    
    handleChange = (e) =>{
        this.setState({
            idCar: e.target.value
        })
    }
    handleChange1 = (e) =>{
        this.setState({
            idCarRem: e.target.value
        })
    }
    handleSubmit = (e) =>{
        var {url} = JSON.parse(localStorage.getItem('url'));
        e.preventDefault()
        fetch('http://'+url+':4000/addcar', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(this.state)
        })
            .then(response => response.json())
            .then(response => {
                if(response.data === "Auto agregado"){
                    alert(response.data);
                    var Session = JSON.parse(localStorage.getItem('Session'));
                    Session.idCar = Session.idCar + "," +  this.state.idCar;
                    localStorage.setItem('Session', JSON.stringify(Session)); 
                    this.props.history.push('/Home');
                    window.location.reload()
                }else{
                    alert("Error ",response.data);
                }
            })
            .catch(err => console.error(err));
    }

    handleSubmit1 = (e) =>{
        var {url} = JSON.parse(localStorage.getItem('url'));
        e.preventDefault()
        fetch('http://'+url+':4000/remcar', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(this.state)
        })
            .then(response => response.json())
            .then(response => {
                if(response.data === "Auto eliminado"){
                    alert(response.data);
                    var Session = JSON.parse(localStorage.getItem('Session'));
                    Session.idCar = Session.idCar.replace(","+this.state.idCarRem,"");
                    console.log(Session)
                    localStorage.setItem('Session', JSON.stringify(Session)); 
                    this.props.history.push('/Home');
                    window.location.reload()
                }else{
                    console.log(response.data)
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
                    Agregar auto
                </div>
                <div className = "card-body">
                    <form onSubmit = {this.handleSubmit} className = "white">
                        <div className = "form-group">
                            <input className = "form-control" type = "text" id = "text" onChange={this.handleChange} placeholder="Auto ID"/>
                        </div>
                        <button className = "btn btn-primary btn-block">Guardar</button>
                    </form>
                </div>
                </div>
                <div className="card" style={{ marginTop: "10px" }}>
                <div className="card-header">
                    Eliminar auto
                </div>
                <div className = "card-body">
                    <form onSubmit = {this.handleSubmit1} className = "white">
                        <div className = "form-group">
                            <input className = "form-control" type = "text" id = "text" onChange={this.handleChange1} placeholder="Auto ID"/>
                        </div>
                        <button className = "btn btn-primary btn-block">Eliminar</button>
                    </form>
                </div>
                </div>
            </div>
        )
    }
}

export default Count;
