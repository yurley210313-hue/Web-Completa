require('dotenv').config();
const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const app = express(); // la constante app tendrá ahora todo el funcionamiento del servidor
require('./database'); // no se quiere todo el archivo sino la conexión
/** * Se crea una REST API, es la manera de decirle al servidor que reciba y envíe datos  */
// Configuraciones
app.use(morgan('dev'));
app.use(cors({ origin: 'http://localhost:3001' }));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
// rutas de nuestro servidor
app.use("/api/auth", require("./routes/auth.route"));
app.use("/api/usuarios", require("./routes/usuarios.route"));
app.use("/api/productos", require("./routes/productos.route"));
// Iniciando el servidor

app.set('port', process.env.PORT || 3000);
app.listen(app.get('port'), () => {
  console.log('Servidor activo en el puerto', app.get('port'));
}); 
