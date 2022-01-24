import React from "react";
import { Navbar, Nav, Container, Image, NavDropdown } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";
import { useSelector, useDispatch } from "react-redux";
import { logoutUser } from "../redux/actions/userAction";

const NavBar = () => {
  const cartState = useSelector((state) => state.cartReducer);
  const { currentUser } = useSelector((state) => state.loginUserReducer);
  const dispatch = useDispatch();

  return (
    <>
      <Navbar collapseOnSelect expand="lg" bg="light" variant="light">
        <Container>
          <Navbar.Brand>
            <Image
//               src="images/logo.png"
//     src="https://image.shutterstock.com/z/stock-vector-pizza-daily-fresh-vector-emblem-on-blackboard-pizza-logo-template-vector-emblem-for-cafe-1901059681.jpg"
    src="https://cdn5.vectorstock.com/i/1000x1000/79/04/pizza-house-promotional-logo-with-cook-in-hat-vector-20847904.jpg"
              alt="logo"
              style={{ height: "50px" }}
            />
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="responsive-navbar-nav" />
          <Navbar.Collapse id="responsive-navbar-nav">
            <Nav className="ms-auto">
              {currentUser ? (
                <LinkContainer to="/">
                  <NavDropdown
                    id="nav-dropdown-dark-example"
                    title={currentUser.name}
                    menuVariant="dark"
                  >
                    <LinkContainer to="/orders" activeClassName>
                      <NavDropdown.Item href="#action/3.1">
                        Order
                      </NavDropdown.Item>
                    </LinkContainer>

                    <NavDropdown.Item
                      onClick={() => {
                        dispatch(logoutUser());
                      }}
                    >
                      Logout
                    </NavDropdown.Item>
                  </NavDropdown>
                </LinkContainer>
              ) : (
                <>
                  <LinkContainer to="/login" activeClassName>
                    <Nav.Link>Login</Nav.Link>
                  </LinkContainer>
                  <LinkContainer to="/register" activeClassName>
                    <Nav.Link>Register</Nav.Link>
                  </LinkContainer>
                </>
              )}

              <LinkContainer to="/cart" activeClassName>
                <Nav.Link>Cart {cartState.cartItems.length}</Nav.Link>
              </LinkContainer>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </>
  );
};

export default NavBar;
