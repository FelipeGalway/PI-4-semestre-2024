import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import login from "../assets/img/login-sf.png"; // Adicione o caminho da imagem
import "./Login.css";

function Login({ onLogin }) {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            // const response = await axios.post("http://localhost:3000/auth/login", { email, password });
            // const { token } = response.data;
            // localStorage.setItem("token", token);
            onLogin();
            navigate("/dashboard");
        } catch (error) {
            console.error("Erro ao fazer login", error);
        }
    };

    return (
        <div className="container">
            <form onSubmit={handleSubmit} className="form">
                <img src={login} alt="login" className="login" />{" "}
                {/* Imagem adicionada */}
                <h2>Login</h2>
                <div className="inputContainer">
                    <input
                        type="email"
                        placeholder="Email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="input"
                    />
                </div>
                <div className="inputContainer">
                    <input
                        type="password"
                        placeholder="Senha"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="input"
                    />
                </div>
                <button type="submit" className="button">
                    Entrar
                </button>
                <p></p>
                <button
                    type="button"
                    onClick={() => navigate("/register")}
                    className="secondaryButton"
                >
                    Registrar
                </button>
            </form>
        </div>
    );
}

export default Login;
