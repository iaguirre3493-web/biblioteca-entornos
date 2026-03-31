const { body, validationResult } = require("express-validator");

const validarAutor = [
  body("nombre")
    .trim()
    .notEmpty()
    .withMessage("El nombre es obligatorio"),
  body("nacionalidad")
    .trim()
    .notEmpty()
    .withMessage("La nacionalidad es obligatoria")
];

const validarLibro = [
  body("titulo")
    .trim()
    .notEmpty()
    .withMessage("El título es obligatorio"),
  body("genero")
    .trim()
    .notEmpty()
    .withMessage("El género es obligatorio"),
  body("anio")
    .isInt({ min: 0 })
    .withMessage("El año debe ser un número entero válido"),
  body("autor_id")
    .isInt({ min: 1 })
    .withMessage("El autor es obligatorio y debe ser válido")
];

const manejarErroresValidacion = (req, res, next) => {
  const errores = validationResult(req);

  if (!errores.isEmpty()) {
    return res.status(400).json({
      errores: errores.array()
    });
  }

  next();
};

module.exports = {
  validarAutor,
  validarLibro,
  manejarErroresValidacion
};