import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { BrowserRouter as Router } from "react-router-dom";
import AppContextProvider from "./Context/AppContext";
import Toast from "./Components/Toast/Toast";

const isSnap = navigator.userAgent === "ReactSnap";

const rootElement = document.getElementById("root") as HTMLElement;

if (rootElement.hasChildNodes() && !isSnap) {
  ReactDOM.hydrateRoot(
    rootElement,
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
} else {
  const root = ReactDOM.createRoot(rootElement);
  root.render(
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
}

reportWebVitals();
