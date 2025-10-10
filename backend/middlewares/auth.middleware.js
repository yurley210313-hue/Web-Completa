const jwt = require('jsonwebtoken');


const verificarToken = (req, res, next) => {
  try {
    const header = req.headers['authorization'];

    if (!header) {
      return res.status(401).json({ error: 'No se proporcionó token' });
    }

    const token = header.split(' ')[1];
    if (!token) {
      return res.status(401).json({ error: 'Formato de token inválido' });
    }

    // Verificamos el token usando la misma clave que en el login
    const decoded = jwt.verify(token, process.env.JWT_SECRET || 'mi_clave_secreta');
    req.user = decoded; // lo guardamos para usarlo en las rutas

    next();
  } catch (error) {
    console.error(" Error verificando token:", error.message, error.name, error.message);
    return res.status(401).json({ error: 'Token inválido o expirado' });
  }
};

module.exports = verificarToken;

