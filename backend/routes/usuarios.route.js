const express = require('express');
const router = express.Router();
const usuariosCtrl = require('../controllers/usuarios.controller');


router.get('/', usuariosCtrl.getUsuarios);
router.get('/:id',  usuariosCtrl.getUnicoUsuario);
router.post('/', usuariosCtrl.createUsuario);
router.put('/:id',  usuariosCtrl.editarUsuario);
router.delete('/:id',  usuariosCtrl.eliminarUsuario);

module.exports = router;

 