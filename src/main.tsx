import { createRoot } from "react-dom/client";
import { Toaster } from "@/components/ui/toaster.tsx";
import "./index.css";
import App from "./App.tsx";
/* chakra */
import { Provider } from "./components/ui/provider.tsx";
/* context */
import ContextProvider from "./context/ContextProvider";
import { ColorModeProvider } from "./components/ui/color-mode";

createRoot(document.getElementById("root")!).render(
  <>
    <script src="localforage.js"></script>
    <ColorModeProvider forcedTheme="dark">
      <Provider>
        <ContextProvider>
          <Toaster />
          <App />
        </ContextProvider>
      </Provider>
    </ColorModeProvider>
  </>
);
