// src/server.js
const connectMongo = require("./db/mongo"); // Importación correcta sin llaves
require("dotenv").config();
const app = require("./app");

const PORT = process.env.PORT || 3000;

connectMongo()
  .then(() => {
    app.listen(PORT, () => {
      console.log(`Server corriendo en puerto ${PORT}`);
    });
  })
  .catch((err) => {
    console.error("Error de conexión:", err.message);
    process.exit(1);
  });