import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function Rooms() {
    const navigate = useNavigate(); // ✅ ADD
  
  const [floors, setFloors] = useState([]);

  useEffect(() => {
    fetchRooms();
  }, []);

  
  
  const fetchRooms = async () => {
    try {
      const res = await axios.get("http://localhost:9988/rooms/floors");
      setFloors(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div style={{ padding: "20px" }}>
      <h2>Rooms</h2>

      {floors.map((floor) => (
        <div key={floor.floorNumber} style={{ marginBottom: "40px" }}>
          <h3>Floor {floor.floorNumber}</h3>

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(3, 1fr)", // ✅ 3 columns
              gap: "20px",
              marginTop: "15px",
            }}
          >
            {floor.rooms.map((room, index) => (
              <div
            key={index}
            onClick={() => navigate(`/owner/room/${room.roomId}`)}
            style={{
                borderRadius: "12px",
                overflow: "hidden",
                cursor: "pointer",
                boxShadow: "0 4px 10px rgba(0,0,0,0.15)",
            }}
            >
            {/* 🔵 Header */}
            <div
                style={{
                background: "#1e293b",
                color: "white",
                padding: "12px",
                textAlign: "center",
                fontWeight: "bold",
                fontSize: "18px",
                }}
            >
                Room {room.roomNumber}
            </div>

            {/* ⚪ Body */}
            <div
                style={{
                background: "white",
                padding: "15px",
                color: "#333",
                }}
            >
                <p>Capacity: {room.capacity}</p>
                <p>Occupied: {room.occupied}</p>
                <p>Vacancy: {room.vacancy}</p>

                <div style={{ marginTop: "10px", fontWeight: "bold" }}>
                {room.vacancy === 0 ? (
                    <span style={{ color: "red" }}>Full</span>
                ) : (
                    <span style={{ color: "green" }}>Available</span>
                )}
                </div>
            </div>
            </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}

export default Rooms;