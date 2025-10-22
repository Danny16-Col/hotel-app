//Api
const API_URL = "http://localhost:5000/api/reserve";

// Función para reservar hotel
export const reserveHotel = async (id: string) => {
  const token = localStorage.getItem("token");
  if (!token) throw new Error("No hay token, por favor inicia sesión");

  const response = await fetch(`${API_URL}/${id}/reserve`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    
    },

  });

  const data = await response.json();
  if (!response.ok) throw new Error(data.message || "Error al reservar hotel");
  return data;

};
// Función para cancelar reserva
export const cancelReservation = async (id: string) => {
  const token = localStorage.getItem("token");
  if (!token) throw new Error("No hay token, por favor inicia sesión");

  const response = await fetch(`${API_URL}/${id}/cancel`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },

  });

  const data = await response.json();
  if (!response.ok) throw new Error(data.message || "Error al cancelar reserva");
  return data;
  
};
