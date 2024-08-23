import { useLoaderData } from "react-router-dom";
import { Box } from "@chakra-ui/react";
import DetailHeader from "../../components/Detail/DetailHeader";
import TabComponent from "../../components/Detail/Tab/TabComponent";
import ArtistInfosTab from "../../components/Detail/Tab/ArtistInfosTab";

function ArtistDetail() {
  const [artist, genreTags, pastEvents, futureEvents] = useLoaderData();

  return (
    <Box>
      <DetailHeader title={artist.name} imageUrl={artist.logo} />
      <TabComponent
        infos={<ArtistInfosTab artist={artist} genreTags={genreTags} />}
        pastEvents={pastEvents}
        futureEvents={futureEvents}
      />
    </Box>
  );
}

export default ArtistDetail;
