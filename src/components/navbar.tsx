import Navbar from 'react-bootstrap/Navbar';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import NavDropdown from 'react-bootstrap/NavDropdown';
import {
    Link,
  } from "react-router-dom"

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
                    {/* <NavDropdown className="fs-5" title="Blog" id="navbarScrollingDropdown" active menuVariant="dark" >
                        <NavDropdown.Item className="fs-5">
                            <Link to="/blog/react" className="text-white" style={{ textDecoration: 'none' }}>
                                Services
                            </Link>
                        </NavDropdown.Item>
                        <NavDropdown.Item className="fs-5">
                            <Link to="/blog/shopify" className="text-white" style={{ textDecoration: 'none' }}>
                                Shopify
                            </Link>
                        </NavDropdown.Item>
                    </NavDropdown> */}
                    <Nav.Item className="fs-5 mt-1">
                        <Link to="/services" className="text-white" style={{ textDecoration: 'none' }}>Services</Link>
                    </Nav.Item>
                    <Nav.Item className="fs-5 mt-1 ms-3">
                        <Link to="/service_variants" className="text-white" style={{ textDecoration: 'none' }}>Service Variants</Link>
                    </Nav.Item>
                    <Nav.Item className="fs-5 mt-1 ms-3">
                        <Link to="/attributes" className="text-white" style={{ textDecoration: 'none' }}>Attributes</Link>
                    </Nav.Item>
                </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    )
}