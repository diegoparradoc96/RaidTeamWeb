import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";

/* chakra */
import { Provider } from "./Components/ui/provider";
/* context */
import ContextProvider from "./context/ContextProvider";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <Provider>
      <ContextProvider>
        <App />
      </ContextProvider>
    </Provider>
  </StrictMode>
);
