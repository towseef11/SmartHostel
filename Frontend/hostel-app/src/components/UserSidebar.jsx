import { Link } from "react-router-dom";

function UserSidebar({ onLogout }) {

  const username = localStorage.getItem("username");

  return (
    <div className="d-flex flex-column h-100 p-3">

      {/* Top Title */}
      <h4 className="text-white mb-4">
        👤 {username || "User"}
      </h4>

      {/* Center Buttons */}
      <div className="d-flex flex-column justify-content-center flex-grow-1">

        <Link className="btn btn-outline-light w-100 mb-3 text-start" to="/user/dashboard">
          Details
        </Link>

        <Link className="btn btn-outline-light w-100 mb-3 text-start" to="/user/book-slot">
          Book Slot
        </Link>

        <Link className="btn btn-outline-light w-100 mb-3 text-start" to="/user/food">
          Food
        </Link>

        <Link className="btn btn-outline-light w-100 mb-3 text-start" to="/user/complaints" >
         Complaints
        </Link>

      </div>

      {/* Bottom Logout */}
      <button className="btn btn-danger w-100" onClick={onLogout}>
        Logout
      </button>

    </div>
  );
}

export default UserSidebar;