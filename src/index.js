import React from "react";
// import ReactDOM from 'react-dom';
import App from "./components/App/App.js";
import { createRoot } from "react-dom/client";
import { AuthProvider } from "react-auth-kit";
import { Provider } from "react-redux";
import store from "./redux";

// ReactDOM.render(
//     <App />,
//     document.getElementById('root')
// )

const root = createRoot(document.getElementById("root"));
root.render(
  <Provider store={store}>
    <AuthProvider
      authType={"cookie"}
      authName={"_auth"}
      cookieDomain={window.location.hostname}
    >
      <App />
    </AuthProvider>
  </Provider>
);