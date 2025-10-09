import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import Web3Provider from "./providers/Web3Provider.tsx";
import { ThemeProvider } from "./providers/ThemeProvider.tsx";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <Web3Provider>
      <ThemeProvider>
        <App />
      </ThemeProvider>
    </Web3Provider>
  </StrictMode>
);
