// src/app.js
const express = require("express");
const app = express();
const routes = require("./routes"); // Carga automáticamente src/routes/index.js

app.use(express.json());

// Montar las rutas en /api
app.use("/api", routes);

module.exports = app;