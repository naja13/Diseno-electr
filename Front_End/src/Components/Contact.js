import React from "react";
import { MDBContainer, MDBRow, MDBCol, MDBBtn, MDBIcon, MDBInput } from 'mdbreact';
import Nav from './Navegacion';
import '../App.css';



const FormPage = () => {
  return (
    <MDBContainer >
      <Nav />
      <MDBRow style={{ marginTop: "20px"}}>
      <MDBCol></MDBCol>  
        <MDBCol md="6">
          <form>
            <p className="h5 text-center mb-4">Contáctanos</p>
            <div className="grey-text">
              <MDBInput
                label="Tu nombre"
                icon="user"
                group
                type="text"
                validate
                error="wrong"
                success="right"
              />
              <MDBInput
                label="Tu email"
                icon="envelope"
                group
                type="email"
                validate
                error="wrong"
                success="right"
              />
              <MDBInput
                label="Asunto"
                icon="tag"
                group
                type="text"
                validate
                error="wrong"
                success="right"
              />
              <MDBInput
                type="textarea"
                rows="2"
                label="Tu mensaje"
                icon="pencil-alt"
              />
            </div>
            <div className="text-center">
              <MDBBtn outline color="secondary">
                Enviar <MDBIcon far icon="paper-plane" className="ml-1" />
              </MDBBtn>
            </div>
          </form>
        </MDBCol>
        <MDBCol></MDBCol>
      </MDBRow>
    </MDBContainer>
  );
};

export default FormPage;