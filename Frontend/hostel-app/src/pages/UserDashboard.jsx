import { Navigate, Outlet, useNavigate } from "react-router-dom";
import UserSidebar from "../components/UserSidebar";

function UserDashboard() {
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  if (!token) {
    return <Navigate to="/" />;
  }

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("userId");
    navigate("/");
  };

  const username = localStorage.getItem("username");

  return (
    <div className="container-fluid">
      <div className="row">

        {/* Sidebar */}
        <div className="col-md-3 col-lg-2 bg-dark text-white min-vh-100">
          <UserSidebar onLogout={handleLogout} />
        </div>

        {/* Main Content */}
        <div className="col-md-9 col-lg-10 p-0">

          <div className="d-flex justify-content-between align-items-center bg-dark text-white p-3">
            <h5 className="mb-0">User Dashboard</h5>

           
          </div>

          <div className="p-4">
            <Outlet />
          </div>

        </div>

      </div>
    </div>
  );
}

export default UserDashboard;