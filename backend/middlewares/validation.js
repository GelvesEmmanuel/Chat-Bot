/**
 * Middleware de validación para endpoints de chat usando express-validator.
 * @module middlewares/validation
 */
const { body, validationResult } = require('express-validator');

/**
 * Validaciones para agregar un chat.
 */
const validateAddChat = [
  body('question')
    .isString().withMessage('La pregunta debe ser texto')
    .isLength({ min: 3, max: 200 }).withMessage('La pregunta debe tener entre 3 y 200 caracteres'),
  body('answer')
    .isString().withMessage('La respuesta debe ser texto')
    .isLength({ min: 1, max: 500 }).withMessage('La respuesta debe tener entre 1 y 500 caracteres'),
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      req.logger && req.logger.warn('Validación fallida', { errors: errors.array() });
      return res.status(400).json({ errors: errors.array() });
    }
    next();
  }
];

module.exports = { validateAddChat };