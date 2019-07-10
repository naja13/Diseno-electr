import React from "react";
import { MDBCol, MDBContainer, MDBRow, MDBFooter } from "mdbreact";

const FooterPage = () => {
    return (
        <MDBFooter color="blue" className="font-small pt-4 mt-4">
            <MDBContainer fluid className="text-center text-md-left">
                <MDBRow>
                    <MDBCol md="6">
                        <p>
                            <div style={{ "text-align": "center" }}>
                                <img src={require('../images/uninortelogo.png')} height="57" width="215" />
                            </div>
                        </p>
                    </MDBCol>
                    <MDBCol md="6">
                        <h5 className="title"></h5>
                        <ul>
                            <li className="list-unstyled">
                                <a href="https://github.com/jersonpl/DesignPage">
                                    <MDBRow>
                                        <img style={{ "text-align": "center" }} src={require('../images/github.png')} height="40" width="40" />
                                    </MDBRow>
                                    <MDBRow>
                                        Repositorio Github
                                    </MDBRow>
                                </a>
                            </li>
                        </ul>
                    </MDBCol>
                </MDBRow>
            </MDBContainer>
            <div className="footer-copyright text-center py-3">
                <MDBContainer fluid>
                    &copy; {new Date().getFullYear()} Copyright: <a href="https://www.MDBootstrap.com"> MDBootstrap.com </a>
                </MDBContainer>
            </div>
        </MDBFooter>
    );
}

export default FooterPage;