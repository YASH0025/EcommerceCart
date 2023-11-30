// index.tsx
import React from "react";
import ReactDOM from "react-dom";

import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
//import { store, persistor } from './Store/Store
import "bootstrap/dist/css/bootstrap.min.css";
// import "slick-carousel/slick/slick.css";
// import "slick-carousel/slick/slick-theme.css";

import App from "./App";
import { persistor, store } from "./Store/Store";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <Router>
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <App />
        </PersistGate>
      </Provider>
    </Router>
  </React.StrictMode>
);
