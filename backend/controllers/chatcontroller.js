const Chat = require("../models/chat")
const { ERRORS } = require("../utils/constants")

/**
 * Añade una pregunta y respuesta a la base de datos.
 * @param {*} req 
 * @param {*} res 
 */
exports.addChat = async(req, res) =>{
    try{
        const { question, answer} = req.body
        const newChat = new Chat({question, answer})
        await newChat.save()
        req.logger.info('Pregunta agregada', { question })
        res.status(201).json(newChat)
    }catch(error){
        req.logger.error(ERRORS.DB, { error })
        res.status(500).json({ message: ERRORS.DB })
    }
}

/**
 * Obtiene todas las preguntas y respuestas del chat.
 * @param {*} req 
 * @param {*} res 
 */
exports.getChats = async(req, res) =>{
    try {
        const chats = await Chat.find()
        res.status(200).json(chats)
    }
    catch(error){
        req.logger.error(ERRORS.DB, { error })
        res.status(500).json({ message: ERRORS.DB })
    }
}