import { useState } from "react";

function DeleteUser() {
  const [id, setId] = useState("");
  const token = localStorage.getItem("token");

  const handleDelete = async (e) => {
    e.preventDefault();

    await fetch(`http://localhost:9988/user/deleteById/${id}`, {
      method: "DELETE",
      headers: {
        "Authorization": "Bearer " + token
      }
    });

    alert("User Deleted");
  };

  return (
    <div className="p-4">
      <h2>Delete User</h2>

      <form onSubmit={handleDelete}>
        <input
          className="form-control mb-2"
          placeholder="User ID"
          value={id}
          onChange={(e) => setId(e.target.value)}
        />

        <button className="btn btn-danger">Delete</button>
      </form>
    </div>
  );
}

export default DeleteUser;