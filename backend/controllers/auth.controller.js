const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const Usuario = require('../models/usuario.model');

const authCtrl = {};

authCtrl.register = async (req, res) => {
  try {
    console.log("📥 Body recibido en register:", req.body); 

    const { nombre, email, password, rol } = req.body;

    if (!nombre || !email || !password) {
      return res.status(400).json({ error: 'Faltan datos requeridos' });
    }

    const existe = await Usuario.findOne({ email });
    if (existe) return res.status(400).json({ error: 'El usuario ya existe' });

    // Crear nuevo usuario
    const nuevoUsuario = new Usuario({ nombre, email, password, rol });
    await nuevoUsuario.save();

    res.json({ msg: 'Usuario registrado con éxito' });
  } catch (error) {
    console.error(" Error en register:", error);
    res.status(500).json({ error: error.message });
  }
};

authCtrl.login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const usuario = await Usuario.findOne({ email });

    if (!usuario) return res.status(400).json({ error: 'Usuario no encontrado' });

    const passwordCorrecta = await bcrypt.compare(password, usuario.password);
    if (!passwordCorrecta) return res.status(400).json({ error: 'Contraseña incorrecta' });

    const token = jwt.sign(
      { id: usuario._id, email: usuario.email, rol: usuario.rol },
      process.env.JWT_SECRET || 'mi_clave_secreta',
      { expiresIn: '1h' }
    );

    res.json({ msg: 'Login exitoso', token });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = authCtrl;

