// import React from "react"
// import { createRoot } from "react-dom/client"
// import { Provider } from "react-redux"
// import App from "./App"
// import { store } from "./app/store"
// import "./index.css"

// const container = document.getElementById("root")

// if (container) {
//   const root = createRoot(container)

//   root.render(
//     <React.StrictMode>
//       <Provider store={store}>
//         <App />
//       </Provider>
//     </React.StrictMode>,
//   )
// } else {
//   throw new Error(
//     "Root element with ID 'root' was not found in the document. Ensure there is a corresponding HTML element with the ID 'root' in your HTML file.",
//   )
// }

import React from "react";
import { createRoot } from "react-dom/client";
import App from "./App";
import { BrowserRouter } from "react-router-dom";
import './index.css'
import { Provider } from "react-redux";
import store from "./app/store";

const container = document.getElementById("root");
if (!container) throw new Error("Failed to find the root element");

const root = createRoot(container);
root.render(
  <React.StrictMode>
    <Provider store={store}>
    <BrowserRouter>
      <App />
    </BrowserRouter>
    </Provider>
  </React.StrictMode>
);
