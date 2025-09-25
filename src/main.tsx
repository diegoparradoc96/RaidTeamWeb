import { createRoot } from "react-dom/client";
import { Toaster } from "@/Components/ui/toaster";
import "./index.css";
import App from "./App.tsx";
/* chakra */
import { Provider } from "./Components/ui/provider.tsx";
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
