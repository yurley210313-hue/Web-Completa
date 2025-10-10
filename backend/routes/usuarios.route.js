const express = require('express');
const router = express.Router();
const usuariosCtrl = require('../controllers/usuarios.controller');
const verificarToken = require('../middlewares/auth.middleware');

router.get('/', verificarToken, usuariosCtrl.getUsuarios);
router.get('/:id', verificarToken, usuariosCtrl.getUnicoUsuario);
router.post('/', usuariosCtrl.createUsuario);
router.put('/:id', verificarToken, usuariosCtrl.editarUsuario);
router.delete('/:id', verificarToken, usuariosCtrl.eliminarUsuario);

module.exports = router;

 