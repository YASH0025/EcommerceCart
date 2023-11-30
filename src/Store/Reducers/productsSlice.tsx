import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Key, ReactNode } from "react";

interface Product {
  product_id: Key  ;
  product_name: ReactNode;
  id: number;
  name: string;
  price: number;
  category: string;
  description: string;
  image: string;
  sizes: string[];
  colors: string[];
  stock: number; // Add stock property
  manageStock: boolean;
}

interface ProductsState {
  products: Product[];
}

const initialState: ProductsState = {
  products: [],
};

const productSlice = createSlice({
  name: "products",
  initialState,
  reducers: {
    setProducts: (state, action: PayloadAction<Product[]>) => {
      return {
        ...state,
        products: action.payload,
      };
    },
    // ... other reducers
  },
});

export const { setProducts } = productSlice.actions;

export const selectProducts = (state: { products: ProductsState }) =>
  state.products.products;

export default productSlice.reducer;
