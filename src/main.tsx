import "./index.scss";

import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";

import App from "./App.tsx";
import { GlobalErrorBoundary } from "./components/ErrorBoundary/GlobalErrorBoundary.tsx";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <GlobalErrorBoundary>
      <BrowserRouter basename="/kidsGames">
        <App />
      </BrowserRouter>
    </GlobalErrorBoundary>
  </StrictMode>,
);
