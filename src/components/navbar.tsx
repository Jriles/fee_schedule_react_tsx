import {
    Navbar,
    Button
 } from 'react-bootstrap';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import NavDropdown from 'react-bootstrap/NavDropdown';
import {
    Link,
  } from "react-router-dom"
import React from 'react';

export default function NavBarComponent() {
    return (
        <Navbar bg="dark" expand="lg" variant="dark">
            <Container fluid>
                <Navbar.Brand>
                    <Link className="navbar-brand ms-3 fs-4" to="/">QualDevLabs</Link>
                </Navbar.Brand>
                <Navbar.Toggle aria-controls="navbarScroll" />
                <Navbar.Collapse id="navbarScroll">
                <Nav
                    className=""
                    navbarScroll
                >
                    <Nav.Item className="fs-5 mt-1">
                        <Link to="/services" className="text-white" style={{ textDecoration: 'none' }}>Services</Link>
                    </Nav.Item>
                    <Nav.Item className="fs-5 mt-1 ms-3">
                        <Link to="/service_variants" className="text-white" style={{ textDecoration: 'none' }}>Service Variants</Link>
                    </Nav.Item>
                    <Nav.Item className="fs-5 mt-1 ms-3">
                        <Link to="/attributes" className="text-white" style={{ textDecoration: 'none' }}>Attributes</Link>
                    </Nav.Item>
                    <Nav.Item className="fs-5 mt-1 ms-3">
                        <Link to="/login" className="text-white" style={{ textDecoration: 'none' }}>
                            <Button>Login</Button></Link>
                    </Nav.Item>
                </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    )
}