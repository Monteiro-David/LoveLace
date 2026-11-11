import { BrowserRouter, Routes, Route } from "react-router-dom";

import Connexion from "./pages/connexion.jsx";
import Inscription from "./pages/inscription/inscription.jsx";
function App() {
  return (
    <Routes>
      <Route path="/" element={<Connexion />} />
      <Route path="/connexion" element={<Connexion />} />
      <Route path="/inscription" element={<Inscription />} />
    </Routes>
  );
}

export default App;
