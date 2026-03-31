const sqlite3 = require("sqlite3").verbose();
const path = require("path");

const dbPath = path.join(__dirname, "biblioteca.db");

const db = new sqlite3.Database(dbPath, (err) => {
  if (err) {
    console.error("Error al conectar con SQLite:", err.message);
  } else {
    console.log("Conectado a la base de datos SQLite");
  }
});

db.serialize(() => {
  db.run(`
    CREATE TABLE IF NOT EXISTS autores (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      nombre TEXT NOT NULL,
      nacionalidad TEXT NOT NULL
    )
  `);
});

module.exports = db;