const { isAuth } = require("../../middlewares/auth")
const { uploadBooks } = require("../../middlewares/file")
const { getLibros, getLibrosById, postLibro, updateLibro, deleteLibro } = require("../controllers/libros")

const librosRouter = require("express").Router()

librosRouter.get("/", getLibros)
librosRouter.get("/:id", getLibrosById)
librosRouter.post("/", uploadBooks.single("caratula"), [isAuth], postLibro)
librosRouter.put("/:id", uploadBooks.single("caratula"), [isAuth], updateLibro)
librosRouter.delete("/:id", [isAuth], deleteLibro)

module.exports = librosRouter