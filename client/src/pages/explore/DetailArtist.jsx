import { useLoaderData } from "react-router-dom";

function DetailArtist() {
  const data = useLoaderData();
  console.info(data);
  return <p>DetailArtist</p>;
}

export default DetailArtist;
