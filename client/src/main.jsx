import React from "react";
import ReactDOM from "react-dom/client";

import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { ChakraProvider } from "@chakra-ui/react";

import Connection from "./pages/Connection";
import SignIn from "./pages/SignIn";
import App from "./App";
import ConnectedLayout from "./pages/layout/ConnectedLayout";

const router = createBrowserRouter([
  {
    path: "/connexion",
    element: <Connection />,
  },
  {
    path: "/inscription",
    element: <SignIn />,
  },
  {
    path: "/",
    element: <ConnectedLayout />,
    children: [
      {
        path: "",
        element: <App />,
      },
    ],
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
