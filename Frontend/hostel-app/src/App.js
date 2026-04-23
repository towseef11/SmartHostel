import { BrowserRouter, Routes, Route } from "react-router-dom";

import Login from "./pages/loginPage";
import OwnerDashboard from "./pages/OwnerDashboard";
import UserDashboard from "./pages/UserDashboard"; // ✅ ADD THIS

import CreateUser from "./pages/CreateUser";
import ViewUsers from "./pages/ViewUsers";
import UpdateUser from "./pages/UpdateUser";
import DeleteUser from "./pages/DeleteUser";
import Details from "./pages/Details";
import UserComplaints from "./pages/UserComplaints";
import OwnerComplaints from "./pages/OwnerComplaints";
import SlotBooking from "./pages/SlotBooking";
import OwnerFoodMenu from "./pages/ownerFoodMenu";
import UserFoodMenu from "./pages/UserFoodMenu";
import Rooms from "./pages/Rooms";
import UsersInRoom from "./pages/UsersInRoom";

function App() {
  return (
    <BrowserRouter>
      <Routes>

        {/* Login */}
        <Route path="/" element={<Login />} />

        {/* Owner Layout */}
        <Route path="/owner" element={<OwnerDashboard />}>
          <Route index element={<h2>Welcome Owner 👋</h2>} />
          <Route path="create-user" element={<CreateUser />} />
          <Route path="view-users" element={<ViewUsers />} />
          <Route path="update-user" element={<UpdateUser />} />
          <Route path="delete-user" element={<DeleteUser />} />
          <Route path="complaints" element={<OwnerComplaints />} />
          <Route path="food" element={<OwnerFoodMenu />} />
          <Route path="room" element={<Rooms />} />
          <Route path="room/:roomId" element={<UsersInRoom />} />
        </Route>

        {/* ✅ User Layout */}
        <Route path="/user" element={<UserDashboard />}>

          <Route path="dashboard" element={<Details />} />
          <Route path="book-slot" element={<SlotBooking/>} />
          <Route path="food" element={<UserFoodMenu/>} />
          <Route path="complaints" element={<UserComplaints />} />

        </Route>

      </Routes>
    </BrowserRouter>
  );
}

export default App;