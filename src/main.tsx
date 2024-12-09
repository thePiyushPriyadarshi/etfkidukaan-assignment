import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { BrowserRouter } from "react-router";

import { Provider } from "@/components/ui/provider";
import { QueryProvier } from "./components/query-provider.tsx";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <Provider>
      <BrowserRouter>
        <QueryProvier>
          <App />
        </QueryProvier>
      </BrowserRouter>
    </Provider>
  </StrictMode>
);
