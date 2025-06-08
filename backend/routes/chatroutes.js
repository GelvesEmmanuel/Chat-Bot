const express =  require("express")
const { addChat, getChats } = require("../controllers/chatcontroller")
const { validateAddChat } = require("../middlewares/validation")
const router = express.Router()

router.post("/add", validateAddChat, addChat)
router.get("/", getChats)

module.exports = router