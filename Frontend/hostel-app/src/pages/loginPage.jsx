import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
  e.preventDefault();
  alert("FORM SUBMITTED"); // 👈 ADD THIS

    try {
      const response = await axios.post(
        "http://localhost:9988/user/login",
        {
          email: email,
          password: password
        }
      );

      const data = response.data;

      console.log("LOGIN RESPONSE:", data);
      console.log(email, password);

      // ✅ Store token
      localStorage.setItem("token", data.token);
      localStorage.setItem("role", data.role);
      localStorage.setItem("userId", data.userId);
      localStorage.setItem("username", data.name);

      // ✅ Navigate based on role
      if (data.role === "OWNER") {
        navigate("/owner");
      } else {
        navigate("/user/dashboard");
      }

    } catch (error) {
  console.log("FULL ERROR:", error);
  console.log("RESPONSE:", error.response);
  alert("Login failed");
}
  };

  return (
    <div className="container mt-5">
      <div className="row justify-content-center">
        <div className="col-md-4">
          <div className="card shadow p-4">
            <h3 className="text-center mb-4">Login</h3>

            <form onSubmit={handleSubmit}>
              
              <div className="mb-3">
                <label>Email</label>
                <input
                  type="email"
                  className="form-control"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>

              <div className="mb-3">
                <label>Password</label>
                <input
                  type="password"
                  className="form-control"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>

              <button className="btn btn-primary w-100">
                Login
              </button>

            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;