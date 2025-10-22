import { useState } from "react";
import { registerUser } from "../apis/userApi";
import "./register.css";

function Register() {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const handleSubmit = async (e: React.FormEvent) => { 
    e.preventDefault();

    try {
            await registerUser(name, email, password);
            console.log("Registro exitoso:");
            alert("Usuario registrado correctamente");
            setName("");
            setEmail("");
            setPassword("");
        
          } catch (err) {
            console.error("Error al registrar:", err);
            alert("Error al registrar usuario");
        
          }
  };

  return (
    <>
      <div className="registro">
        <div className="registro-card">
            <h2>Crear Cuenta</h2>
            <form onSubmit={handleSubmit}>
            <label>Nombre:</label><br />
                <input
                type="text"
                placeholder="Tu nombre"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required/><br />
                <label>Email:</label> <br />
                <input
                type="email"
                placeholder="correo@gmail.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required/> <br />
            <label>Contraseña:</label> <br />
            <input
                type="password"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required/> <br />
            <button type="submit">Registrarse</button>
          </form>
        </div>
      </div>
    </>
  );
}

export default Register;
