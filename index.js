const express = require("express");
const app = express();

const PORT = process.env.PORT || 3000;

// Estado simple en memoria
const salas = {};

app.get("/", (req, res) => {
  res.send("Servidor WereSan activo 🐺🔥");
});

// Crear sala
app.get("/crear-sala", (req, res) => {
  const codigo = Math.random()
    .toString(36)
    .substring(2, 7)
    .toUpperCase();

  salas[codigo] = {
    jugadores: [],
    creada: Date.now()
  };

  res.json({
    ok: true,
    sala: codigo
  });
});

app.listen(PORT, () => {
  console.log("Servidor corriendo en puerto " + PORT);
});
