const mongoose = require('mongoose');

mongoose.connect(
  "mongodb+srv://yurley210313:Camil000@cluster0.0ycxlop.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0"
 
)
.then(() => console.log(' Conectado a MongoDB Atlas'))
.catch(err => console.error('Error al conectar a MongoDB Atlas:', err));
