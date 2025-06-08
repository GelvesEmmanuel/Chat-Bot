/**
 * Middleware de configuración CORS restringido a dominios autorizados.
 * @module middlewares/corsConfig
 */
const allowedOrigins = [
  'http://localhost:3000',
  // Agrega aquí otros dominios permitidos
];

const corsOptions = {
  origin: function (origin, callback) {
    if (!origin) return callback(null, true);
    if (allowedOrigins.indexOf(origin) !== -1) {
      callback(null, true);
    } else {
      callback(new Error('No autorizado por CORS'));
    }
  }
};

module.exports = corsOptions;