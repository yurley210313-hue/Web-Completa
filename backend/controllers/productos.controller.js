/**
 * Controlador de productos
 * Se requiere primero el modelo Producto
 */

const Producto = require('../models/producto.model');

const productosCtrl = {};

/**
 * DEFINO LOS MÉTODOS
 */

// Obtener todos los productos
productosCtrl.getProductos = async (req, res) => {
  try {
    const productos = await Producto.find();
    res.json(productos);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Crear producto
productosCtrl.crearProducto = async (req, res) => {
  try {
    const nuevoProducto = new Producto(req.body);
    await nuevoProducto.save();
    res.json({ status: 'Producto guardado' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Conseguir un único producto
productosCtrl.getUnicoProducto = async (req, res) => {
  try {
    const productoUnico = await Producto.findById(req.params.id);
    res.json(productoUnico);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Actualizar producto
productosCtrl.editarProducto = async (req, res) => {
  try {
    const { id } = req.params;
    const productoEdit = {
      nombre: req.body.nombre,
      precio: req.body.precio,
      stock: req.body.stock,
      disponible: req.body.disponible
    };

    await Producto.findByIdAndUpdate(id, { $set: productoEdit }, { new: true });
    res.json({ status: 'Producto actualizado' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Eliminar producto
productosCtrl.eliminarProducto = async (req, res) => {
  try {
    await Producto.findByIdAndDelete(req.params.id);
    res.json({ status: 'Producto eliminado' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Exportar el controlador
module.exports = productosCtrl;
