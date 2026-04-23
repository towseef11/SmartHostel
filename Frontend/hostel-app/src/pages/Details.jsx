import { useEffect, useState } from "react";

function Details() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem("token");
    const userId = localStorage.getItem("userId");
    
     console.log("USER ID:", userId);

    fetch(`http://localhost:9988/user/userById/${userId}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`
      }
    })
      .then(res => {
        if (!res.ok) {
          throw new Error("Failed to fetch user");
        }
        return res.json();
      })
      .then(data => {
        console.log("USER DATA:", data);
        setUser(data);
      })
      .catch(err => console.error(err));

  }, []);

  if (!user) {
    return <p>Loading...</p>;
  }

 return (
  <div className="d-flex justify-content-center align-items-center min-vh-100">

    <div className="card shadow-sm p-4" style={{ width: "400px" }}>

      <h4 className="mb-4 text-center">User Details</h4>

      <div className="mb-3">
        <strong>Name:</strong> {user.name}
      </div>

      <div className="mb-3">
        <strong>Email:</strong> {user.email}
      </div>

      <div className="mb-3">
        <strong>Mobile:</strong> {user.mobile}
      </div>

      <div className="mb-3">
        <strong>Role:</strong> {user.role}
      </div>

      <div className="mb-3">
        <strong>Room:</strong>{" "}
        {user.room ? user.room.roomid : "Not Assigned"}
      </div>

    </div>

  </div>
);
}

export default Details;