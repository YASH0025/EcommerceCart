import React, { useEffect, useState } from "react";

import { Route, Routes } from "react-router-dom";
import Header from "./componets/Header";
import Footer from "./componets/Footer";
import CategoryProductsPage from "./componets/CategoryProductsPage";
import ProductDetails from "./Pages/ProductDetails";
// import CategorryPage from "./componets/CategorryPage";
import CategoryPage from "./componets/CategorryPage";
// import ProductList from "./Pages/ProductList";
// import NewProduct from "./ProductData/NewProducts";
import Cart from "./componets/Cart";
import { useDispatch, useSelector } from "react-redux";
import { selectProducts } from "./Store/Store";
import { setProducts } from "./Store/Reducers/productsSlice";
import Summery from "./componets/Summery";
// import ProductData form "./ProductData"
import productData from "./ProductData/ProductData.json";
import EditCart from "./componets/EditCart";
import HomePage from "./Pages/HomePage";

const App = () => {
  
  const dispatch = useDispatch();

  const products = useSelector(selectProducts);
  console.log(products);
  const [cartItems, setCartItems] = useState([]);

  useEffect(() => {
    dispatch(setProducts(productData.ProductData));

    // Dispatch the action when this component mounts
  }, [dispatch]);



  useEffect(() => {
    localStorage.setItem("cartItems", JSON.stringify(cartItems));
  }, [cartItems]);

  return (
    <>
      <Header />

      <div className="App">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route
            path="/products/:category"
            element={<CategoryProductsPage />}
          />
          <Route path="/product/:productId" element={<ProductDetails />} />
          <Route path="/products" element={<CategoryPage />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/cart/summery" element={<Summery />} />
          <Route path="/cart/edit/:id" element={<EditCart />} />
        </Routes>
      </div>

      <Footer />
    </>
  );
};

export default App;
