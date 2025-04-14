import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { Provider } from "react-redux";
import { appStore } from "./app/store";
import { Toaster } from "sonner";
import CustomLoader from "./components/CustomLoader";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <Provider store={appStore}>
      <CustomLoader>
        <App />
      </CustomLoader>
      <Toaster />
    </Provider>
  </StrictMode>
);
