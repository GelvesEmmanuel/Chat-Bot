import React from "react";
import { useNavigate} from "react-router-dom"
import ChatBot from "../components/chatBot";
import { BtnPrimary } from "../components/atoms/buttons/Buttons";

const Chat = () =>{

    const navigate  = useNavigate()

    return (
      <div>
        <h1>ChatBot</h1>
        <BtnPrimary onClick={() => navigate("/")}>volver al inicio</BtnPrimary>
        <ChatBot />
      </div>
    );
}
export default Chat