import React, { useState, useEffect } from "react";
import axios from "axios";
import "./chatBot.css";

const ChatBot = () => {
  const [chats, setChats] = useState([]);
  const [query, setQuery] = useState("");
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:5000/api/chats")
      .then((res) => setChats(res.data))
      .catch((err) => console.error(err));
  }, []);
  //

  
// crear una constante para poner un color de fondo aleatorio al chat 
  const colors = ["#FFB6C1", "#87CEFA", "#90EE90", "#FFFFE0", "#FFDEAD", "#D8BFD8"];
  


  // colocar colores al fondo del mensaje
 
  //proceso para preguntar y que el servidor responda



  const handleChat = () => {
    if (!query.trim()) return;

    setMessages((prev) => [...prev, { rol: "user", text: query }]);
    const found = chats.find(
      (chat) => chat.question.toLowerCase() === query.toLowerCase()
    );
    setTimeout(() =>{
    setMessages((prev) => [
      ...prev,
      {
        role: "boot",
        text: found ? found.answer : "no encontre respuesta adecuada",
      },
    ]);
    }, 1000);
    setQuery("");
  };



  //capturar solisitud mediante enter
  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      handleChat();
    }
  };
  return (
    <div className="chat-container">
      <div className="chat-messages">
        {messages.map((msg, idx) => (
          <div
            key={idx}
            className={`message-bubble ${
              msg.role === "user" ? "user-bubble" : "bot-bubble"
            }`}

            //llamar la constante para cambiar color
        style={{ backgroundColor: colors[idx % colors.length] }}

           
          >
            {msg.text}
          </div>
        ))}
      </div>

      <div className="chat-input">
        <input
          type="text"
          placeholder="Escribe Tu pregunta.... "
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onKeyPress={handleKeyPress}
        ></input>
        <button onClick={handleChat}>Enviar</button>
      </div>
    </div>
  );
};

export default ChatBot;
