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

// Vérification des variables d'environnement obligatoires
const required = [
  "PORT",
  "DB_HOST",
  "DB_PORT",
  "DB_USER",
  "DB_PASSWORD",
  "DB_NAME",
  "JWT_SECRET",
];

const missing = required.filter((key) => !process.env[key]);

if (missing.length > 0) {
  console.error(`Variables d'environnement manquantes : ${missing.join(", ")}`);
  console.error("Vérifiez votre fichier .env à partir de .env.example.");
  process.exit(1);
}

// Vérification des ports
const portVariables = ["PORT", "DB_PORT"];

for (const key of portVariables) {
  const port = Number(process.env[key]);

  if (!Number.isInteger(port) || port < 1 || port > 65535) {
    console.error(`La variable ${key} doit contenir un port valide.`);
    process.exit(1);
  }
}

const app = express();

app.use(
  cors({
    origin: process.env.FRONT_URL || "http://localhost:5173",
    credentials: true,
  }),
);

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
