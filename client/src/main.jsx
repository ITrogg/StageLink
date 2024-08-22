import React from "react";
import ReactDOM from "react-dom/client";

import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { ChakraProvider } from "@chakra-ui/react";

import Welcome from "./pages/Welcome";
import App from "./App";
import ConnectedLayout from "./pages/layout/ConnectedLayout";
import ListArtist from "./pages/explore/ListArtist";
import DetailArtist from "./pages/explore/DetailArtist";
import ListLocation from "./pages/explore/ListLocation";
import DetailLocation from "./pages/explore/DetailLocation";
import ListEvent from "./pages/explore/ListEvent";
import DetailEvent from "./pages/explore/DetailEvent";

const router = createBrowserRouter([
  {
    path: "/welcome",
    element: <Welcome />,
  },
  {
    path: "/",
    element: <ConnectedLayout />,
    children: [
      {
        path: "",
        element: <App />,
        children: [
          {
            path: "artists",
            element: <ListArtist />,
            children: [
              {
                path: ":id",
                element: <DetailArtist />,
              },
            ],
          },
          {
            path: "salles",
            element: <ListLocation />,
            children: [
              {
                path: ":id",
                element: <DetailLocation />,
              },
            ],
          },
          {
            path: "evenements",
            element: <ListEvent />,
            children: [
              {
                path: ":id",
                element: <DetailEvent />,
              },
            ],
          },
        ],
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
