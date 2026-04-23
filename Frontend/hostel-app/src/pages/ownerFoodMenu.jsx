import { useEffect, useState } from "react";
import axios from "axios";

function OwnerFoodMenu() {
  const [menu, setMenu] = useState({
    dayOfWeek: "",
    breakfast: "",
    lunch: "",
    dinner: "",
  });

  const [allMenus, setAllMenus] = useState([]);
  const token = localStorage.getItem("token");

  useEffect(() => {
    fetchMenu();
  }, []);

  const fetchMenu = async () => {
    try {
      const res = await axios.get(
        "http://localhost:9988/weeklyfood/weeklyschedule",
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      setAllMenus(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  const handleChange = (e) => {
    setMenu({ ...menu, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!menu.dayOfWeek) {
      alert("Please select a day");
      return;
    }

    try {
      await axios.post(
        `http://localhost:9988/weeklyfood/updateschedule/${menu.dayOfWeek}`,
        {
          breakfast: menu.breakfast,
          lunch: menu.lunch,
          dinner: menu.dinner,
        },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      alert("Food menu updated successfully");
      setMenu({
        dayOfWeek: "",
        breakfast: "",
        lunch: "",
        dinner: "",
      });

      fetchMenu();
    } catch (err) {
      console.error(err);
      alert("Failed to update menu");
    }
  };

  return (
    <div className="container mt-4">
      <h3 className="mb-4">🍽️ Owner Food Menu Management</h3>

      {/* FORM */}
      <div className="card p-4 shadow mb-4">
        <form onSubmit={handleSubmit}>
          {/* DAY */}
          <div className="mb-3">
            <label>Day of Week</label>
            <select
              className="form-control"
              name="dayOfWeek"
              value={menu.dayOfWeek}
              onChange={handleChange}
            >
              <option value="">Select Day</option>
              <option>MONDAY</option>
              <option>TUESDAY</option>
              <option>WEDNESDAY</option>
              <option>THURSDAY</option>
              <option>FRIDAY</option>
              <option>SATURDAY</option>
              <option>SUNDAY</option>
            </select>
          </div>

          {/* BREAKFAST */}
          <div className="mb-3">
            <label>Breakfast</label>
            <input
              type="text"
              className="form-control"
              name="breakfast"
              value={menu.breakfast}
              onChange={handleChange}
              placeholder="Enter breakfast menu"
            />
          </div>

          {/* LUNCH */}
          <div className="mb-3">
            <label>Lunch</label>
            <input
              type="text"
              className="form-control"
              name="lunch"
              value={menu.lunch}
              onChange={handleChange}
              placeholder="Enter lunch menu"
            />
          </div>

          {/* DINNER */}
          <div className="mb-3">
            <label>Dinner</label>
            <input
              type="text"
              className="form-control"
              name="dinner"
              value={menu.dinner}
              onChange={handleChange}
              placeholder="Enter dinner menu"
            />
          </div>

          <button className="btn btn-primary w-100">
            Save / Update Menu
          </button>
        </form>
      </div>

      {/* DISPLAY MENU */}
      <h4 className="mb-3">📅 Weekly Menu Preview</h4>

      <div className="row">
        {allMenus.map((m, index) => (
          <div className="col-md-4 mb-3" key={index}>
            <div className="card p-3 shadow">
              <h5>{m.dayOfWeek}</h5>
              <p><b>Breakfast:</b> {m.breakfast}</p>
              <p><b>Lunch:</b> {m.lunch}</p>
              <p><b>Dinner:</b> {m.dinner}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default OwnerFoodMenu;