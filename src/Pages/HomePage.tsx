import React from 'react';
import { useParams, Link } from 'react-router-dom';
import Container from 'react-bootstrap/Container';
import Card from 'react-bootstrap/Card';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { useSelector } from 'react-redux';
import { selectProducts } from '../Store/Store';
import styled from 'styled-components';

const ProductGrid = styled.div`
  display: grid;
  gap: 20px;

  @media (min-width: 576px) {
    grid-template-columns: repeat(2, 1fr);
  }

  @media (min-width: 768px) {
    grid-template-columns: repeat(3, 1fr);
  }

  @media (min-width: 992px) {
    grid-template-columns: repeat(4, 1fr);
  }
`;

const HomePage = () => {
  const Products = useSelector(selectProducts);

  return (
    <Container className="mt-4">
      <h1 className="text-center mb-4">All Products</h1>
      <ProductGrid>
        {Products.map((product) => (
          <Col key={product.id}>
            <Card>
              <Card.Img variant="top" src={product.image} alt={product.name} />
              <Card.Body>
                <Card.Title>{product.name}</Card.Title>
                <Card.Text>${product.price}</Card.Text>
                <Card.Text>{product.description}</Card.Text>
              </Card.Body>
              <Card.Footer>
                <Link to={`/product/${product.id}`} className="btn btn-primary">
                  View Details
                </Link>
              </Card.Footer>
            </Card>
          </Col>
        ))}
      </ProductGrid>
    </Container>
  );
};

export default HomePage;
