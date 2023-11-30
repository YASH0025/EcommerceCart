import React from "react";
import {
  Card,
  Typography,
  LinearProgress,
  Box,
  Container,
  Grid,
} from "@mui/material";

const OrderTracker = ({ currentStep }) => {
  const steps = [
    { title: "Order Processed", description: "Your order has been processed." },
    { title: "Order Shipped", description: "Your order has been shipped." },
    {
      title: "Order En Route",
      description: "Your order is on its way to you.",
    },
    { title: "Order Arrived", description: "Your order has arrived." },
  ];

  return (
    <section style={{ backgroundColor: "#8c9eff" }}>
      <Container>
        <Grid
          container
          justifyContent="center"
          alignItems="center"
          style={{ height: "100vh" }}
        >
          <Grid item xs={12} md={8}>
            <Card sx={{ borderRadius: 2, p: 3 }}>
              <Typography variant="h5" gutterBottom>
                INVOICE <span style={{ color: "#1890ff" }}>#Y34XDHR</span>
              </Typography>
              <Typography>
                Expected Arrival <span>01/12/19</span>
              </Typography>
              <Typography>
                USPS{" "}
                <span style={{ fontWeight: "bold" }}>
                  234094567242423422898
                </span>
              </Typography>

              <Typography variant="h6" sx={{ mt: 2, mb: 2 }}>
                Order Progress
              </Typography>

              {steps.map((step, index) => (
                <Box key={index} sx={{ mb: 2 }}>
                  <div
                    className={`step ${
                      currentStep >= index ? "completed" : ""
                    } ${currentStep === index ? "active" : ""}`}
                    style={{ display: "flex", alignItems: "center" }}
                  >
                    <div>{index + 1}</div>
                    <div style={{ marginLeft: "10px", flex: 1 }}>
                      <Typography variant="body1">{step.title}</Typography>
                      <Typography variant="body2">
                        {step.description}
                      </Typography>
                    </div>
                  </div>
                  {index < steps.length - 1 && (
                    <LinearProgress
                      variant="determinate"
                      value={((index + 1) / steps.length) * 100}
                      sx={{ my: 1, height: 8 }}
                    />
                  )}
                </Box>
              ))}
            </Card>
          </Grid>
        </Grid>
      </Container>
    </section>
  );
};

export default OrderTracker;
