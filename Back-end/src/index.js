import "dotenv/config";
import express from "express";
import cors from "cors";
import testRoutes from "./Routes/testRoutes.js";
import utilisateurRoutes from "./Routes/utilisateurRoutes.js";
import authRoutes from "./Routes/authRoutes.js";
import groupeRoutes from "./Routes/groupeRoutes.js";
import evenementRoutes from "./Routes/evenementRoutes.js";

const app = express();
app.use(cors());

app.use(express.json());

app.use("/api/test", testRoutes);
app.use("/api/groupe", groupeRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/utilisateurs", utilisateurRoutes);
app.use("/api/evenements", evenementRoutes);


app.get("/", (req, res) => {
  res.send("Bienvenue sur l'API de LoveLace !");
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server lancé sur http://localhost:${PORT}`);
});