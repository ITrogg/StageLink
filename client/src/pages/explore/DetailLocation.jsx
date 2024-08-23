import { useLoaderData } from "react-router-dom";
import DetailHeader from "../../components/Detail/DetailHeader";
import TabComponent from "../../components/Detail/Tab/TabComponent";
import LocationInfosTab from "../../components/Detail/Tab/LocationInfosTab";

function LocationDetail() {
  const [location, futureEvents, pastEvents] = useLoaderData();

  return (
    <div>
      <DetailHeader title={location.name} imageUrl={location.imageUrl} />
      <TabComponent
        infos={<LocationInfosTab location={location} />}
        pastEvents={pastEvents}
        futureEvents={futureEvents}
      />
    </div>
  );
}

export default LocationDetail;
