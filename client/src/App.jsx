import { Outlet } from "react-router-dom";
import NavbarExplore from "./components/Navigation/NavbarExplore";

function App() {
  return (
    <>
      <NavbarExplore />
      <main>
        <Outlet />
      </main>
    </>
  );
}

export default App;
