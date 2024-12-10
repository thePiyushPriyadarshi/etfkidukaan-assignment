import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { BrowserRouter } from "react-router";
import { Toaster } from "sonner";
import { Provider } from "@/components/ui/provider";
import { QueryProvier } from "./provider/query-provider";
import { Provider as ReduxProvider } from "react-redux";
import { store } from "./redux/store.ts";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <Provider>
      <BrowserRouter>
        <QueryProvier>
          <ReduxProvider store={store}>
            <App />
            <Toaster />
          </ReduxProvider>
        </QueryProvier>
      </BrowserRouter>
    </Provider>
  </StrictMode>
);
