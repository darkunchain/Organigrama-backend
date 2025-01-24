const express = require('express');
const fs = require('fs');
const bcrypt = require('bcrypt');
const app = express();

const PORT = 3000;

// Middleware para procesar JSON
app.use(express.json());

// Importar rutas
const authRoutes = require('./routes/auth.routes');
const funcionariosRoutes = require('./routes/funcionarios.routes');


// Usar las rutas bajo un prefijo (por ejemplo, "/auth")
app.use('/auth', authRoutes);
app.use('/funcionarios', funcionariosRoutes);


// Iniciar el servidor
app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
