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
  // const featuredProducts = [
  //   {
  //     id: 1,
  //     name: "Blue T-Shirt",
  //     price: 19.99,
  //     category: "Apparel",
  //     description: "A comfortable blue T-shirt made from high-quality fabric.",
  //     image:
  //       "https://plus.unsplash.com/premium_photo-1682096261732-88a83f8bb20b?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  //     colors: ["Red", "Blue", "Green"],
  //     sizes: ["Small", "Medium", "Large"],
  //     stock: 10, // Example stock value
  //   },
  //   {
  //     id: 2,
  //     name: "Red T-Shirt",
  //     price: 19.99,
  //     category: "Apparel",
  //     description: "A comfortable blue T-shirt made from high-quality fabric.",
  //     image:
  //       "https://media.istockphoto.com/id/1167771770/photo/young-handsome-indian-man-wearing-t-shirt-over-isolated-red-background-very-happy-and-excited.jpg?s=1024x1024&w=is&k=20&c=ig6oZfr5pVmF93HSUfSvyuCOTPlQqPkxKgT3senbteU=",
  //     colors: ["Red", "Blue", "Green"],
  //     sizes: ["Small", "Medium", "Large"],
  //     stock: 10, // Example stock value
  //   },
  //   {
  //     id: 3,
  //     name: "Smart Watch",
  //     price: 29.99,
  //     category: "Electronics",
  //     description: "A stylish watch hoodi keeps you in style.",
  //     image:
  //       "https://images.unsplash.com/photo-1617043983671-adaadcaa2460?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  //     colors: ["Red", "Blue", "Green"],
  //     sizes: ["Small", "Medium", "Large"],
  //     stock: 10, // Example stock value
  //   },
  //   {
  //     id: 4,
  //     name: "Running Shoes",
  //     price: 59.99,
  //     category: "Footwear",
  //     description: "High-performance running shoes for your daily workout.",
  //     image:
  //       "https://images.unsplash.com/photo-1542291026-7eec264c27ff?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  //     colors: ["Red", "Blue", "Green"],
  //     sizes: ["Small", "Medium", "Large"],
  //     stock: 10, // Example stock value
  //   },
  //   {
  //     id: 6,
  //     name: "Sneakers",
  //     price: 53.83,
  //     category: "Footwear",
  //     description: "High-Qulity running shoes for your daily workout.",
  //     image:
  //       "https://images.unsplash.com/photo-1552346154-21d32810aba3?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  //     colors: ["Red", "Blue", "Green"],
  //     sizes: ["Small", "Medium", "Large"],
  //     stock: 10, // Example stock value
  //   },
  //   {
  //     id: 7,
  //     name: "Lipbalm",
  //     price: 59.99,
  //     category: "SkinCare",
  //     description: "High-performance moisturizer for your daily skincare.",
  //     image:
  //       "https://images.unsplash.com/photo-1603923054647-887b2d34a2ee?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  //     colors: ["Red", "Blue", "Green"],
  //     sizes: ["Small", "Medium", "Large"],
  //     stock: 10, // Example stock value
  //   },
  //   {
  //     id: 8,
  //     name: "Mini Van",
  //     price: 59.99,
  //     category: "Toys",
  //     description: "High-performance moisturizer for your daily skincare.",
  //     image:
  //       "https://images.unsplash.com/photo-1447931958677-954446df5f70?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  //     colors: ["Red", "Blue", "Green"],
  //     sizes: ["Small", "Medium", "Large"],
  //     stock: 10, // Example stock value
  //   },

  //   {
  //     id: 9,
  //     name: "Black T-Shirt",
  //     price: 19.99,
  //     category: "Apparel",
  //     description: "A comfortable blue T-shirt made from high-quality fabric.",
  //     image:
  //       "https://images.unsplash.com/photo-1610502778270-c5c6f4c7d575?q=80&w=1467&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  //     colors: ["Red", "Blue", "Green"],
  //     sizes: ["Small", "Medium", "Large"],
  //     stock: 10, // Example stock value
  //   },
  //   {
  //     id: 10,
  //     name: "White T-Shirt",
  //     price: 19.99,
  //     category: "Apparel",
  //     description: "A comfortable blue T-shirt made from high-quality fabric.",
  //     image:
  //       "https://plus.unsplash.com/premium_photo-1682096353438-03b20899f011?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  //     colors: ["Red", "Blue", "Green"],
  //     sizes: ["Small", "Medium", "Large"],
  //     stock: 10, // Example stock value
  //   },
  //   {
  //     id: 11,
  //     name: "Smart Watch",
  //     price: 29.99,
  //     category: "Electronics",
  //     description: "A stylish watch hoodi keeps you in style.",
  //     image:
  //       "https://images.unsplash.com/photo-1579586337278-3befd40fd17a?q=80&w=1472&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  //     colors: ["Red", "Blue", "Green"],
  //     sizes: ["Small", "Medium", "Large"],
  //     stock: 10, // Example stock value
  //   },
  //   {
  //     id: 12,
  //     name: "Boots ",
  //     price: 59.99,
  //     category: "Footwear",
  //     description: "High-performance running shoes for your daily workout.",
  //     image:
  //       "https://images.unsplash.com/photo-1554133818-7bb790d55236?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  //     colors: ["Red", "Blue", "Green"],
  //     sizes: ["Small", "Medium", "Large"],
  //     stock: 10, // Example stock value
  //   },
  //   {
  //     id: 13,
  //     name: "HighTop Sneakers",
  //     price: 59.99,
  //     category: "Toys ",
  //     description: "High-performance running shoes for your daily workout.",
  //     image:
  //       "https://images.unsplash.com/photo-1695748966450-3abe5c25b481?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  //     colors: ["Red", "Blue", "Green"],
  //     sizes: ["Small", "Medium", "Large"],
  //     stock: 10, // Example stock value
  //   },
  //   {
  //     id: 14,
  //     name: "Hand Gun",
  //     price: 59.99,
  //     category: "Toys",
  //     description: "High-performance moisturizer for your daily skincare.",
  //     image:
  //       "https://assets.ajio.com/medias/sys_master/root/20210619/V2gK/60ccf1d1f997ddb312d13d1a/-1117Wx1400H-4919026200-multi-MODEL.jpg",
  //     colors: ["Red", "Blue", "Green"],
  //     sizes: ["Small", "Medium", "Large"],
  //     stock: 10, // Example stock value
  //   },
  //   {
  //     id: 15,
  //     name: "Kitchen Set",
  //     price: 59.99,
  //     category: "Kitchen",
  //     description: "High-performance moisturizer for your daily skincare.",
  //     image:
  //       "https://images.unsplash.com/photo-1617784625140-515e220ba148?q=80&w=1634&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  //     colors: ["Red", "Blue", "Green"],
  //     sizes: ["Small", "Medium", "Large"],
  //     stock: 10, // Example stock value
  //   },
  //   {
  //     id: 16,
  //     name: "MicroWave",
  //     price: 59.99,
  //     category: "Kitchen",
  //     description: "High-performance moisturizer for your daily skincare.",
  //     image:
  //       "https://akm-img-a-in.tosshub.com/sites/rd/resources/202006/shutterstock_74910703_1592489390_1200x675.jpeg?size=684:384",
  //     colors: ["Red", "Blue", "Green"],
  //     sizes: ["Small", "Medium", "Large"],
  //     stock: 10, // Example stock value
  //   },
  //   {
  //     id: 17,
  //     name: "Washing Machine",
  //     price: 59.99,
  //     category: "Kitchen",
  //     description: "High-performance moisturizer for your daily skincare.",
  //     image:
  //       "https://images.unsplash.com/photo-1626806819282-2c1dc01a5e0c?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  //     colors: ["Red", "Blue", "Green"],
  //     sizes: ["Small", "Medium", "Large"],
  //     stock: 10, // Example stock value
  //   },
  //   {
  //     id: 18,
  //     name: "Face Cream",
  //     price: 59.99,
  //     category: "SkinCare",
  //     description: "High-performance moisturizer for your daily skincare.",
  //     image:
  //       "https://files.themomsco.com/site-images/1200x1200/70a934b0-487a-11ec-b6c5-957ebacf6f5e.jpg",
  //     colors: ["Red", "Blue", "Green"],
  //     sizes: ["Small", "Medium", "Large"],
  //     stock: 10, // Example stock value
  //   },
  //   {
  //     id: 19,
  //     name: "Makeup",
  //     price: 59.99,
  //     category: "SkinCare",
  //     description: "High-performance moisturizer for your daily skincare.",
  //     image:
  //       "https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?q=80&w=1487&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  //     colors: ["Red", "Blue", "Green"],
  //     sizes: ["Small", "Medium", "Large"],
  //     stock: 10, // Example stock value
  //   },
  //   {
  //     id: 20,
  //     name: "Some Thing I Waiting Tell You",
  //     price: 59.99,
  //     category: "Books",
  //     description: "High-performance moisturizer for your daily skincare.",
  //     image:
  //       "https://images-na.ssl-images-amazon.com/images/S/compressed.photo.goodreads.com/books/1661607041i/60778147.jpg",
  //     colors: ["Red", "Blue", "Green"],
  //     sizes: ["Small", "Medium", "Large"],
  //     stock: 10, // Example stock value
  //   },
  //   {
  //     id: 21,
  //     name: "Achemist",
  //     price: 59.99,
  //     category: "Books",
  //     description: "High-performance moisturizer for your daily skincare.",
  //     image:
  //       "https://5.imimg.com/data5/SELLER/Default/2021/11/QQ/SI/XU/60672026/5.jpg",
  //     colors: ["Red", "Blue", "Green"],
  //     sizes: ["Small", "Medium", "Large"],
  //     stock: 10, // Example stock value
  //   },
  //   {
  //     id: 22,
  //     name: "Cricket Bat",
  //     price: 59.99,
  //     category: "Sports",
  //     description: "High-performance moisturizer for your daily skincare.",
  //     image:
  //       "https://upload.wikimedia.org/wikipedia/commons/a/a5/A_Modern_Cricket_Bat.jpg",
  //     colors: ["Red", "Blue", "Green"],
  //     sizes: ["Small", "Medium", "Large"],
  //     stock: 10, // Example stock value
  //   },
  //   {
  //     id: 23,
  //     name: "SG Cricket Ball",
  //     price: 59.99,
  //     category: "Sports",
  //     description: "High-performance moisturizer for your daily skincare.",
  //     image:
  //       "https://www.nfsportech.com/cdn/shop/products/test2.jpg?v=1562756965",
  //     colors: ["Red", "Blue", "Green"],
  //     sizes: ["Small", "Medium", "Large"],
  //     stock: 10, // Example stock value
  //   },
  //   {
  //     id: 24,
  //     name: "Smart Watch",
  //     price: 29.99,
  //     category: "Electronics",
  //     description: "A stylish watch hoodi keeps you in style.",
  //     image:
  //       "https://images.unsplash.com/photo-1523275335684-37898b6baf30?q=80&w=1399&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  //     colors: ["Red", "Blue", "Green"],
  //     sizes: ["Small", "Medium", "Large"],
  //     stock: 10, // Example stock value
  //   },
  //   {
  //     id: 26,
  //     name: "Smart Watch",
  //     price: 29.99,
  //     category: "synsoft",
  //     description: "A stylish watch hoodi keeps you in style.",
  //     image:
  //       "https://images.unsplash.com/photo-1523275335684-37898b6baf30?q=80&w=1399&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",

  //   },
  // ];
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
