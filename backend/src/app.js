const express = require("express");
const cors = require("cors");
const db = require("./database/db");
const autoresRoutes = require("./routes/autoresRoutes");

const app = express();
const PORT = 3000;

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.send("API de biblioteca funcionando");
});

app.use("/autores", autoresRoutes);

app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});