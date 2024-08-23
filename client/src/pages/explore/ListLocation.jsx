import { useLoaderData } from "react-router-dom";
import { Box, Heading, Text, VStack } from "@chakra-ui/react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";

// Création d'une icône personnalisée avec CSS et SVG
const CustomIcon = L.divIcon({
  className: "custom-icon",
  html: `
    <div style="
      display: flex; 
      align-items: center; 
      justify-content: center; 
      width: 40px; 
      height: 40px; 
      background: #ffeb3b; 
      border-radius: 50%; 
      box-shadow: 0 0 10px rgba(0,0,0,0.3);
      font-size: 24px;
      color: black;
    ">
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24" fill="currentColor">
        <path d="M12 2a5 5 0 0 0-5 5c0 2.47 3.2 7.4 4.5 9.7 1.3-2.3 4.5-7.2 4.5-9.7a5 5 0 0 0-5-5zm0 11.7c-1.8-2.8-3-5.4-3-6.7a3 3 0 0 1 6 0c0 1.3-1.2 3.9-3 6.7zM12 0C5.37 0 0 5.37 0 12s5.37 12 12 12 12-5.37 12-12S18.63 0 12 0zm0 22c-5.52 0-10-4.48-10-10s4.48-10 10-10 10 4.48 10 10-4.48 10-10 10z"/>
      </svg>
    </div>`,
  iconSize: [40, 40],
  iconAnchor: [20, 40],
  popupAnchor: [0, -40],
});

function ListLocation() {
  const locations = useLoaderData();

  return (
    <Box p={6}>
      <Heading as="h1" mb={4}>
        Liste des Emplacements
      </Heading>
      <MapContainer
        center={[50.595729, 3.4809]}
        zoom={12}
        style={{ height: "500px", width: "100%" }}
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
            icon={CustomIcon}
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
    </Box>
  );
}

export default ListLocation;
