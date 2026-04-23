import { useEffect, useState } from "react";

function ViewUsers() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const token = localStorage.getItem("token");

    console.log("TOKEN:", token); // 🔍 debug

    fetch("http://localhost:9988/user/allusers", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}` // 🔥 important
      }
    })
      .then((res) => {
        console.log("STATUS:", res.status);

        if (!res.ok) {
          throw new Error("Unauthorized or error in API");
        }

        return res.json();
      })
      .then((data) => {
        console.log("API RESPONSE:", data); // 🔍 VERY IMPORTANT

        // If backend returns array directly
        setUsers(data);

        // If backend returns { data: [...] } then use:
        // setUsers(data.data);
      })
      .catch((err) => {
        console.error("FETCH ERROR:", err);
      });

  }, []);

  return (
    <div className="container mt-4">
      <h2>All Users</h2>

      {users.length === 0 ? (
        <p>No users found</p>
      ) : (
        <table className="table table-bordered mt-3">
          <thead>
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>Email</th>
              <th>Mobile</th>
              <th>Role</th>
              <th>Room No</th>
            </tr>
          </thead>

          <tbody>
            {users.map((u) => (
              <tr key={u.userid}>
                <td>{u.userid}</td>
                <td>{u.name}</td>
                <td>{u.email}</td>
                <td>{u.mobile}</td>
                <td>{u.role}</td>
                <td>{u.room?.roomNumber}</td> 
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}

export default ViewUsers;