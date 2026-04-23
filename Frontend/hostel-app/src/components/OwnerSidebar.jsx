import { Link } from "react-router-dom";

function OwnerSidebar() {
  const username = localStorage.getItem("username"); // ✅ get logged user

  return (
    <div
      className="d-flex flex-column p-3"
      style={{
        height: "100vh",
        position: "fixed",   // ✅ FIXED SIDEBAR
        width: "220px",
        background: "#1e293b",
      }}
    >
      {/* 🔝 Username (instead of Dashboard) */}
      <div style={{ marginBottom: "20px" }}>
        <h5 className="text-white text-center">
          {username || "Owner"}
        </h5>
      </div>

      {/* 🔽 Menu (NO MOVEMENT NOW) */}
      <div className="d-flex flex-column" style={{ marginTop: "200px" }}>
        <Link className="btn btn-outline-light w-100 mb-3 text-start" to="/owner/create-user">
          Create User
        </Link>

        <Link className="btn btn-outline-light w-100 mb-3 text-start" to="/owner/view-users">
          View Users
        </Link>

        <Link className="btn btn-outline-light w-100 mb-3 text-start" to="/owner/update-user">
          Update User
        </Link>

        <Link className="btn btn-outline-light w-100 mb-3 text-start" to="/owner/delete-user">
          Delete User
        </Link>

      
      </div>
    </div>
  );
}

export default OwnerSidebar;