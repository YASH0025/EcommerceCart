// Summary.js

import React from "react";
import { Divider, Button, Image, Typography } from "antd";
import OrderTracker from "./Stepper";
import { useDispatch } from "react-redux";
import { clearCart } from "../Store/Reducers/cartSlice";

const { Title, Text } = Typography;

const Summary = () => {
  const dispatch = useDispatch();
  const cart = JSON.parse(localStorage.getItem("Cart") || "[]");
  const totalPrize = cart
    .reduce((total: number, item: { price: number; quantity: number; }) => total + item.price * item.quantity, 0)
    .toFixed(2);

  const currentStep = 2; // Set the current step based on your order processing logic
  const handleBackToShop = () => {
    window.location.replace("/products");
    dispatch(clearCart());
  };

  return (
    <>
      <section className="gradient-custom">
        <div className="container py-5 h-100">
          <div className="row d-flex justify-content-center align-items-center h-100">
            <div className="col-lg-10 col-xl-8">
              <div className="card" style={{ borderRadius: "10px" }}>
                <div className="card-header px-4 py-5">
                  <h5 className="text-muted mb-0">
                    Thanks for your Order,{" "}
                    <span style={{ color: "#a8729a" }}>User</span>!
                  </h5>
                </div>
                <div className="card-body p-4">
                  <Title
                    level={2}
                    
                    style={{ fontWeight: "bold", marginBottom: "20px" }}
                  >
                    Order Summary
                  </Title>
                  <Divider />

                  {cart.map((item) => (
                    <div
                      key={item.id}
                      style={{
                        marginBottom: "20px",
                        padding: "15px",
                        border: "1px solid #ddd",
                        borderRadius: "8px",
                      }}
                    >
                      <Image
                        src={item.image}
                        alt={item.name}
                        style={{
                          maxWidth: "100px",
                          maxHeight: "100px",
                          marginRight: "10px",
                        }}
                      />
                      <Title level={4} style={{ marginBottom: "5px" }}>
                        {item.name} | Quantity: {item.quantity} | Price: ${" "}
                        {item.price} | Color: {item.colors} | Size: {item.sizes}
                      </Title>
                      <Divider />
                    </div>
                  ))}

                  {cart.length > 0 ? (
                    <div style={{ marginBottom: "20px" }}>
                      {/* Display total price */}
                      <div
                        style={{
                          display: "flex",
                          justifyContent: "space-between",
                          marginBottom: "20px",
                        }}
                      >
                        <Title level={4} style={{ textTransform: "uppercase" }}>
                          Total Price
                        </Title>
                        <Title level={4} style={{ fontWeight: "bold" }}>
                          $ {totalPrize}
                        </Title>
                      </div>

                      {/* Additional order information can be displayed here */}
                      <div style={{ marginBottom: "20px" }}>
                        <Title level={4} style={{ textTransform: "uppercase" }}>
                          Invoice Details
                        </Title>
                        <Text>
                          Invoice Number:{" "}
                          <span style={{ fontWeight: "bold" }}>123456</span>
                        </Text>
                        <Text>
                          | Invoice Date:{" "}
                          <span style={{ fontWeight: "bold" }}>2023-11-15</span>
                        </Text>
                      </div>
                    </div>
                  ) : (
                    <Text style={{ fontSize: "16px", color: "#555" }}>
                      No items in the order.
                    </Text>
                  )}

                  <Divider />

                  {/* Add any additional components or information you want to display */}
                  <Button type="primary" onClick={handleBackToShop}>
                    Continue Shopping
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <OrderTracker currentStep={currentStep} />
    </>
  );
};

export default Summary;
