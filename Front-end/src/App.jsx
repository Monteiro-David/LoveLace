import { Routes, Route } from "react-router-dom";
import Connexion  from "./pages/connexion/connexion.jsx";
import Inscription  from "./pages/inscription/inscription.jsx";
import { RouteProteger } from "./components/RouteProteger.jsx";
import {TableauDeBord} from "./pages/tableau_de_bord/TableauDeBord.jsx";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Connexion />} />
      <Route path="/inscription" element={<Inscription />} />
      <Route 
      path="/tableau-de-bord" 
      element={
      <RouteProteger>
        <TableauDeBord />
        </RouteProteger>
      } 
      />
    </Routes>
  );
}

export default App;
