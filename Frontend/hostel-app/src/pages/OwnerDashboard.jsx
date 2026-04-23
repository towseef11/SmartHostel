import OwnerSidebar from "../components/OwnerSidebar";
import { useNavigate, Navigate, Outlet } from "react-router-dom";

function OwnerDashboard() {
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  // 🔒 Protect route
  if (!token) {
    return <Navigate to="/" />;
  }

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/");
  };

  return (
    
    <div className="container-fluid">
      <div className="row">

        {/* Sidebar */}
        <div className="col-md-3 col-lg-2 bg-dark text-white min-vh-100">
          <OwnerSidebar />
        </div>

        {/* Main Section */}
        <div className="col-md-9 col-lg-10 p-0">

          {/* Top Navbar */}
          <div className="d-flex justify-content-between align-items-center bg-dark text-white p-3 shadow-sm">
            <h5 className="mb-0">Owner Dashboard</h5>

            <div className="d-flex gap-3">
              <button className="btn btn-outline-primary" onClick={() => navigate("food")}>
                Food
              </button>
              <button className="btn btn-outline-primary" onClick={() => navigate("complaints")}>
              Complaints
              </button>
              <button className="btn btn-outline-primary" onClick={()=>navigate("room")}>
              Rooms
              </button>

              <button className="btn btn-danger" onClick={handleLogout}>
                Logout
              </button>
            </div>
          </div>

          {/* 🔥 Dynamic Content Area */}
          <div className="p-4">
            <Outlet />
          </div>

        </div>
      </div>
    </div>
  );
}

export default OwnerDashboard;