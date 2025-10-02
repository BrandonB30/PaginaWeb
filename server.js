const express = require("express");
const path = require("path");

const app = express();
const PORT = 3000;

// Middleware para leer formularios
app.use(express.urlencoded({ extended: true }));
app.use(express.json()); // <- Por si acaso viene JSON

// Archivos estáticos
app.use(express.static(path.join(__dirname, "src/public")));

// Página de login
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "src/public", "index.html"));
});

// Procesar login
app.post("/login", (req, res) => {
  const { email, password } = req.body;
  console.log("📥 Datos recibidos:", email, password); // Debug en consola

  if (email === "admin@motostore.com" && password === "1234") {
    return res.sendFile(path.join(__dirname, "src/public", "home.html"));
  } else {
    return res.status(401).send("<h2>❌ Usuario o contraseña incorrectos</h2><a href='/'>Volver</a>");
  }
});

// Página de inicio
app.get("/home", (req, res) => {
  res.sendFile(path.join(__dirname, "src/public", "home.html"));
});

app.listen(PORT, () => {
  console.log(`🚀 Servidor corriendo en http://localhost:${PORT}`);
});
