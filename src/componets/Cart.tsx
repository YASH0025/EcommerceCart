
import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../Store/Store";
import { Card, Button, Input, Row, Col, Divider } from "antd";
import {
  addToCart,
  clearCart,
  removeFromCart,
  removeFromCartWithAllQuantity,
  setCurrentProduct,
} from "../Store/Reducers/cartSlice";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { confirmAlert } from "react-confirm-alert";
import "react-confirm-alert/src/react-confirm-alert.css";
const { Option } = Input;
const Cart: React.FC = () => {
  const navigate = useNavigate();
  const cartItems = useSelector((state: RootState) => state.cart.items);
  const dispatch = useDispatch();
  const handleIncrement = (itemId: number) => {
    dispatch(
      addToCart({
        id: itemId,
        name: "",
        price: 0,
        image: "",
        sizes: [],
        colors: [],
        quantity: 0,
        stock: 0,
        manageStock: false,
      })
    );
    // Display green toast for quantity increase
    toast.success("Quantity increased!", { position: "top-right" });
  };
  const handleDecrement = (itemId: number) => {
    dispatch(removeFromCart(itemId));
    // Display red toast for quantity decrease
    toast.error("Quantity decreased!", { position: "top-right" });
  };
  const handleRemoveProductFromCart = (itemId: number) => {
    dispatch(removeFromCartWithAllQuantity(itemId));
    // Display a different colored toast for product removal
    toast.info("Product removed from cart!", { position: "top-right" });
  };
  const calculateTotalPrice = () => {
    return cartItems
      .reduce((total, item) => total + item.price * item.quantity, 0)
      .toFixed(2);
  };
  const handleCheckout = () => {
    if (cartItems.length > 0) {
      confirmAlert({
        title: "Confirm Checkout",
        message: "Are you sure you want to proceed with the checkout?",
        buttons: [
          {
            label: "Yes",
            onClick: () => {
              localStorage.setItem("Cart", JSON.stringify(cartItems));
              // alert("Successfully Checked Out!");
              // Additional actions if needed, e.g., clearing the cart
              navigate("/cart/summery");
            },
          },
          {
            label: "No",
            onClick: () => {
              // Do nothing if the user clicks "No"
            },
          },
        ],
      });
    } else {
      toast.error("Your cart is empty.", { position: "top-right" });
    }
  };
  const handleClearFromCart = () => {
    dispatch(clearCart());
    // Display a different colored toast for clearing the cart
    toast.warn("Cart cleared!", { position: "top-right" });
  };
  const handleEdit = (item) => {
    localStorage.setItem("currentProduct", JSON.stringify(item));
    dispatch(setCurrentProduct(item));
    navigate(
      `/cart/edit/${item.id}?color=${item.colors[0]}&size=${item.sizes[0]}&quantity=${item.quantity}`
    );
  };
  return (
    <section className="h-100 h-custom w-100" style={{ backgroundColor: "#d2c9ff" }}>
      <div className="container py-5 h-100">
        <div className="row d-flex justify-content-center align-items-center h-100">
          <div className="col-lg-8">
            <Card
              className="card-registration card-registration-2"
              style={{
                borderRadius: "15px",
                boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
              }}
            >
              <div className="card-body p-0">
                <div className="p-3 p-md-5">
                  <div className="d-flex justify-content-between align-items-center mb-3">
                    <h1 className="fw-bold mb-0 text-black">Shopping Cart</h1>
                    <h6 className="mb-0 text-muted">{cartItems.length} items</h6>
                  </div>
                  <Button
                    type="primary"
                    icon={<i className="fas fa-times" />}
                    onClick={() => handleClearFromCart()}
                    style={{ backgroundColor: "red", borderColor: "red" }}
                    block
                  >
                    Clear Cart
                  </Button>
                  <Divider />
                  {cartItems.length === 0 ? (
                    <p>Your cart is empty.</p>
                  ) : (
                    <Row gutter={[16, 16]}> 
                      {cartItems.map((item) => (
                        <Col key={item.id} xs={24}>
                          <Card>
                            <Row gutter={16}>
                              <Col xs={24} sm={6}>
                                <img
                                  src={item.image}
                                  className="img-fluid rounded-3"
                                  alt={item.name}
                                />
                              </Col>
                              <Col xs={24} sm={10}>
                                <h6 className="text-muted">Product: {item.name}</h6>
                                <h6 className="text-muted">Colour: {item.colors}</h6>
                                <h6 className="text-muted">Size: {item.sizes}</h6>
                                <p className="text-black mb-0">Category: {item.category}</p>
                              </Col>
                              <Col xs={24} sm={8}>
                                <Row gutter={16} justify="space-between" align="middle">
                                  <Col span={8}>
                                    <Button
                                      type="primary"
                                      icon={<i className="fas fa-minus" />}
                                      onClick={() => handleDecrement(item.id)}
                                      block
                                    >
                                      -
                                    </Button>
                                  </Col>
                                  <span className="mb-0">{item.quantity}</span>
                                  <Col span={8}>
                                    <Button
                                      type="primary"
                                      icon={<i className="fas fa-plus" />}
                                      onClick={() => handleIncrement(item.id)}
                                      block
                                    >
                                      +
                                    </Button>
                                  </Col>
                                </Row>
                                <Row
                                  gutter={16}
                                  justify="space-between"
                                  align="middle"
                                  style={{ marginTop: "8px" }}
                                >
                                  <Col span={24}>
                                    <Button
                                      type="primary"
                                      icon={<i className="fas fa-times" />}
                                      onClick={() => handleRemoveProductFromCart(item.id)}
                                      style={{ backgroundColor: "red", borderColor: "red" }}
                                      block
                                    >
                                      Remove Product
                                    </Button>
                                    <Button
                                      type="primary"
                                      onClick={() => handleEdit(item)}
                                      block
                                    >
                                      Edit Your Product
                                    </Button>
                                    <span className="mb-0">Quantity: {item.quantity}</span>
                                  </Col>
                                </Row>
                              </Col>
                            </Row>
                            <Row gutter={16} justify="space-between" align="middle">
                              <Col xs={24} sm={6}>
                                <h6 className="mb-0">Price: $ {item.price}</h6>
                              </Col>
                            </Row>
                          </Card>
                        </Col>
                      ))}
                    </Row>
                  )}
                  <Divider />
                  <div className="pt-3">
                    <h6 className="mb-0">
                      <a href="/products" className="text-body">
                        <i className="fas fa-long-arrow-alt-left me-2" />
                        Back to shop
                      </a>
                    </h6>
                  </div>
                </div>
              </div>
            </Card>
          </div>
          <div className="col-lg-4 bg-grey">
            {cartItems.length > 0 && (
              <div className="p-3 p-md-5">
                <h3 className="fw-bold mb-5 mt-2 pt-1">Summary</h3>
                <Divider />
                <div className="d-flex justify-content-between mb-4">
                  <h5 className="text-uppercase">Items {cartItems.length}</h5>
                  <h5>Total Price: € {calculateTotalPrice()}</h5>
                </div>
                <h5 className="text-uppercase mb-3">Shipping</h5>
                <h5 className="text-uppercase mb-3">Discount Code</h5>
                <div className="mb-5">
                  <Input type="text" id="discountCode" />
                </div>
                <Divider />
                <div className="d-flex justify-content-between mb-5">
                  <h5 className="text-uppercase">Total Price</h5>
                  <h5>€ {calculateTotalPrice()}</h5>
                </div>
                <Button type="primary" block onClick={handleCheckout}>
                  Checkout
                </Button>
              </div>
            )}
          </div>
        </div>
      </div>
      <ToastContainer position="top-right" />
    </section>
  );
};
export default Cart;