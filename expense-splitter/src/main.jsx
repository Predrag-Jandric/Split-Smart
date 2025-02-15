import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { store } from "./store.js";
import { Provider } from "react-redux";
import { BrowserRouter as Router } from "react-router-dom";

import App from "./App.jsx";
import "./index.css";
import ScrollToTop from "./components/Utils/ScrollToTop";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <Provider store={store}>
      <Router>
        <ScrollToTop />
        <App />
      </Router>
    </Provider>
  </StrictMode>
);