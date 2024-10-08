import React from "react";
import ReactDOM from "react-dom/client";

import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { ChakraProvider } from "@chakra-ui/react";
import { AuthProvider } from "./services/AuthContext";

import Welcome from "./pages/Welcome";
import App from "./App";
import Home from "./pages/explore/Home";
import ConnectedLayout from "./pages/layout/ConnectedLayout";
import ListArtist from "./pages/explore/ListArtist";
import DetailArtist from "./pages/explore/DetailsPages/DetailArtist";
import ListLocation from "./pages/explore/ListLocation";
import DetailLocation from "./pages/explore/DetailsPages/DetailLocation";
import ListEvent from "./pages/explore/ListEvent";
import DetailEvent from "./pages/explore/DetailsPages/DetailEvent";
import DashboardLayout from "./pages/layout/DashboardLayout";
import NewEvent from "./pages/NewEvent";

import connexion from "./services/connexion";

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
            path: "/",
            element: <Home />,
          },
          {
            path: "artistes",
            element: <ListArtist />,
            loader: async () => {
              try {
                const artists = await connexion.get(`/api/artist`);
                return artists.data;
              } catch (error) {
                throw new Error(error);
              }
            },
          },
          {
            path: "artistes/:id",
            element: <DetailArtist />,
            loader: async ({ params }) => {
              try {
                const [artist, tags, pastEvents, futurEvents] =
                  await Promise.all([
                    connexion.get(`/api/artist/${params.id}`),
                    connexion.get(
                      `api/tag?type=byArtist&artistId=${params.id}`
                    ),
                    connexion.get(
                      `/api/event?type=pastByArtist&artistId=${params.id}`
                    ),
                    connexion.get(
                      `/api/event?type=futurByArtist&artistId=${params.id}`
                    ),
                  ]);
                return [
                  artist.data,
                  tags.data,
                  pastEvents.data,
                  futurEvents.data,
                ];
              } catch (error) {
                throw new Error(error);
              }
            },
          },
          {
            path: "salles",
            element: <ListLocation />,
            loader: async () => {
              try {
                const places = await connexion.get(`/api/place`);
                return places.data;
              } catch (error) {
                throw new Error(error);
              }
            },
          },
          {
            path: "salles/:id",
            element: <DetailLocation />,
            loader: async ({ params }) => {
              try {
                const [place, futurEvents, pastEvents] = await Promise.all([
                  connexion.get(`/api/place/${params.id}`),
                  connexion.get(
                    `/api/event?type=futurByLocation&locationId=${params.id}`
                  ),
                  connexion.get(
                    `/api/event?type=pastByLocation&locationId=${params.id}`
                  ),
                ]);
                return [place.data, futurEvents.data, pastEvents.data];
              } catch (error) {
                throw new Error(error);
              }
            },
          },
          {
            path: "evenements",
            element: <ListEvent />,
            loader: async () => {
              try {
                const event = await connexion.get(`/api/event`);
                return event.data;
              } catch (error) {
                throw new Error(error);
              }
            },
          },
          {
            path: "evenements/nouveau",
            element: <NewEvent />,
          },
          {
            path: "evenements/:id",
            element: <DetailEvent />,
            loader: async ({ params }) => {
              try {
                const [event, artists] = await Promise.all([
                  connexion.get(`/api/event/${params.id}`),
                  connexion.get(
                    `/api/artist?type=byEvent&eventId=${params.id}`
                  ),
                ]);
                return [event.data, artists.data];
              } catch (error) {
                throw new Error(error);
              }
            },
          },
        ],
      },
      {
        path: "dashboard",
        element: <DashboardLayout />,
        children: [
          {
            path: "",
          },
          {
            path: "agenda",
          },
          {
            path: "favorites",
          },
          {
            path: "friends",
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
      <AuthProvider>
        <RouterProvider router={router} />
      </AuthProvider>
    </ChakraProvider>
  </React.StrictMode>
);
