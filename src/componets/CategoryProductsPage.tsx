import React from "react";
import { useParams, Link } from "react-router-dom";
import Container from "react-bootstrap/Container";
import Card from "react-bootstrap/Card";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { useSelector } from "react-redux";
import { selectProducts } from "../Store/Store";
import { FaMoneyBill, FaInfoCircle } from "react-icons/fa";

const CategoryProductsPage = () => {
  const products = useSelector(selectProducts);
  const { category  } = useParams();

  const filteredProducts = products.filter((product) =>
    product.category.includes(category)
  );

  return (
    <Container className="mt-4">
      <h2 className="mb-4">{category} Products</h2>
      <Row>
        {filteredProducts.map((product) => (
          <Col key={product.id} md={4} sm={6} xs={12} className="mb-4">
            <Link to={`/product/${product.id}`} className="text-decoration-none">
              <Card>
                <Card.Img variant="top" src={product.image} alt={product.name} />
                <Card.Body>
                  <Card.Title className="mb-2">{product.name}</Card.Title>
                  <Card.Text className="mb-2">
                    <FaMoneyBill className="mr-2" />
                    ${product.price}
                  </Card.Text>
                  <Card.Text className="mb-2">{product.description}</Card.Text>
                  <Link to={`/product/${product.id}`} className="btn btn-primary">
                    <FaInfoCircle className="mr-2" />
                    View Details
                  </Link>
                </Card.Body>
              </Card>
            </Link>
          </Col>
        ))}
      </Row>
    </Container>
  );
};

export default CategoryProductsPage;
