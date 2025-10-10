const express = require('express');
const router = express.Router();
const productosCtrl = require('../controllers/productos.controller');
const verificarToken = require('../middlewares/auth.middleware');

router.get('/', productosCtrl.getProductos);
router.post('/', verificarToken, productosCtrl.crearProducto);
router.get('/:id', productosCtrl.getUnicoProducto);
router.put('/:id', verificarToken, productosCtrl.editarProducto);
router.delete('/:id', verificarToken, productosCtrl.eliminarProducto);

module.exports = router;
