import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { selectProducts } from "../Store/Store";
import { useSelector } from "react-redux";

interface Product {
  product_id: number;
  product_name: string;
  category: string[];
  image: string;
}

const StyledCategoryPage = styled.div`
  max-width: 800px;
  margin: auto;
  padding: 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const CategoryList = styled.ul`
  list-style: none;
  padding: 0;
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
  justify-content: center;
`;

const CategoryItem = styled.li`
  flex: 1 0 45%;
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-bottom: 20px;

  img {
    width: 60px;
    height: 60px;
    margin-bottom: 10px;
    border-radius: 50%;
  }

  a {
    text-decoration: none;
    color: #333;
    font-weight: bold;
    font-size: 18px;

    &:hover {
      color: #007bff;
    }
  }

  ul {
    list-style: none;
    padding-left: 0;
    margin: 0;

    li {
      margin-bottom: 5px;

      a {
        font-weight: normal;
        font-size: 16px;
      }
    }
  }
`;

const CategoryPage: React.FC = () => {
  const Products = useSelector(selectProducts) as unknown as Product[];
  const categories = [...new Set(Products.flatMap((product) => product.category))];

  const getProductsByCategory = (category: string) => {
    return Products.filter((product) => product.category.includes(category));
  };
  
  const getFirstProductImage = (category: string) => {
    const firstProduct = getProductsByCategory(category)[0];
    return firstProduct ? firstProduct.image : null;
  };

  return (
    <StyledCategoryPage>
      <h2>All Categories</h2>
      <CategoryList>
        {categories.map((category, index) => (
          <CategoryItem key={index}>
            <img src={getFirstProductImage(category) || ""} alt={`${category} image`} />
            <Link to={`/products/${category}`}>{category}</Link>
            <ul>
              {getProductsByCategory(category).map((product) => (
                <li key={product.product_id}>
                  <Link to={`/product/${product.product_id}`}>
                    {product.product_name}
                  </Link>
                </li>
              ))}
            </ul>
          </CategoryItem>
        ))}
      </CategoryList>
    </StyledCategoryPage>
  );
};

export default CategoryPage;
