const Chat = require("../models/chat")


// para añadir preguntas y respuestas a base de datos
exports.addChat = async(req, res) =>{
    try{
        const { question, answer} = req.body
        const newChat    = new Chat({question, answer})
        await newChat.save()
        res.status(201).json(newChat)

}catch(error){
    res.status(500).json({ message: "error al guardar la pregunta"})

}

}

//obtener los datps guardados en el chat
exports.getChats = async(req, res) =>{

    try {

        const chats = await Chat.find()
        res.status(200).json(chats)
    }
    catch(error){
        res.status(500).json({ message: "error al obtener la pregunta"})
    
    }
}