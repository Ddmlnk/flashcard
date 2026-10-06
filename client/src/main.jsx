// client/src/main.jsx
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { HashRouter } from "react-router-dom";
import "./index.css";
import App from "./App.jsx";
import { CardsProvider } from "./context/CardsProvider.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <HashRouter>
      <CardsProvider>
        <App />
      </CardsProvider>
    </HashRouter>
  </StrictMode>,
);
