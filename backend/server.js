const express = require("express")
const dotenv = require("dotenv")
const cors = require("cors")
const connectDB = require("./config/db")
const chatRoutes = require("./routes/chatroutes")
const corsOptions = require("./middlewares/corsConfig")
const logger = require("./utils/logger")

dotenv.config()
connectDB()

const app = express()

// Logging global
app.use((req, res, next) => {
  req.logger = logger;
  next();
});

// P004: CORS restringido
app.use(cors(corsOptions))
app.use(express.json())

app.use("/api/chats", chatRoutes)

// Manejo de errores global
app.use((err, req, res, next) => {
  logger.error(err.message, { stack: err.stack });
  res.status(500).json({ error: "Error interno del servidor" });
});

const PORT = process.env.PORT || 5000
app.listen(PORT, () => logger.info(`servidor en puerto ${PORT}`))