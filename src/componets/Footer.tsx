import React from "react";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { FaEnvelope } from "react-icons/fa";
import { SocialIcon } from "react-social-icons";

const Footer = () => {
  return (
    <footer className="bg-black text-light py-4">
      <Container>
        <Row>
          <Col md={6}>
            <div className="mb-4">
              <h6>Contact:</h6>
              <p>
                <FaEnvelope className="mr-2" />
                <a href="mailto:shopcart@gmail.com" className="text-light">shopcart@gmail.com</a>
              </p>
            </div>
            <div className="social-icons">
              <SocialIcon url="https://www.facebook.com/" className="mr-2" />
              <SocialIcon url="https://twitter.com/" className="mr-2" />
              <SocialIcon url="https://www.instagram.com/" />
            </div>
          </Col>
          <Col md={6}>
            <div className="mb-4">
              <h6>About Us</h6>
              <p>
                We strive to provide the best shopping experience for our customers. Explore a wide range of products and enjoy hassle-free shopping with ShopCart.
              </p>
            </div>
          </Col>
        </Row>
        <div className="text-center">
          <p>&copy; {new Date().getFullYear()} ShopCart. All rights reserved.</p>
        </div>
      </Container>
    </footer>
  );
};

export default Footer;
