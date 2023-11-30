import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Row, Col, Button, Radio, Typography, Card } from "antd";
import { addToCart, setCurrentProduct } from "../Store/Reducers/cartSlice";
import { useDispatch, useSelector } from "react-redux";
import { selectProducts } from "../Store/Store";
import { Carousel } from "react-bootstrap";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import ProductReviews from "../componets/ProductReview";

const { Title, Paragraph } = Typography;

interface ProductDetailsProps {}

const ProductDetails: React.FC<ProductDetailsProps> = () => {
  const dispatch = useDispatch();
  const products = useSelector(selectProducts);
  const { productId } = useParams<{ productId: string }>();
  const product = products.find((p) => p.id === Number(productId));
  const cartItems = useSelector((state) => state.cart.items);

  const selectedProductInCart = cartItems.find(
    (item: { id: number }) => item.id === (product?.id || 0)
  ) as { id: number; quantity: number } | undefined;

  const [selectedColor, setSelectedColor] = useState<string>(
    product?.colors ? product.colors[0] : ""
  );
  const [selectedSize, setSelectedSize] = useState<string>(
    product?.sizes ? product.sizes[0] : ""
  );
  const [outOfStock, setOutOfStock] = useState<boolean>(false);
  const [showReviews, setShowReviews] = useState<boolean>(false);
  // const [currentImageIndex, setCurrentImageIndex] = useState(0);

  useEffect(() => {
    if (product) {
      dispatch(setCurrentProduct(product));
    }
  }, [dispatch, product]);

  useEffect(() => {
    const intervalId = setInterval(() => {
      document.querySelector(".carousel-control-next")?.click();
    }, 3000);

    return () => clearInterval(intervalId);
  }, []);

  const handleAddToCart = () => {
    if (!product) {
      console.error("Product not found");
      return;
    }

    if (
      product.manageStock &&
      product.stock !== undefined &&
      product.stock <= 0
    ) {
      console.error("Product is out of stock");
      setOutOfStock(true);
      toast.error("Product is out of stock", { position: "top-right" });
      return;
    }

    if (
      product.manageStock &&
      selectedProductInCart?.quantity >= (product.stock || 0)
    ) {
      setOutOfStock(true);
      console.error("Reached stock limit for the product");
      toast.error("Reached stock limit for the product", {
        position: "top-right",
      });
      return;
    }

    setOutOfStock(false);

    dispatch(
      addToCart({
        id: product.id,
        name: product.name,
        price: product.price,
        image: product.image,
        category: product.category,
        sizes: [selectedSize],
        colors: [selectedColor],
        quantity: 1,
        stock: product.stock || 0,
        manageStock: product.manageStock,
        imageUrls: [],
      })
    );

    toast.success("Product added to cart!", { position: "top-right" });
  };

  const toggleReviews = () => {
    setShowReviews(!showReviews);
  };

  const reviews = [
    {
      id: 1,
      rating: 4,
      comment: "Great product! Love the design.",
      createdAt: "2023-01-01",
    },
    {
      id: 2,
      rating: 5,
      comment: "loved the product and quality. Worth the price.",
      createdAt: "2023-01-02",
    },
    // ... rest of the reviews
  ];

  const renderColorOptions = () => {
    if (product?.colors) {
      return (
        <div style={{ marginBottom: "20px" }}>
          <Title level={4}>Colors:</Title>
          <Radio.Group
            defaultValue={selectedColor}
            buttonStyle="solid"
            onChange={(e) => setSelectedColor(e.target.value)}
          >
            {product.colors.map((color: string, index: number) => (
              <Radio key={index} value={color}>
                {color}
              </Radio>
            ))}
          </Radio.Group>
        </div>
      );
    }
    return null;
  };

  const renderSizeOptions = () => {
    if (product?.sizes) {
      return (
        <div style={{ marginBottom: "20px" }}>
          <Title level={4}>Sizes:</Title>
          <Radio.Group
            defaultValue={selectedSize}
            buttonStyle="solid"
            onChange={(e) => setSelectedSize(e.target.value)}
          >
            {product.sizes.map((size: string, index: number) => (
              <Radio key={index} value={size}>
                {size}
              </Radio>
            ))}
          </Radio.Group>
        </div>
      );
    }
    return null;
  };

  const renderDescription = () => {
    if (product?.description) {
      return (
        <div>
          <Title level={4}>Description:</Title>
          <Paragraph style={{ fontSize: "16px", margin: "10px 0" }}>
            {product.description}
          </Paragraph>
        </div>
      );
    }
    return null;
  };

  const renderKeyFeatures = () => (
    <div>
      <Title level={4}>Key Features:</Title>
      <ul>
        <Paragraph>
          <li>High-quality materials</li>
        </Paragraph>
        <Paragraph>
          <li>Modern design</li>
        </Paragraph>
        <Paragraph>
          <li>Easy to assemble</li>
        </Paragraph>
      </ul>
    </div>
  );

  const renderCustomerReviews = () => (
    <div>
      <Title level={4} onClick={toggleReviews} style={{ cursor: "pointer" }}>
        Customer Reviews:
      </Title>
      {showReviews && <ProductReviews reviews={reviews} />}
    </div>
  );

  const renderAddToCartButton = () => (
    <Button
      type="primary"
      onClick={handleAddToCart}
      disabled={
        outOfStock ||
        (product?.manageStock &&
          selectedProductInCart?.quantity >= (product.stock || 0))
      }
      style={{
        fontSize: "18px",
        width: "100%",
        display: "block",
        margin: "auto",
        marginBottom: "10px",
        textAlign: "center",
        height: "50px",
      }}
    >
      {getAddToCartButtonText()}
    </Button>
  );

  const getAddToCartButtonText = () => {
    if (outOfStock) {
      return <span style={{ color: "red" }}>Out of Stock</span>;
    } else if (product?.manageStock) {
      if (product.stock && product.stock <= 0) {
        return "Out of Stock";
      } else if (
        selectedProductInCart?.quantity >= (product.stock || 0)
      ) {
        return "Reached Stock Limit";
      }
    }
    return "Add to Cart";
  };

  return (
    <div>
      <style>
        {`
          .carousel-container {
            max-width: 80%; /* Adjust the max-width to your preference */
            margin: auto; /* Center the carousel */
            overflow: hidden;
          }

          .carousel-inner {
            display: flex;
            align-items: center;
            overflow: hidden;
          }

          .carousel-item {
            width: 100%;
            text-align: center;
            overflow: hidden;
          }

          .carousel-item img {
            max-width: 100%; /* Make the images responsive */
            height: auto; /* Maintain the aspect ratio of the images */
          }
        `}
      </style>
      <Row gutter={1}>
        <Col xs={24} sm={24} md={14}>
          <Card>
            <div className="carousel-container">
              {product?.imageUrls && product.imageUrls.length > 0 ? (
                <Carousel interval={3000} controls indicators>
                  {product.imageUrls.map((imageUrl, index) => (
                    <Carousel.Item key={index}>
                      <img
                        className="d-block w-100"
                        src={imageUrl}
                        alt={`${product.name} - ${index + 1}`}
                      />
                    </Carousel.Item>
                  ))}
                </Carousel>
              ) : (
                <p>No images available</p>
              )}
            </div>
          </Card>
        </Col>
        <Col xs={24} sm={24} md={10}>
          <Card>
            <Title level={2}>{product?.name}</Title>
            <Paragraph style={{ fontSize: "20px", color: "green" }}>
              Price: ${product?.price}
            </Paragraph>
            {renderColorOptions()}
            {renderSizeOptions()}
            {renderDescription()}
            {renderKeyFeatures()}
            {renderCustomerReviews()}
            {renderAddToCartButton()}
          </Card>
        </Col>
      </Row>
      <ToastContainer position="top-right" />
    </div>
  );
};

export default ProductDetails;
