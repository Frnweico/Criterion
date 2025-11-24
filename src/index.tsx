import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { BrowserRouter as Router } from "react-router-dom";
import AppContextProvider from "./Context/AppContext";
import Toast from "./Components/Toast/Toast";
import { HelmetProvider } from 'react-helmet-async'; 

const rootElement = document.getElementById("root") as HTMLElement;
const root = ReactDOM.createRoot(rootElement); 

root.render(
  <React.StrictMode>
    <HelmetProvider>
      <Router>
        <AppContextProvider>
          <Toast>
            <App />
          </Toast>
        </AppContextProvider>
      </Router>
    </HelmetProvider>
  </React.StrictMode>
);

reportWebVitals();