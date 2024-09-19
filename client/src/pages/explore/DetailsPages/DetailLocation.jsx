import { useLoaderData } from "react-router-dom";
import { Box } from "@chakra-ui/react";

import DetailHeader from "../../../components/Detail/DetailHeader";
import TabComponent from "../../../components/Detail/Tab/TabComponent";
import LocationInfosTab from "../../../components/Detail/Tab/LocationInfosTab";

function LocationDetail() {
  const [location, futureEvents, pastEvents] = useLoaderData();

  return (
    <Box>
      <DetailHeader title={location.name} imageUrl={location.imageUrl} />
      <TabComponent
        infos={<LocationInfosTab location={location} />}
        pastEvents={pastEvents}
        futureEvents={futureEvents}
      />
    </Box>
  );
}

export default LocationDetail;
