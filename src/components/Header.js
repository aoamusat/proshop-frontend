import React from "react";
import { Navbar, Nav, NavDropdown, Container } from "react-bootstrap";

const Header = () => {
    return (
        <header>
            <Navbar bg="dark" variant="dark" expand="lg" collapseOnSelect>
                <Container>
                    <Navbar.Brand href="/">ProShop</Navbar.Brand>
                    <Navbar.Toggle aria-controls="basic-navbar-nav" />
                    <Navbar.Collapse id="basic-navbar-nav">
                        <Nav className="ml-auto">
                            <Nav.Link href="/">
                                {" "}
                                <i className="fas fa-home    "></i> Home
                            </Nav.Link>
                            <Nav.Link href="/cart">
                                {" "}
                                <i className="fas fa-shopping-cart"></i> Cart
                            </Nav.Link>
                            <NavDropdown
                                title="Account"
                                id="basic-nav-dropdown">
                                <NavDropdown.Item href="/login">
                                    <i className="fas fa-user    "></i> Login
                                </NavDropdown.Item>
                                <NavDropdown.Item href="/register">
                                    <i className="fas fa-user-cog    "></i>{" "}
                                    Register
                                </NavDropdown.Item>
                            </NavDropdown>
                        </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
        </header>
    );
};

export default Header;
