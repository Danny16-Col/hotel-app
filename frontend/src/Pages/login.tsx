import { useState } from "react";
import { loginUser } from "../apis/userApi";
import "./login.css";

function Login() {
  
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      const data = await loginUser(email, password);
      
      localStorage.setItem("token", data.token);
      console.log("Inicio de sesión exitoso:");
      alert("Inicio de sesión correcto");
      setEmail("");
      setPassword("");

    } catch (err) {
      console.error("❌ Error al iniciar sesión:", err);
      alert("Error al iniciar sesión");
    
    }
  
  };

  return (
    <>
      <div className="registro">
        <div className="registro-card">
          <h2>Iniciar Sesión</h2>
          <form onSubmit={handleSubmit}>
            <label>Email:</label><br />
            <input
              type="email"
              placeholder="correo@gmail.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required/> <br />
            <label>Contraseña:</label><br />
            <input
              type="password"
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required/> <br />
            <button type="submit">Iniciar Sesión</button>
          </form>
        </div>
      </div>
    </>
  );
  
}

export default Login;
