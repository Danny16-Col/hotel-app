const API_URL = "http://localhost:5000/api/auth";

//registro
export const registerUser = async (name: string, email: string, password: string) => {

  const response = await fetch(`${API_URL}/register`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    
    },
    
    body: JSON.stringify({ name, email, password }),
  });

  const data = await response.json();
  if (!response.ok) throw new Error(data.message || "Error al registrar usuario");
  
  return data;
};
// login
export const loginUser = async (email: string, password: string) =>{

    const response = await fetch(`${API_URL}/login`, {

        method: "POST",
        headers: {
            "Content-Type": "application/json" ,
        
          },
        
          body: JSON.stringify({email, password}),
    });

    const data = await response.json();
    if (!response.ok) throw new Error(data.message || "ERROR al iniciar sesion");
    if (data.token) {
    
      localStorage.setItem("token", data.token);
  }
    
  return data;
    
};
