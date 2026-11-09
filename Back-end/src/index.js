import "dotenv/config";
import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";
import testRoutes from "./Routes/testRoutes.js";
import utilisateurRoutes from "./Routes/utilisateurRoutes.js";
import authRoutes from "./Routes/authRoutes.js";
import groupeRoutes from "./Routes/groupeRoutes.js";
import evenementRoutes from "./Routes/evenementRoutes.js";
import { gestionErreurs } from "./middlewares/erreurs.js";

const app = express();
app.use(cors({
  origin: process.env.FRONT_URL || "http://localhost:5173",
  edentials: true
}));

app.use(express.json());
app.use(cookieParser());

app.use("/api/test", testRoutes);
app.use("/api/groupe", groupeRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/utilisateurs", utilisateurRoutes);
app.use("/api/evenements", evenementRoutes);


app.get("/", (req, res) => {
  res.send("Bienvenue sur l'API de LoveLace !");
});

app.use(gestionErreurs);

export default app;