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
import NewEvent from "./pages/explore/NewEvent";

const router = createBrowserRouter([
  {
    path: "/welcome",
    element: <Welcome />,
  },
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "",
        element: <ConnectedLayout />,
        children: [
          {
            path: "artistes",
            element: <ListArtist />,
          },
          {
            path: "artistes/:id",
            element: <DetailArtist />,
          },
          {
            path: "salles",
            element: <ListLocation />,
          },
          {
            path: "salles/:id",
            element: <DetailLocation />,
          },
          {
            path: "evenements",
            element: <ListEvent />,
          },
          {
            path: "evenements/nouveau",
            element: <NewEvent />,
          },
          {
            path: "evenements/:id",
            element: <DetailEvent />,
          },
          {
            path: "user/:id",
            element: <UserProfile />,
          },
        ],
      },
      {
        path: "dashboard",
        element: <DashboardLayout />,
        children: [
          {
            path: "",
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
]);

const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
  <React.StrictMode>
    <ChakraProvider>
      <RouterProvider router={router} />
    </ChakraProvider>
  </React.StrictMode>
);
