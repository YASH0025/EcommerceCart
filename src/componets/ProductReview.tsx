// ProductReviews.tsx

import React from "react";
import { List, Typography, Box, Rating, Paper } from "@mui/material";
import moment from "moment";

interface Review {
  id: number;
  rating: number;
  comment: string;
  createdAt: string | Date;
}

interface ProductReviewsProps {
  reviews: Review[];
}

const ProductReviews: React.FC<ProductReviewsProps> = ({ reviews }) => {
  return (
    <Box mt={3}>
      <Typography variant="h6">Customer Reviews</Typography>
      <List component="div" aria-label="product reviews">
        {reviews.map((review) => (
          <div key={review.id}>
            <Paper elevation={3} style={{ padding: "16px" }}>
              <Box display="flex" alignItems="center" mb={1}>
                <Rating
                  name={`rating-${review.id}`}
                  value={review.rating}
                  precision={0.5}
                  readOnly
                />
                <Box ml={2}>
                  <Typography variant="subtitle2">
                    {moment(review.createdAt).fromNow()} (
                    {moment(review.createdAt).format("YYYY-MM-DD HH:mm:ss")})
                  </Typography>
                </Box>
              </Box>
              <Typography>{review.comment}</Typography>
            </Paper>
          </div>
        ))}
      </List>
    </Box>
  );
};

export default ProductReviews;
