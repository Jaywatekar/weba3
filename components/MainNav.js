import React from "react";
import { Container, Nav, Navbar, NavDropdown } from "react-bootstrap";
import Link from "next/link";
import { decodeToken, clearToken } from "@/lib/authenticate";
import { useRouter } from "next/router";

export default function MainNav() {
  const router = useRouter();
  const user = decodeToken();

  const handleLogout = () => {
    clearToken();
    router.push("/login");
  };

  return (
    <Navbar expand="lg" className="bg-primary navbar-dark">
      <Container>
        <Navbar.Brand as={Link} href="/">
          Jay Watekar
        </Navbar.Brand>

        <Navbar.Toggle aria-controls="nav-options" />

        <Navbar.Collapse id="nav-options">
          <Nav className="me-auto">
            <Nav.Link as={Link} href="/about">
              About
            </Nav.Link>
          </Nav>

          {user ? (
            <Nav className="ms-auto">
              <NavDropdown title={user.userName} id="user-menu">
                <NavDropdown.Item as={Link} href="/favourites">
                  Favourites
                </NavDropdown.Item>
                <NavDropdown.Item onClick={handleLogout}>Logout</NavDropdown.Item>
              </NavDropdown>
            </Nav>
          ) : (
            <Nav className="ms-auto">
              <Nav.Link as={Link} href="/register">
                Register
              </Nav.Link>
            </Nav>
          )}
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}
