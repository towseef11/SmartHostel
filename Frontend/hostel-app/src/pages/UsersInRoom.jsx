import { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";

function UsersInRoom() {
  const { roomId } = useParams();
  const [users, setUsers] = useState([]);

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const res = await axios.get(
        `http://localhost:9988/rooms/${roomId}/users`
      );
      setUsers(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div style={{ padding: "20px" }}>
      <h2>Users in Room {roomId}</h2>

      {users.length === 0 ? (
        <p>No users in this room</p>
      ) : (
                <table
        style={{
            marginTop: "20px",
            width: "100%",
            borderCollapse: "collapse",
        }}
        >
        <thead
            style={{
            background: "#1e293b",
            color: "white",
            }}
        >
            <tr>
            <th style={{ padding: "10px" }}>Name</th>
            <th style={{ padding: "10px" }}>Email</th>
            <th style={{ padding: "10px" }}>Mobile</th>
            <th style={{ padding: "10px" }}>Room</th>
            </tr>
        </thead>

        <tbody>
            {users.map((user, index) => (
            <tr
                key={user.id}
                style={{
                background: index % 2 === 0 ? "#f9f9f9" : "white", // optional zebra
                }}
            >
                <td style={{ padding: "10px" }}>{user.name}</td>
                <td style={{ padding: "10px" }}>{user.email}</td>
                <td style={{ padding: "10px" }}>{user.mobile}</td>
                <td style={{ padding: "10px" }}>{user.room?.roomNumber}</td>
            </tr>
            ))}
        </tbody>
        </table>
      )}
    </div>
  );
}

export default UsersInRoom;