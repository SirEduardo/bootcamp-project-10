const { deleteFiles } = require("../../utils/deleteFiles");
const Libro = require("../models/libros");

const getLibros = async (req, res, next) => {
  try {
    const libros = await Libro.find();
    return res.status(200).json(libros);
  } catch (error) {
    return res.status(400).json("Error");
  }
};

const getLibrosById = async (req, res, next) => {
  try {
    const { id } = req.params;
    const libro = await Libro.findById(id);
    return res.status(200).json(libro);
  } catch (error) {
    return res.status(400).json("Error");
  }
};

const postLibro = async (req, res, next) => {
  try {
    const newLibro = new Libro(req.body);

    if (req.file){
      newLibro.caratula = req.file.path
    }
    const libro = await newLibro.save();
    return res.status(201).json(libro);
  } catch (error) {
    return res.status(400).json("Error añadiendo libro");
  }
};

const updateLibro = async (req, res, next) => {
  try {
    const { id } = req.params;
    const oldLibro = await Libro.findById(id)
    const newLibro = new Libro(req.body);

    if (req.file){
      newLibro.caratula = req.file.path
      if (oldLibro){
        deleteFiles(oldLibro.caratula)
      }
    }

    newLibro._id = id;
    const libroUpdated = await Libro.findByIdAndUpdate(id, newLibro, {
      new: true,
    });
    return res.status(200).json(libroUpdated);
  } catch (error) {
    return res.status(400).json("Error al actualizar el libro");
  }
};

const deleteLibro = async (req, res, next) => {
  try {
    const { id } = req.params;
    const libro = await Libro.findByIdAndDelete(id);
    deleteFiles(libro.caratula)
    return res.status(200).json(libro);
  } catch (error) {
    return res.status(400).json("Error al eliminar el libro");
  }
};

module.exports = {
  getLibros,
  getLibrosById,
  postLibro,
  updateLibro,
  deleteLibro,
};
