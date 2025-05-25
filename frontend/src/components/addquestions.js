// en esta pagina cargaraemos la respuesta y la pregunta mediante un formulario las cuales se guardaran en la base de datos

import React, { useState} from "react";
import axios from "axios"
import '../styles/home.css'

import { useNavigate } from "react-router-dom"
const AddQuestion = () =>{
    const [question, setQuestion] =useState("")
    const [answer, setAnswer] = useState("")
    const navigate = useNavigate()

    const handleSubmit = async (e) =>{

        e.preventDefault()
        try{
                await axios.post("http://localhost:5000/api/chats/add", {question, answer})
                alert("pregunta agregada con exito")
                setQuestion("")
                setAnswer("")
        }catch(error){

            console.error("error al agrega la pregunta", error)
        }

    }

    return(
        <div className="container">

<div className="container-chat">
            <h2>Agrega una pregunta al servidor</h2>
            
            <form onSubmit={handleSubmit}>
                <div>   
                    <label>Pregunta:</label>
                    <input type= "text" values={question} onChange={(e) => setQuestion(e.target.value) } required></input>

                </div>
                <div>   
                    <label>Respuesta</label>
                    <input type= "text" values={answer} onChange={(e) => setAnswer(e.target.value) } required></input>
                    
                </div>
                <button type="submit">Guardar</ button> 
                <button onClick={() => navigate("/")}>volver al inicio</button>
            </form>
        </div>
        </div>
       

    )
}
//al exportar nos aseguramos que ell codigo trabaje
export default AddQuestion;

