import { useLoaderData } from "react-router-dom";

function DetailEvent() {
  const data = useLoaderData();
  console.info(data);

  return <p>DetailEvent</p>;
}

export default DetailEvent;
