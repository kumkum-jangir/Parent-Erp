import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./assets/css/style.scss";
import './assets/css/source-sans-pro-font/SourceSansPro-Regular.woff';
import 'bootstrap/dist/css/bootstrap.min.css';
export { default as SignIn } from "./components/pages/Login";

const root = ReactDOM.createRoot(document.getElementById("root"));
const app = (
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

root.render(app);
