import React from "react";
import { useNavigate} from "react-router-dom"
import ChatBot from "../components/chatBot";

const Chat = () =>{

    const navigate  = useNavigate()

    return(
<div>
    <h1>
        ChatBot
    </h1>
    <button onClick={() => navigate("/")}>volver al inicio</button>
    <ChatBot />
</div>

    )
}
export default Chat