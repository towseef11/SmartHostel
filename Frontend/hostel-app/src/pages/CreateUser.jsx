import { useState } from "react";

function CreateUser() {

  const [user, setUser] = useState({
    name: "",
    email: "",
    password: "",
    mobile: "",
    role: "USER",
    room: ""
  });

  const token = localStorage.getItem("token");

  const handleChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const response = await fetch("http://localhost:9988/user/insert", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": "Bearer " + token
      },
      body: JSON.stringify({
        ...user,
        room: user.room ? { roomNumber: user.room } : null
      })
    });

    if (!response.ok) {
      alert("User creation failed");
      return;
    }

    alert("User Created");
  };

  // ✅ THIS return must be INSIDE function
  return (
    <div className="p-4">
      <h2>Create User</h2>

      <form onSubmit={handleSubmit}>
        <input name="name" placeholder="Name" className="form-control mb-2" onChange={handleChange} />
        <input name="email" placeholder="Email" className="form-control mb-2" onChange={handleChange} />
        <input name="password" placeholder="Password" className="form-control mb-2" onChange={handleChange} />
        <input name="mobile" placeholder="Mobile" className="form-control mb-2" onChange={handleChange} />

        <select name="role" className="form-control mb-2" onChange={handleChange}>
          <option value="USER">USER</option>
          <option value="OWNER">OWNER</option>
        </select>

        <input name="room" placeholder="Room Number" className="form-control mb-2" onChange={handleChange} />

        <button className="btn btn-primary">Create</button>
      </form>
    </div>
  );
}

export default CreateUser;