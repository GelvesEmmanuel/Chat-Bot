import React from "react";
import { useNavigate} from "react-router-dom"
import '../styles/home.css'

const Home = () => {

    const navigate = useNavigate()

    return(
        <div className="container">
            <div className="container-chat"> 
                
            <h1>ChatBot en MERN</h1>
            <p>Emmanuel Gelves Torres 1064836250</p>
                <button onClick={() => navigate("/add")}> Agregar preguntas </button>
                <button onClick={() => navigate("/chat")}>Usar chat</button>
            </div>
                

        </div>
    )
}
export default Home