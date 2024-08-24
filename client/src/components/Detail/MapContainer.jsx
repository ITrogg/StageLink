import { useEffect, useState } from "react";
import { useLoaderData } from "react-router-dom";
import { Text, VStack, Spinner, Flex } from "@chakra-ui/react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";

import "leaflet/dist/leaflet.css";

function ListLocation() {
  const locations = useLoaderData();
  const [userPosition, setUserPosition] = useState(null);

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setUserPosition([
            position.coords.latitude,
            position.coords.longitude,
          ]);
        },
        (error) => {
          console.error("Error getting user position:", error);
          // Fallback to a default position if geolocation fails
          setUserPosition([50.595729, 3.4809]);
        }
      );
    } else {
      // If geolocation is not supported, fallback to a default position
      setUserPosition([50.595729, 3.4809]);
    }
  }, []);

  if (!userPosition) {
    return (
      <Flex mt={20} justifyContent="center" alignItems="center" gap={5}>
        <Text>Loading map</Text>
        <Spinner />
      </Flex>
    );
  }

  return (
    <MapContainer
      center={userPosition}
      zoom={10}
      style={{ height: "100%", width: "100%" }}
    >
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      />
      {locations.map((location) => (
        <Marker
          key={location.id}
          position={[
            parseFloat(location.latitude),
            parseFloat(location.longitude),
          ]}
        >
          <Popup>
            <VStack spacing={2} align="start">
              <Text fontWeight="bold">{location.name}</Text>
              <Text>{location.events} événements</Text>
            </VStack>
          </Popup>
        </Marker>
      ))}
    </MapContainer>
  );
}

export default ListLocation;
