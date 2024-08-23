import { useLoaderData } from "react-router-dom";

function ListLocation() {
  const data = useLoaderData();
  console.info(data);

  return <p>ListLocation</p>;
}

export default ListLocation;
