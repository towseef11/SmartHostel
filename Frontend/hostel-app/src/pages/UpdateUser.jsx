import { useState } from "react";

function UpdateUser() {
  const [user, setUser] = useState({
  userid: "",
  name: "",
  email: "",
  mobile: "",
  roomNumber: ""
});

  const token = localStorage.getItem("token");

  const handleChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const handleUpdate = async (e) => {
    e.preventDefault();

    await fetch(`http://localhost:9988/user/${user.userid}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        "Authorization": "Bearer " + token
      },
      body: JSON.stringify(user)
    });

    alert("User Updated");
  };

  return (
    <div className="p-4">
      <h2>Update User</h2>

      <form onSubmit={handleUpdate}>
        
        <input 
          name="userid" 
          placeholder="User ID" 
          className="form-control mb-2" 
          onChange={handleChange} 
        />

        <input 
          name="name" 
          placeholder="New Name" 
          className="form-control mb-2" 
          onChange={handleChange} 
        />

        <input 
          name="email" 
          placeholder="New Email" 
          className="form-control mb-2" 
          onChange={handleChange} 
        />

        <input 
          name="mobile" 
          placeholder="New Mobile" 
          className="form-control mb-2" 
          onChange={handleChange}
        />

       <input 
          name="roomNumber"
          placeholder="Room Number"
          className="form-control mb-2"
          onChange={handleChange}
        />

        <button className="btn btn-warning">Update</button>
      </form>
    </div>
  );
}

export default UpdateUser;