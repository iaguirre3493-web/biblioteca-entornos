const db = require("../database/db");

// Obtener todos los autores
const getAutores = (req, res) => {
  const sql = "SELECT * FROM autores";

  db.all(sql, [], (err, rows) => {
    if (err) {
      return res.status(500).json({ error: "Error al obtener los autores" });
    }
    res.json(rows);
  });
};

// Obtener un autor por id
const getAutorById = (req, res) => {
  const { id } = req.params;
  const sql = "SELECT * FROM autores WHERE id = ?";

  db.get(sql, [id], (err, row) => {
    if (err) {
      return res.status(500).json({ error: "Error al obtener el autor" });
    }

    if (!row) {
      return res.status(404).json({ error: "Autor no encontrado" });
    }

    res.json(row);
  });
};

// Crear un autor
const createAutor = (req, res) => {
  const { nombre, nacionalidad } = req.body;
  const sql = "INSERT INTO autores (nombre, nacionalidad) VALUES (?, ?)";

  db.run(sql, [nombre, nacionalidad], function (err) {
    if (err) {
      return res.status(500).json({ error: "Error al crear el autor" });
    }

    res.status(201).json({
      message: "Autor creado correctamente",
      autor: {
        id: this.lastID,
        nombre,
        nacionalidad
      }
    });
  });
};

// Actualizar un autor
const updateAutor = (req, res) => {
  const { id } = req.params;
  const { nombre, nacionalidad } = req.body;

  const sql = "UPDATE autores SET nombre = ?, nacionalidad = ? WHERE id = ?";

  db.run(sql, [nombre, nacionalidad, id], function (err) {
    if (err) {
      return res.status(500).json({ error: "Error al actualizar el autor" });
    }

    if (this.changes === 0) {
      return res.status(404).json({ error: "Autor no encontrado" });
    }

    res.json({
      message: "Autor actualizado correctamente",
      autor: {
        id,
        nombre,
        nacionalidad
      }
    });
  });
};

// Eliminar un autor
const deleteAutor = (req, res) => {
  const { id } = req.params;
  const sql = "DELETE FROM autores WHERE id = ?";

  db.run(sql, [id], function (err) {
    if (err) {
      return res.status(500).json({ error: "Error al eliminar el autor" });
    }

    if (this.changes === 0) {
      return res.status(404).json({ error: "Autor no encontrado" });
    }

    res.json({ message: "Autor eliminado correctamente" });
  });
};

module.exports = {
  getAutores,
  getAutorById,
  createAutor,
  updateAutor,
  deleteAutor
};