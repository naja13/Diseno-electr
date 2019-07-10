import React, { Component } from "react";
import { MDBNavbar, MDBNavbarBrand, MDBNavbarNav, MDBNavItem, MDBNavLink, MDBNavbarToggler, MDBCollapse, MDBDropdown, MDBDropdownToggle, MDBDropdownMenu, MDBDropdownItem, MDBContainer, MDBIcon } from "mdbreact";
import 'mdbreact/dist/css/mdb.css';
import '../App.css';
var nombre = "";

class NavbarPage extends Component {
  state = {
    collapseID: '',
    log: false
  };

  toggleCollapse = collapseID => () =>
    this.setState(prevState => ({
      collapseID: prevState.collapseID !== collapseID ? collapseID : ""
    })
    );

  componentWillMount() {
    var { login, firstName, idCar } = JSON.parse(localStorage.getItem('Session'));
    if (idCar) {
      this.setState({ idCar });
    }
    this.setState({ log: login });
    if (login) {
      nombre = firstName + " ";
    }
  }

  handleChange = name => event => {
    this.setState({ [name]: event.target.checked });
    localStorage.setItem('cars', JSON.stringify({ name: name }));
    window.location.reload()
  };

  render() {
    var selectCars = null;
    if (this.state.idCar) { //this.state.idCar
      const ic = this.state.idCar.split(",");
      ic.push("Todos");
      selectCars = ic.map((dato, i) => {
        return (
          <div key={i}>
            <MDBDropdownItem href="#!" onClick={this.handleChange(dato)} >{dato}</MDBDropdownItem>
          </div>
        )
      })
    } else {
      selectCars = <MDBDropdownItem href="/count" >Sin autos</MDBDropdownItem>;
    }
    return (
      <MDBNavbar color="info-color" dark expand="lg" className="navbar">
        <MDBNavbarBrand href="/Home">
          <strong className="white-text"><img src={require('../images/logo.PNG')}  style={{height:30, width: 240}}  /></strong>
        </MDBNavbarBrand>
        <MDBNavbarToggler onClick={this.toggleCollapse("navbarCollapse3")} />
        <MDBCollapse id="navbarCollapse3" isOpen={this.state.collapseID} navbar>
          <MDBNavbarNav left>
            {this.state.log ?
              <MDBNavItem>
                <MDBNavLink to="/real">Rastreo en tiempo real</MDBNavLink>
              </MDBNavItem> : null}
            {this.state.log ?
              <MDBNavItem>
                <MDBNavLink to="/filtro">Historicos</MDBNavLink>
              </MDBNavItem> : null}
            {this.state.log ?
              <MDBNavItem>
                <MDBDropdown>
                  <MDBDropdownToggle nav caret>
                    <div className="d-none d-md-inline">Autos</div>
                  </MDBDropdownToggle>
                  <MDBDropdownMenu className="dropdown-default" right>
                    {selectCars}
                  </MDBDropdownMenu>
                </MDBDropdown>
              </MDBNavItem> : null}
          </MDBNavbarNav>
          <MDBNavbarNav right>
            <MDBNavItem>
              <MDBNavLink className="waves-effect waves-light" to="/contact">
                <MDBIcon icon="envelope" className="mr-1" />Contáctanos</MDBNavLink>
            </MDBNavItem>
            <MDBNavItem>
              <MDBDropdown>
                <MDBDropdownToggle nav caret>{nombre}
                  <MDBIcon icon="user" className="mr-1" />
                </MDBDropdownToggle>
                <MDBDropdownMenu className="dropdown-default" right>
                  {this.state.log ?
                    <div>
                      <MDBDropdownItem href="/count"><MDBIcon icon="cog" className="mr-1" />Mi cuenta</MDBDropdownItem>
                      <MDBDropdownItem href="/signin" onClick={function () { localStorage.removeItem('Session'); localStorage.removeItem('cars'); }}>Cerrar Sesión</MDBDropdownItem>
                    </div>
                    :
                    <div>
                      <MDBDropdownItem href="/SignIn">Iniciar Sesión</MDBDropdownItem>
                      <MDBDropdownItem href="/SignUp">Crear Cuenta</MDBDropdownItem>
                    </div>
                  }
                </MDBDropdownMenu>
              </MDBDropdown>
            </MDBNavItem>
          </MDBNavbarNav>
        </MDBCollapse>
      </MDBNavbar>
    );
  }
}

export default NavbarPage;