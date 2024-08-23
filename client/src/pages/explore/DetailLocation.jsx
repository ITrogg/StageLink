import { useLoaderData } from "react-router-dom";

function DetailLocation() {
  const data = useLoaderData();
  console.info(data);

  return <p>DetailLocation</p>;
}

export default DetailLocation;
