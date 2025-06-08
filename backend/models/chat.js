/**
 * Modelo de chat para MongoDB.
 * @module models/chat
 */
const mongoose = require('mongoose');

const chatSchema =  new mongoose.Schema({
    question: { type: String, required: true, index: true }, // P011: index para búsquedas frecuentes
    answer: { type: String, required: true },
});

module.exports = mongoose.model("Chat", chatSchema);