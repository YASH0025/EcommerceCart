// cartSlice.ts
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../Store";
// import { ReactNode } from "react";

export interface ItemType {
  category: string | React.ReactNode;
  id: number;
  name: string;
  price: number;
  image: string;
  sizes: string[];
  colors: string[];
  quantity: number;
  stock: number;
  manageStock: boolean;
  imageUrls: string[];
}

export interface CartState {
  items: ItemType[];
  totalItems: number;
  currentProduct: ItemType | null;
}

const initialState: CartState = {
  items: [],
  totalItems: 0,
  currentProduct: null,
};

export const selectCart = (state: RootState) => state.cart;

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
   addToCart: (state, action: PayloadAction<ItemType>) => {
      const existingItem = state.items.find((item) => item.id === action.payload.id);

      if (existingItem) {
        if (existingItem.manageStock && existingItem.quantity < existingItem.stock) {
          existingItem.quantity += 1;
          state.totalItems += 1;
        } else if (!existingItem.manageStock) {
          existingItem.quantity += 1;
          state.totalItems += 1;
        } else {
          console.log("Cannot add more, item is out of stock");
          return;
        }
      } else {
        if (action.payload.manageStock && action.payload.stock !== undefined && action.payload.stock <= 0) {
          console.log("Item is out of stock");
          return;
        }

        state.items.push({ ...action.payload, quantity: 1 });
        state.totalItems += 1;
      }

      localStorage.setItem("Cart", JSON.stringify(state.items));
    },


    removeFromCart: (state, action: PayloadAction<number>) => {
      const itemIdToRemove = action.payload;
      const existingItemIndex = state.items.findIndex((item) => item.id === itemIdToRemove);

      if (existingItemIndex !== -1) {
        const existingItem = state.items[existingItemIndex];
        const removedQuantity = existingItem.quantity;

        if (existingItem.quantity > 1) {
          state.items[existingItemIndex] = { ...existingItem, quantity: existingItem.quantity - 1 };
        } else {
          // Remove the item from the cart
          state.items.splice(existingItemIndex, 1);
        }

        state.totalItems -= removedQuantity;
      }

      // Update localStorage
      localStorage.setItem("Cart", JSON.stringify(state.items));
    },
    removeFromCartWithAllQuantity: (state, action: PayloadAction<number>) => {
      const itemIdToRemove = action.payload;
      const existingItemIndex = state.items.findIndex(
        (item) => item.id === itemIdToRemove
      );

      if (existingItemIndex !== -1) {
        const removedQuantity = state.items[existingItemIndex].quantity;

        // Remove the item from the cart
        state.items.splice(existingItemIndex, 1);

        state.totalItems -= removedQuantity;
      }
      localStorage.setItem("Cart", JSON.stringify(state.items));
    },

    updateCartItem: (state, action: PayloadAction<ItemType>) => {
      const updatedItem = action.payload;
      const index = state.items.findIndex((item) => item.id === updatedItem.id);

      if (index !== -1) {
        state.items[index] = updatedItem;
      }
      localStorage.setItem("Cart", JSON.stringify(state.items));
    },

    setCurrentProduct: (state, action: PayloadAction<ItemType | null>) => {
      state.currentProduct = action.payload;
    },

    clearCurrentProduct: (state) => {
      state.currentProduct = null;
    },

    clearCart: (state) => {
      state.items = [];
      state.totalItems = 0;
      localStorage.removeItem("Cart");
    },

    removeFromTotal: (state, action: PayloadAction<number>) => {
      state.totalItems -= action.payload;
    },
  },
});

export const {
  addToCart,
  removeFromCart,
  clearCart,
  removeFromCartWithAllQuantity,
  updateCartItem,
  setCurrentProduct,
  clearCurrentProduct,
} = cartSlice.actions;

export default cartSlice.reducer;
