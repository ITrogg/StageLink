import { Outlet } from "react-router-dom";
import NavbarExplore from "./components/Navigation/NavbarExplore";
import AddPlace from "./components/Forms/AddPlace";

function App() {
  return (
    <>
      <NavbarExplore />
      <main>
        <AddPlace />
        <Outlet />
      </main>
    </>
  );
}

export default App;
