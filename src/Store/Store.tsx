// store.ts
import {
  configureStore,
  combineReducers,
  Middleware,
} from "@reduxjs/toolkit";
import cartReducer, { CartState } from "./Reducers/cartSlice";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import productsReducer, {
  selectProducts as productsSelector,
} from "./Reducers/productsSlice";

export interface RootState {
  cart: CartState;
}

const persistConfig = {
  key: "root",
  storage,
};

const rootReducer = combineReducers({
  products: productsReducer,
  cart: cartReducer,
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

// Manually create an array of middleware
const middleware: Middleware[] = [];

// Add your custom middleware here if needed
// middleware.push(...);

const store = configureStore({
  reducer: persistedReducer,
  middleware,
});

const persistor = persistStore(store);

export { store, persistor, productsSelector as selectProducts };
