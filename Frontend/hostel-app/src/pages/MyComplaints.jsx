import { useEffect, useState } from "react";
import axios from "axios";

function MyComplaints() {
  const [complaints, setComplaints] = useState([]);

  useEffect(() => {
    fetchComplaints();
  }, []);

  const fetchComplaints = async () => {
    try {
      const token = localStorage.getItem("token");

      const res = await axios.get(
        "http://localhost:9988/userComplaintsController/mycomplaints",
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      );

      console.log("COMPLAINTS:", res.data);
      setComplaints(res.data);

    } catch (error) {
      console.error("ERROR FETCHING:", error);
    }
  };
  const handleDelete = async (id) => {
  console.log("Deleting ID:", id);

  try {
    const token = localStorage.getItem("token");

    await axios.delete(
      `http://localhost:9988/userComplaintsController/deletecomplaint/${id}`, // ✅ THIS LINE
      {
        headers: {
          Authorization: `Bearer ${token}`
        }
      }
    );

    alert("Deleted successfully");
    fetchComplaints();

  } catch (error) {
    console.error("DELETE ERROR:", error);
  }
};

  return (
    <div className="container mt-4">
      <h3>My Complaints</h3>

      {complaints.length === 0 ? (
        <p>No complaints found</p>
      ) : (
        <table className="table table-bordered mt-3">
          <thead>
            <tr>
              <th>ID</th>
              <th>Description</th>
              <th>Room</th>
              <th>Status</th>
              <th>Response</th>
              <th>Date</th>
              <th>Actions</th>
            </tr>
          </thead>

          <tbody>
            {complaints.map((c) => (
              <tr key={c.id}>
                <td>{c.id}</td>
                <td>{c.description}</td>

                {/* ROOM NUMBER */}
                <td>{c.room?.roomNumber || "N/A"}</td>

                {/* STATUS with color */}
                <td style={{
                  color: c.status === "PENDING" ? "orange" : "green"
                }}>
                  {c.status}
                </td>

                {/* OWNER RESPONSE */}
                <td>{c.response || "Not yet"}</td>

                {/* DATE FORMATTING */}
                <td>
                  {c.time
                    ? new Date(c.time).toLocaleString()
                    : "N/A"}
                </td>
                <td>
                  <button
                   className="btn btn-danger btn-sm"
                   onClick={() => handleDelete(c.id)}
                   disabled={c.status !== "PENDING"} 
                  >
                  Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}

export default MyComplaints;