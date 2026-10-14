import "dotenv/config";
import express from "express";
import testRoutes from "./Routes/testRoutes.js";

const app = express();

app.use(express.json());

app.use("/api/test", testRoutes);

app.get("/", (req, res) => {
  res.send("Bienvenue sur l'API de LoveLace !");
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server lancé sur http://localhost:${PORT}`);
});