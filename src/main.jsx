import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { CartProvider } from "../src/context/cartContext";
import { UserProvider } from "../src/context/UserContext";
import { CustomerProvider } from "./context/CustomerContext";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <UserProvider>
      <CartProvider>
        <CustomerProvider>
          <App />
        </CustomerProvider>
      </CartProvider>
    </UserProvider>
  </React.StrictMode>
);
