import AddArtist from "../../components/Forms/AddArtist";
import AddLocation from "../../components/Forms/AddLocation";

const handleNewArtist = (response) => response;

function NewEvent() {
  return (
    <>
      <AddArtist onArtistAdded={handleNewArtist} />;
      <AddLocation onLocationAdded={handleNewArtist} />
    </>
  );
}

export default NewEvent;
