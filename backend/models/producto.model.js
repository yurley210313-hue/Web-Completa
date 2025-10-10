const mongoose = require("mongoose");

const productoSchema = new mongoose.Schema({
  nombre: { type: String },
  precio: { type: Number },
  stock: { type: Number},
  disponible: { type: String },
}, { timestamps: true });

module.exports = mongoose.model("producto", productoSchema);
