import React from "react";
import ReactDOM from "react-dom/client";

import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { ChakraProvider } from "@chakra-ui/react";

import App from "./App";
import Connection from "./pages/Connection";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
  },
  {
    path: "/connexion",
    element: <Connection />,
  },
]);

const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
  <React.StrictMode>
    <ChakraProvider>
      <RouterProvider router={router} />
    </ChakraProvider>
  </React.StrictMode>
);
