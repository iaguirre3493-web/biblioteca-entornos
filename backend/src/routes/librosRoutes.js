const express = require("express");
const router = express.Router();
const {
  getLibros,
  getLibroById,
  createLibro,
  updateLibro,
  deleteLibro
} = require("../controllers/librosController");

const {
  validarLibro,
  manejarErroresValidacion
} = require("../middlewares/validaciones");

router.get("/", getLibros);
router.get("/:id", getLibroById);
router.post("/", validarLibro, manejarErroresValidacion, createLibro);
router.put("/:id", validarLibro, manejarErroresValidacion, updateLibro);
router.delete("/:id", deleteLibro);

module.exports = router;