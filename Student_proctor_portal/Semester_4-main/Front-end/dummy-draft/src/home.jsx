import React from 'react';
import limage from './Images/extra.jpg';
import bimage from './Images/bmscelogo.png';
import { Navbar, Nav, NavDropdown } from 'react-bootstrap';

const BasicForm = () => {


    return (
        <>
        <Navbar collapseOnSelect expand="lg" bg="light" variant="light">
            <Navbar.Brand href="#home">Proctor Portal</Navbar.Brand>
            <Navbar.Toggle aria-controls="responsive-navbar-nav" />
            <Navbar.Collapse id="responsive-navbar-nav">
                <Nav className="mr-auto">
                </Nav>
            <Nav>
                <NavDropdown title="Not Signed In" id="collasible-nav-dropdown">
                </NavDropdown>
            </Nav>
            </Navbar.Collapse>
        </Navbar>
        <div className="container" align="center">
        <div className="GoogleButton" id="loginbox">
            <br />
            <img src={bimage} alt="college-logo" className="cimage" />
            <h3 style={{color:"black", marginTop:"0.2em"}}>B.M.S. COLLEGE OF ENGINEERING</h3>
             <br />
             <br />
             <br />
            <h3>Login or Sign-Up</h3>
            <br />
            <div id="login-button"></div>
            <br />
            <br />
            <br />
            <p>For any query please contact <a className="email">std_proctor_portal.bmsce.ac.in</a></p>
        </div>
        <div className="sidebox">
            <img src={limage} alt="vector" className="vimage"/>
        </div>
        </div>
        </>
    )
}

export default BasicForm;