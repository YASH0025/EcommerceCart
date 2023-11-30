import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Radio, Button, Row, Col, Typography } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { setCurrentProduct, updateCartItem } from "../Store/Reducers/cartSlice";
import { selectProducts } from "../Store/Store";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const { Title, Paragraph } = Typography;

const EditCart: React.FC = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const allProducts = useSelector(selectProducts);
  const dispatch = useDispatch();

  // State variables
  const [matchedProduct, setMatchedProduct] = useState(null);
  const [selectedColor, setSelectedColor] = useState("");
  const [selectedSize, setSelectedSize] = useState("");
  const [quantity, setQuantity] = useState(0);

  // const currentProduct = useSelector((state) => state.currentProduct);

  useEffect(() => {
    const matchedProduct = allProducts.find(
      (product) => product.id === Number(id)
    );

    if (matchedProduct) {
      dispatch(setCurrentProduct(matchedProduct));
      setMatchedProduct(matchedProduct);
      setQuantity(matchedProduct.quantity || 1);
    } else {
      console.log("Product not found in the store with ID:", id);
    }
  }, [dispatch, allProducts, id]);

  useEffect(() => {
    const urlSearchParams = new URLSearchParams(window.location.search);
    const colorFromUrl = urlSearchParams.get("color") || "";
    const sizeFromUrl = urlSearchParams.get("size") || "";
    const quantityFromUrl = urlSearchParams.get("quantity") || "";

    if (matchedProduct) {
      setSelectedColor(
        matchedProduct.colors.includes(colorFromUrl)
          ? colorFromUrl
          : matchedProduct.colors[0] || ""
      );
      setSelectedSize(
        matchedProduct.sizes.includes(sizeFromUrl)
          ? sizeFromUrl
          : matchedProduct.sizes[0] || ""
      );

      // Set the quantity from the URL parameter
      setQuantity(Number(quantityFromUrl) || 1);
    }
  }, [matchedProduct]);

  const handleSaveChanges = () => {
    const updatedCartItem = {
      ...matchedProduct ,
      colors: [selectedColor],
      sizes: [selectedSize],
      quantity: quantity,
    };
    toast.success("Item updated", { position: "top-right" });

    dispatch(updateCartItem(updatedCartItem));

    navigate("/cart");

    // Display a toast for saving changes
  };

  if (!matchedProduct) {
    return <div>Loading...</div>;
  }

  return (
    <Row gutter={16} style={{ marginTop: 16 }}>
      <Col span={12}>
        {matchedProduct.image && (
          <img
            src={matchedProduct.image}
            alt={matchedProduct.name}
            style={{ maxWidth: "100%", height: "auto" }}
          />
        )}
      </Col>
      <Col span={12}>
        <Title level={2}>{matchedProduct.name}</Title>
        <Paragraph style={{ fontSize: "20px", color: "green" }}>
          Price: ${matchedProduct.price}
        </Paragraph>

        {matchedProduct.colors && (
          <div style={{ marginBottom: "20px" }}>
            <Title level={4}>Colors:</Title>
            <Radio.Group
              value={selectedColor}
              buttonStyle="solid"
              onChange={(e) => setSelectedColor(e.target.value)}
            >
              {matchedProduct.colors.map((color, index) => (
                <Radio key={index} value={color}>
                  {color}
                </Radio>
              ))}
            </Radio.Group>
          </div>
        )}

        {matchedProduct.sizes && (
          <div style={{ marginBottom: "20px" }}>
            <Title level={4}>Sizes:</Title>
            <Radio.Group
              value={selectedSize}
              buttonStyle="solid"
              onChange={(e) => setSelectedSize(e.target.value)}
            >
              {matchedProduct.sizes.map((size, index) => (
                <Radio key={index} value={size}>
                  {size}
                </Radio>
              ))}
            </Radio.Group>
          </div>
        )}

        <Button type="primary" onClick={handleSaveChanges}>
          Save Changes
        </Button>
      </Col>
      {/* Toast Container for displaying notifications */}
      <ToastContainer position="top-right" />
    </Row>
  );
};

export default EditCart;
