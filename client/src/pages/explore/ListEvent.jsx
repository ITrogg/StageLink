import { useLoaderData } from "react-router-dom";

function ListEvent() {
  const data = useLoaderData();
  console.info(data);

  return <p>ListEvent</p>;
}

export default ListEvent;
