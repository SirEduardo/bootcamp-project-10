

const mongoose = require("mongoose")

const libroSchema = mongoose.Schema(
    {
        titulo: { type: String, required: true },
        precio: { type: Number, required: true },
        caratula: { type: String, required: true },
        valoracion: { type: Number, required: true },
        autor: { type: String, required: false },
    },
    {
      timestamps: true,
      Collection: "libros"
    }
)

const Libro = mongoose.model("libros", libroSchema, "libros")
module.exports = Libro