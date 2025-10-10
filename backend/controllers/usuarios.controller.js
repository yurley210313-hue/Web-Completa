/**
 * Controlador de usuarios
 * Se requiere primero el modelo Usuario
 */

const Usuario = require('../models/usuario.model');

const usuariosCtrl = {};

/**
 * DEFINO LOS MÉTODOS
 */

// Obtener todos los usuarios
usuariosCtrl.getUsuarios = async (req, res) => {
  try {
    const usuarios = await Usuario.find();
    res.json(usuarios);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Crear usuario
usuariosCtrl.createUsuario = async (req, res) => {
  try {
    console.log("Tipo de contenido:", req.headers['content-type']);
    console.log("📦 Datos recibidos:", req.body); 
    const nuevoUsuario = new Usuario(req.body);
    await nuevoUsuario.save();
    res.json({ status: 'Usuario guardado' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};


// Conseguir un único usuario
usuariosCtrl.getUnicoUsuario = async (req, res) => {
  try {
    const usuarioUnico = await Usuario.findById(req.params.id);
    res.json(usuarioUnico);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Actualizar usuario
usuariosCtrl.editarUsuario = async (req, res) => {
  try {
    const { id } = req.params;
    const usuarioEdit = {
      nombre: req.body.nombre,
      email: req.body.email,
      password: req.body.password,
      telefono: req.body.telefono,
      rol: req.body.rol
    };

    await Usuario.findByIdAndUpdate(id, { $set: usuarioEdit }, { new: true });
    res.json({ status: 'Usuario actualizado' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Eliminar usuario
usuariosCtrl.eliminarUsuario = async (req, res) => {
  try {
    await Usuario.findByIdAndDelete(req.params.id);
    res.json({ status: 'Usuario eliminado' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Exporto el módulo
module.exports = usuariosCtrl;
