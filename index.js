const express = require("express");
const http = require("http");
const { Server } = require("socket.io");

const app = express();
const server = http.createServer(app);
const io = new Server(server, {
  cors: { origin: "*" }
});

const PORT = process.env.PORT || 3000;
const salas = {};

app.get("/", (req, res) => {
  res.send("Servidor WereSan activo 🐺🔥");
});

app.get("/crear-sala", (req, res) => {
  const codigo = Math.random().toString(36).substring(2, 7).toUpperCase();

  salas[codigo] = {
    jugadores: []
  };

  res.json({ ok: true, sala: codigo });
});

io.on("connection", socket => {
  console.log("Jugador conectado:", socket.id);

  socket.on("unirse", ({ codigo, nombre }) => {
    const sala = salas[codigo];
    if (!sala) return;

    sala.jugadores.push({ id: socket.id, nombre });
    socket.join(codigo);

    io.to(codigo).emit("estado", {
      jugadores: sala.jugadores.map(j => j.nombre)
    });
  });
});

server.listen(PORT, () => {
  console.log("Servidor WereSan en tiempo real 🔥");
});
