import AddArtist from "../../components/Forms/AddArtist";

const handleNewArtist = (response) => response;

function NewEvent() {
  return <AddArtist onArtistAdded={handleNewArtist} />;
}

export default NewEvent;
