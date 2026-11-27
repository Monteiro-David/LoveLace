import app from "./index.js";

const PORT = Number(process.env.PORT);

const server = app.listen(PORT, "0.0.0.0", () => {
  console.log(`Serveur lancé sur http://localhost:${PORT}`);
});

export default server;
