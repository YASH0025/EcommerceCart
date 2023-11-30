import React from "react";
import Navbar from "react-bootstrap/Navbar";
import { Link } from "react-router-dom";
import Nav from "react-bootstrap/Nav";
import { FaShoppingCart } from "react-icons/fa";
import Badge from "react-bootstrap/Badge";
import { useSelector } from "react-redux";
import { RootState } from "../Store/Store";

const Header = () => {
  const totalItems = useSelector((state: RootState) => state.cart.items.length);

  const navbarStyle = {
    backgroundColor: "#000", // Set the background color to dark black
  };

  return (
    <Navbar style={navbarStyle} variant="dark" expand="sm" sticky="top">
      <Navbar.Brand as={Link} to="/">
        <img
          src={"https://d1csarkz8obe9u.cloudfront.net/posterpreviews/shopping-cart-logo-design-template-7335661173b83c3ad14af7ee31226ce3_screen.jpg?ts=1681389680"}
          width="40"
          height="40"
          className="d-inline-block align-top"
          alt="ShopCart Logo"
        />
        <span style={{ fontSize: "1.5rem", marginLeft: "0.5rem" }}>SHOPCART</span>
      </Navbar.Brand>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="ml-auto">
          <Nav.Link as={Link} to="/" className="p-2">
            Home
          </Nav.Link>
          <Nav.Link as={Link} to="/products" className="p-2">
            Categories
          </Nav.Link>
          <Nav.Link as={Link} to="/cart" className="ml-auto p-2">
            Cart :
            <FaShoppingCart />
            {totalItems > 0 && (
              <Badge variant="secondary" className="ml-1">
                {totalItems}
              </Badge>
            )}
          </Nav.Link>
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  );
};

export default Header;
