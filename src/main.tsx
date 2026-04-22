import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import "@fontsource-variable/league-spartan/wght.css";
import App from "./App.tsx";
import InvoiceProvider from "./context/invoice-context.tsx";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <InvoiceProvider>
      <App />
    </InvoiceProvider>
  </StrictMode>,
);
