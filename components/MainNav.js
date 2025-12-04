import React from "react";
import { Container, Nav, Navbar } from "react-bootstrap";
import Link from "next/link";

const MainNav = () => {
  return (
    <Navbar expand="lg" className="navbar-dark bg-primary">
      <Container>
        <Navbar.Brand as={Link} href="/">Jay Watekar</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link as={Link} href="/about">About</Nav.Link>
            <Nav.Link as={Link} href="/favourites">Favourites</Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default MainNav;