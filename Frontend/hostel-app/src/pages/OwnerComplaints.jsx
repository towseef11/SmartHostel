import { useEffect, useState } from "react";
import axios from "axios";

function OwnerComplaints() {
  const [complaints, setComplaints] = useState([]);
  const [responses, setResponses] = useState({});

  useEffect(() => {
    fetchComplaints();
  }, []);

  const fetchComplaints = async () => {
    try {
      const token = localStorage.getItem("token");

      const res = await axios.get(
        "http://localhost:9988/OwnerComplaintController/getComplaints",
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      );

      console.log("ALL COMPLAINTS:", res.data);
      setComplaints(res.data);

    } catch (error) {
      console.error("ERROR:", error);
    }
  };

  // Handle input change per row
  const handleResponseChange = (id, value) => {
    setResponses({
      ...responses,
      [id]: value
    });
  };

  // Resolve complaint
  const handleResolve = async (id) => {
    try {
      const token = localStorage.getItem("token");

      const responseText = responses[id];

      if (!responseText) {
        alert("Please enter response");
        return;
      }

      await axios.patch(
        `http://localhost:9988/OwnerComplaintController/updateResponse/${id}/ok`,
        null,
        {
          params: {
            response: responseText
          },
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      );

      alert("Complaint resolved");

      fetchComplaints();

    } catch (error) {
      console.error("ERROR:", error);
    }
  };

  return (
    <div className="container">
      <h3>All Complaints</h3>

      {complaints.length === 0 ? (
        <p>No complaints found</p>
      ) : (
        <table className="table table-bordered mt-3">
          <thead className="table-dark">
            <tr>
              <th>ID</th>
              <th>Description</th>
              <th>Room</th>
              <th>Status</th>
              <th>Response</th>
              <th>Action</th>
            </tr>
          </thead>

          <tbody>
            {complaints.map((c) => (
              <tr key={c.id}>
                <td>{c.id}</td>
                <td>{c.description}</td>

                {/* Room */}
                <td>{c.room?.roomNumber || "N/A"}</td>

                {/* Status */}
                <td
                  style={{
                    color: c.status === "PENDING" ? "orange" : "green"
                  }}
                >
                  {c.status}
                </td>

                {/* Response input */}
                <td>
                  {c.status === "PENDING" ? (
                    <input
                      type="text"
                      className="form-control"
                      placeholder="Enter response"
                      value={responses[c.id] || ""}
                      onChange={(e) =>
                        handleResponseChange(c.id, e.target.value)
                      }
                    />
                  ) : (
                    c.response || "Done"
                  )}
                </td>

                {/* Action */}
                <td>
                  <button
                    className="btn btn-success btn-sm"
                    onClick={() => handleResolve(c.id)}
                    disabled={c.status !== "PENDING"}
                  >
                    Resolve
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

export default OwnerComplaints;