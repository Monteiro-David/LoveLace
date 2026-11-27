import app from "./index.js";
import "dotenv/config";

const required = [
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

const portVariables = ["DB_PORT"];

for (const key of portVariables) {
  const port = Number(process.env[key]);

  if (!Number.isInteger(port) || port < 1 || port > 65535) {
    console.error(`La variable ${key} doit contenir un port valide.`);
    process.exit(1);
  }
}

if (!process.env.JWT_SECRET) {
  console.error(
    "JWT_SECRET manquant : copie .env.exemple en .env et definissez JWT_SECRET",
  );
  process.exit(1);
}

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Serveur lance sur http://local:${PORT}`);
});
