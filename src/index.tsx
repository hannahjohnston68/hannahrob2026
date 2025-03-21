import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./App";
import "./index.css";

// Removed StrictMode as it can cause animation issues
ReactDOM.createRoot(document.getElementById("root")!).render(
  <BrowserRouter basename="/hannahrob2026">
    <App />
  </BrowserRouter>
);
