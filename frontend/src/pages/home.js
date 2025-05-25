import React from "react";
import { useNavigate} from "react-router-dom"
import '../styles/home.css'
import {
  BtnPrimary,
} from "../components/atoms/buttons/Buttons";

const Home = () => {

    const navigate = useNavigate()

    return (
      <div className="container">
        <div className="container-chat">
          <h1>Mantenimiento de Software - Ibero</h1>
          <div className="description">
            <ul>
              <li>Emmanuel Gelves Torres 1064836250</li>
              <li>Andres Felipe Escorcia Varela 1045716719</li>
              <li>July Marcela</li>
            </ul>
          </div>
          <br />
          <div className="logo-wrapper">
            <img
              src="https://media.istockphoto.com/id/1445426863/es/vector/concepto-de-dise%C3%B1o-de-logotipo-vectorial-de-chat-bot.jpg?s=612x612&w=0&k=20&c=0AWOu_qR10sqGlNyBsaMJUlQ9iQdEPPCsP5uBUjoe6E="
              alt="logo"
              className="logo"
            />
            <div className="logo-blur"></div>
          </div>
          <br />
          <div className="button-group">
            <BtnPrimary onClick={() => navigate("/add")}>
              Agregar preguntas
            </BtnPrimary>
            <BtnPrimary onClick={() => navigate("/chat")}>Usar chat </BtnPrimary>
          </div>
        </div>
        <footer className="footer">
          <p>
            &copy; {new Date().getFullYear()} Mantenimiento de Software - Ibero. Todos los derechos reservados.
          </p>
          <p>
            <strong>¡Innovando el futuro, una pregunta a la vez!</strong>
          </p>
        </footer>
      </div>
    );
}
export default Home