const express = require("express");
const router = express.Router();
const {
  getAutores,
  getAutorById,
  createAutor,
  updateAutor,
  deleteAutor
} = require("../controllers/autoresController");

const {
  validarAutor,
  manejarErroresValidacion
} = require("../middlewares/validaciones");

router.get("/", getAutores);
router.get("/:id", getAutorById);
router.post("/", validarAutor, manejarErroresValidacion, createAutor);
router.put("/:id", validarAutor, manejarErroresValidacion, updateAutor);
router.delete("/:id", deleteAutor);

module.exports = router;