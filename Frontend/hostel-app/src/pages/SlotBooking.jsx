import { useEffect, useState } from "react";
import axios from "axios";

function SlotBooking() {
  const [slots, setSlots] = useState([]);
  const [selectedDate, setSelectedDate] = useState("");
  const token = localStorage.getItem("token");
  const userId = localStorage.getItem("userId");

  useEffect(() => {
    fetchSlots();
  }, [selectedDate]);

  const fetchSlots = async () => {
    try {
      const res = await axios.get(
        "http://localhost:9988/Api/slots/availability",
        {
          params: { date: selectedDate || null },
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      setSlots(res.data);
    } catch (err) {
      console.error(err);
      alert("Error fetching slots");
    }
  };

  const handleBook = async (time) => {
    try {
      await axios.post(
        "http://localhost:9988/Api/slots/bookslot",
        null,
        {
          params: {
            time,
            date: selectedDate || null,
          },
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      alert("Slot booked successfully");
      fetchSlots();
    } catch (err) {
      console.error(err);
      alert(err.response?.data || "Booking failed");
    }
  };

  // 🔥 FORMAT: 8:00 - 9:00
  const formatTimeRange = (time) => {
    const hour = parseInt(time.split(":")[0]);
    return `${hour}:00 - ${hour + 1}:00`;
  };

  // 🔥 DISABLE PAST SLOTS (FRONTEND MATCH BACKEND)
  const isPastSlot = (slotTime) => {
    const today = new Date().toISOString().split("T")[0];

    if (!selectedDate || selectedDate !== today) return false;

    const slotHour = parseInt(slotTime.split(":")[0]);
    const currentHour = new Date().getHours();

    return slotHour < currentHour;
  };

  return (
    <div className="container mt-4">
      <h3 className="mb-4">Washing Machine Slot Booking</h3>

      {/* DATE */}
      <div className="mb-4">
        <input
          type="date"
          className="form-control w-25"
          value={selectedDate}
          onChange={(e) => setSelectedDate(e.target.value)}
        />
      </div>

      {/* SLOT GRID */}
      <div className="row">
        {slots.map((slot, index) => {
          const isMySlot = slot.bookedByUserId == userId;
          const past = isPastSlot(slot.slotTime);

          return (
            <div className="col-md-3 mb-4" key={index}>
              <div
                className={`card text-center p-3 shadow ${
                  slot.booked
                    ? isMySlot
                      ? "bg-success text-white"
                      : "bg-secondary text-white"
                    : past
                    ? "bg-warning text-dark"
                    : "bg-light"
                }`}
              >
                <h5>Slot {index + 1}</h5>

                <p>{formatTimeRange(slot.slotTime)}</p>

                {slot.booked ? (
                  isMySlot ? (
                    <button className="btn btn-light" disabled>
                      Your Slot
                    </button>
                  ) : (
                    <button className="btn btn-dark" disabled>
                      Booked
                    </button>
                  )
                ) : past ? (
                  <button className="btn btn-warning" disabled>
                    Expired
                  </button>
                ) : (
                  <button
                    className="btn btn-primary"
                    onClick={() => handleBook(slot.slotTime)}
                  >
                    Book
                  </button>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default SlotBooking;