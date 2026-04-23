import { useEffect, useState } from "react";
import axios from "axios";

function UserFoodMenu() {
  const [menu, setMenu] = useState([]);
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
      setMenu(res.data);
    } catch (err) {
      console.error(err);
      alert("Failed to load food menu");
    }
  };

  // 🔥 Get today in uppercase (MONDAY format)
  const getToday = () => {
    return new Date()
      .toLocaleDateString("en-US", { weekday: "long" })
      .toUpperCase();
  };

  const today = getToday();

  return (
    <div className="container mt-4">
      <h3 className="mb-4">🍽️ Weekly Food Menu</h3>

      <div className="row">
        {menu.map((item) => {
          const isToday = item.dayOfWeek === today;

          return (
            <div className="col-md-4 mb-4" key={item.id}>
              <div
                className={`card shadow p-3 text-center ${
                  isToday ? "border border-success" : ""
                }`}
              >
                {/* DAY */}
                <h4
                  className={
                    isToday ? "text-success fw-bold" : "text-dark"
                  }
                >
                  {item.dayOfWeek}
                  {isToday && " (Today)"}
                </h4>

                <hr />

                {/* FOOD DETAILS */}
                <p>
                  <b>Breakfast:</b> {item.breakfast}
                </p>

                <p>
                  <b>Lunch:</b> {item.lunch}
                </p>

                <p>
                  <b>Dinner:</b> {item.dinner}
                </p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default UserFoodMenu;