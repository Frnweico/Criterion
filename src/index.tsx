import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { BrowserRouter as Router } from "react-router-dom";
import AppContextProvider from "./Context/AppContext";
import Toast from "./Components/Toast/Toast";

const rootElement = document.getElementById("root") as HTMLElement;

const AppWrapper = (
  <React.StrictMode>
    <Router>
      <AppContextProvider>
        <Toast>
          <App />
        </Toast>
      </AppContextProvider>
    </Router>
  </React.StrictMode>
);

if (rootElement.hasChildNodes()) {
  ReactDOM.hydrateRoot(rootElement, AppWrapper);
} else {
  const root = ReactDOM.createRoot(rootElement);
  root.render(AppWrapper);
}

reportWebVitals();