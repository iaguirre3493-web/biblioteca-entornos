const db = require("../database/db");

const getLibros = (req, res) => {
  const sql = `
    SELECT libros.*, autores.nombre AS autor_nombre
    FROM libros
    JOIN autores ON libros.autor_id = autores.id
  `;

  db.all(sql, [], (err, rows) => {
    if (err) {
      return res.status(500).json({ error: "Error al obtener los libros" });
    }
    res.json(rows);
  });
};

const getLibroById = (req, res) => {
  const { id } = req.params;

  const sql = `
    SELECT libros.*, autores.nombre AS autor_nombre
    FROM libros
    JOIN autores ON libros.autor_id = autores.id
    WHERE libros.id = ?
  `;

  db.get(sql, [id], (err, row) => {
    if (err) {
      return res.status(500).json({ error: "Error al obtener el libro" });
    }

    if (!row) {
      return res.status(404).json({ error: "Libro no encontrado" });
    }

    res.json(row);
  });
};

const createLibro = (req, res) => {
  const { titulo, genero, anio, autor_id } = req.body;

  const sqlAutor = "SELECT * FROM autores WHERE id = ?";

  db.get(sqlAutor, [autor_id], (err, autor) => {
    if (err) {
      return res.status(500).json({ error: "Error al comprobar el autor" });
    }

    if (!autor) {
      return res.status(400).json({ error: "El autor seleccionado no existe" });
    }

    const sqlLibro = `
      INSERT INTO libros (titulo, genero, anio, autor_id)
      VALUES (?, ?, ?, ?)
    `;

    db.run(sqlLibro, [titulo, genero, anio, autor_id], function (err) {
      if (err) {
        return res.status(500).json({ error: "Error al crear el libro" });
      }

      res.status(201).json({
        message: "Libro creado correctamente",
        libro: {
          id: this.lastID,
          titulo,
          genero,
          anio,
          autor_id
        }
      });
    });
  });
};

const updateLibro = (req, res) => {
  const { id } = req.params;
  const { titulo, genero, anio, autor_id } = req.body;

  const sqlAutor = "SELECT * FROM autores WHERE id = ?";

  db.get(sqlAutor, [autor_id], (err, autor) => {
    if (err) {
      return res.status(500).json({ error: "Error al comprobar el autor" });
    }

    if (!autor) {
      return res.status(400).json({ error: "El autor seleccionado no existe" });
    }

    const sql = `
      UPDATE libros
      SET titulo = ?, genero = ?, anio = ?, autor_id = ?
      WHERE id = ?
    `;

    db.run(sql, [titulo, genero, anio, autor_id, id], function (err) {
      if (err) {
        return res.status(500).json({ error: "Error al actualizar el libro" });
      }

      if (this.changes === 0) {
        return res.status(404).json({ error: "Libro no encontrado" });
      }

      res.json({
        message: "Libro actualizado correctamente",
        libro: {
          id,
          titulo,
          genero,
          anio,
          autor_id
        }
      });
    });
  });
};

const deleteLibro = (req, res) => {
  const { id } = req.params;
  const sql = "DELETE FROM libros WHERE id = ?";

  db.run(sql, [id], function (err) {
    if (err) {
      return res.status(500).json({ error: "Error al eliminar el libro" });
    }

    if (this.changes === 0) {
      return res.status(404).json({ error: "Libro no encontrado" });
    }

    res.json({ message: "Libro eliminado correctamente" });
  });
};

module.exports = {
  getLibros,
  getLibroById,
  createLibro,
  updateLibro,
  deleteLibro
};