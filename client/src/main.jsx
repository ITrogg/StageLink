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
import UserProfile from "./pages/explore/UserProfile";
import DashboardLayout from "./pages/layout/DashboardLayout";
import ProfilePage from "./pages/dashboard/ProfilePage";
import AgendaPage from "./pages/dashboard/AgendaPage";
import FavoritesPage from "./pages/dashboard/FavoritesPage";
import FriendsPage from "./pages/dashboard/FriendsPage";

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
            path: "artistes",
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
          {
            path: "user/:id",
            element: <UserProfile />,
          },
          {
            path: "dashboard",
            element: <DashboardLayout />, // Nouveau layout pour le Dashboard
            children: [
              {
                path: "profile",
                element: <ProfilePage />,
              },
              {
                path: "agenda",
                element: <AgendaPage />,
              },
              {
                path: "favorites",
                element: <FavoritesPage />,
              },
              {
                path: "friends",
                element: <FriendsPage />,
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
