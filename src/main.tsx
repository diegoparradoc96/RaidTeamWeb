import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { Toaster } from "@/components/ui/toaster";
import "./index.css";
import App from "./App.tsx";

/* Atlasian drag and drop */
import AppProvider from "@atlaskit/pragmatic-drag-and-drop";
/* chakra */
import { Provider } from "./components/ui/provider.tsx";
/* context */
import ContextProvider from "./context/ContextProvider";

createRoot(document.getElementById("root")!).render(
  <>
    <script src="localforage.js"></script>
    <Provider>
      <ContextProvider>
        <Toaster />
        <App />
      </ContextProvider>
    </Provider>
  </>
);
