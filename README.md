# Biblioteca Entornos

Aplicación web desarrollada para la asignatura de Entornos de Desarrollo.

El proyecto consiste en una aplicación de gestión de **autores** y **libros**, con un **backend API REST** desarrollado con Node.js y Express, una base de datos **SQLite** y un **frontend** realizado con HTML, CSS y JavaScript.

## Funcionalidades

La aplicación permite realizar un **CRUD completo** sobre dos entidades:

- **Autores**
    - Crear autor
    - Listar autores
    - Editar autor
    - Eliminar autor

- **Libros**
    - Crear libro
    - Listar libros
    - Editar libro
    - Eliminar libro

## Relación entre entidades

Los libros están relacionados con los autores mediante el campo `autor_id`.

- Un autor puede tener varios libros
- Cada libro pertenece a un autor

## Tecnologías utilizadas

### Backend
- Node.js
- Express
- SQLite3
- express-validator
- CORS

### Frontend
- HTML
- CSS
- JavaScript

### Control de versiones
- Git
- GitHub

## Estructura del proyecto

```text
Biblioteca/
├── backend/
│   ├── src/
│   │   ├── controllers/
│   │   ├── database/
│   │   ├── middlewares/
│   │   ├── routes/
│   │   └── app.js
│   ├── package.json
│   └── package-lock.json
│
├── frontend/
│   ├── css/
│   │   └── style.css
│   ├── js/
│   │   ├── autores.js
│   │   └── libros.js
│   ├── autores.html
│   ├── index.html
│   └── libros.html
│
├── postman/
│   └── Biblioteca-entornos.postman_collection.json
│
└── README.md