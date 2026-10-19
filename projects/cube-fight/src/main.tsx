import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import "nes.css/css/nes.min.css";
import "@fontsource/tiny5";
import "./index.css";

const rootElement = document.getElementById("root");

if (!rootElement) {
  throw new Error('Root element "#root" not found.');
}

createRoot(rootElement).render(
  <StrictMode>
    <App />,
  </StrictMode>,
);
