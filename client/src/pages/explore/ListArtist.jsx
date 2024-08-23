import { useLoaderData } from "react-router-dom";

function ListArtist() {
  const data = useLoaderData();
  console.info(data);

  return <p>List des artist</p>;
}

export default ListArtist;
