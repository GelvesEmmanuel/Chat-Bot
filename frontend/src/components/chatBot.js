import React, { useState, useEffect } from "react";
import axios from "axios";
import "./chatBot.css";
import ExportButton from './ExportButton';

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

  // Proceso para preguntar y que el servidor responda
  const handleChat = () => {
    if (!query.trim()) return;

    setMessages((prev) => [...prev, { role: "user", text: query }]);
    const found = chats.find(
      (chat) => chat.question.toLowerCase() === query.toLowerCase()
    );

    setMessages((prev) => [
      ...prev,
      {
        role: "bot",
        text: found ? found.answer : "no encontre respuesta adecuada",
      },
    ]);
    setQuery("");
  };

  // Capturar solicitud mediante enter
  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      handleChat();
    }
  };

  // Función de exportación (MOVIDA FUERA DEL JSX)
  const handleExport = (format) => {
    console.log(`Exportado como ${format}`);
    
    if (format === 'json') {
      const data = {
        title: "Chat Export",
        messages: messages,
        exportDate: new Date().toISOString()
      };
      
      const dataStr = JSON.stringify(data, null, 2);
      const dataUri = 'data:application/json;charset=utf-8,' + encodeURIComponent(dataStr);
      
      const link = document.createElement('a');
      link.setAttribute('href', dataUri);
      link.setAttribute('download', 'chat-export.json');
      link.click();
    }
  };

  return (
    <div className="chat-container">
      {/* Header con botón de exportación */}
      <div className="chat-header">
        <h3>Chat Bot</h3>
        <ExportButton 
          messages={messages} 
          chatTitle="Mi Chat"
          onExport={handleExport}
        />
      </div>

      {/* Mensajes del chat */}
      <div className="chat-messages">
        {messages.map((msg, idx) => (
          <div
            key={idx}
            className={`message-bubble ${
              msg.role === "user" ? "user-bubble" : "bot-bubble"
            }`}
          >
            {msg.text}
          </div>
        ))}
      </div>

      {/* Input del chat */}
      <div className="chat-input">
        <input
          type="text"
          placeholder="Escribe Tu pregunta.... "
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onKeyPress={handleKeyPress}
        />
        <button onClick={handleChat}>Enviar</button>
      </div>
    </div>
  );
};

export default ChatBot;
