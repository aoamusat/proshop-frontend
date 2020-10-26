import React from "react";
import { Navbar, Nav, NavDropdown, Container } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";

const Header = () => {
    return (
        <header>
            <Navbar bg="dark" variant="dark" expand="lg" collapseOnSelect>
                <Container>
                    <LinkContainer to="/">
                        <Navbar.Brand>ProShop</Navbar.Brand>
                    </LinkContainer>
                    <Navbar.Toggle aria-controls="basic-navbar-nav" />
                    <Navbar.Collapse id="basic-navbar-nav">
                        <Nav className="ml-auto">
                            <LinkContainer to="/">
                                <Nav.Link>
                                    {" "}
                                    <i className="fas fa-home    "></i> Home
                                </Nav.Link>
                            </LinkContainer>
                            <LinkContainer to="/cart">
                                <Nav.Link>
                                    {" "}
                                    <i className="fas fa-shopping-cart"></i>{" "}
                                    Cart
                                </Nav.Link>
                            </LinkContainer>
                            <NavDropdown
                                title="Account"
                                id="basic-nav-dropdown">
                                <LinkContainer to="/login">
                                    <NavDropdown.Item>
                                        <i className="fas fa-user"></i> Login
                                    </NavDropdown.Item>
                                </LinkContainer>
                                <LinkContainer to="/register">
                                    <NavDropdown.Item>
                                        <i className="fas fa-user-cog"></i>{" "}
                                        Register
                                    </NavDropdown.Item>
                                </LinkContainer>
                            </NavDropdown>
                        </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
        </header>
    );
};

export default Header;
