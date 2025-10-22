import { useEffect, useState } from "react";
import { Container, Row, Col, Card, Button } from "react-bootstrap";
import { reserveHotel, cancelReservation } from "../../apis/reserveApi";
import './hotels.css'

interface Hotel {
  id: string;
  name: string;
  image: string;
  price: number;
  city: string;
  description:string;

}
interface ApiResponse {
  message: string;

}
function Hotels() {

  const [hotels, setHotels] = useState<Hotel[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/hotels.json")
      .then((res) => res.json())
      .then((data: Hotel[]) => {
        setHotels(data);
        setLoading(false);

      })
      .catch((err) => {
        console.error("Error loading hotels:", err);
        setLoading(false);

      });
  },
  []);

  const handleReserve = async (id: string) => {
    try {
      const res: ApiResponse = await reserveHotel(id);
      alert(res.message || "Hotel reservado exitosamente");

    } catch (error) {
      const err = error as Error;
      alert(err.message || "Error al reservar hotel");

    }

  };

  const handleCancel = async (id: string) => {
    try {
      const res: ApiResponse = await cancelReservation(id);
      alert(res.message || "Reserva cancelada exitosamente");
    
    } catch (error) {
      const err = error as Error;
      alert(err.message || "Error al cancelar reserva");
    }

  };

  if (loading) return <p className="text-center mt-4">Cargando hoteles...</p>;

  return (

    <Container className="mt-4">
      <Row className="g-4">
        {hotels.map((hotel) => (
          <Col key={hotel.id} xs={12} sm={6} md={4}>
            <Card className="h-100 shadow-sm">
              <Card.Img
                variant="top"
                src={hotel.image}
                style={{ height: "220px", objectFit: "cover" }}
                alt={hotel.name} />
              <Card.Body>
                <Card.Title>{hotel.name}</Card.Title>
                <Card.Text>
                  <strong>{hotel.city}</strong> <br />
                  <span className="text-primary fw-bold">
                    {hotel.price.toLocaleString()} COP / noche
                  </span>
                </Card.Text>
                <div className="d-flex gap-2">
                  <Button
                    variant="success"
                    onClick={() => handleReserve(hotel.id)}
                  > Reservar
                  </Button>
                  <Button
                    variant="danger"
                    onClick={() => handleCancel(hotel.id)}
                  > Cancelar
                  </Button>
                </div>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
    </Container>

  );
  
}

export default Hotels;
