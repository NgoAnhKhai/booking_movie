import React, { useState } from "react";
import { TransformWrapper, TransformComponent } from "react-zoom-pan-pinch";

const seatsData = [
  { id: "A1", x: 50, y: 50, status: "available" },
  { id: "A2", x: 100, y: 50, status: "booked" },
  { id: "A3", x: 150, y: 50, status: "available" },
  // ... các ghế khác với tọa độ và trạng thái
];

const SeatSelectionPage = () => {
  const [selectedSeats, setSelectedSeats] = useState([]);

  const toggleSeat = (id) => {
    setSelectedSeats((prev) =>
      prev.includes(id) ? prev.filter((s) => s !== id) : [...prev, id]
    );
  };

  return (
    <div style={{ width: "100%", height: "600px", border: "1px solid #ccc" }}>
      <TransformWrapper
        initialScale={1}
        minScale={0.5}
        maxScale={4}
        wheel={{ step: 0.1 }}
      >
        <TransformComponent>
          <div style={{ position: "relative", width: 600, height: 400 }}>
            {/* Background phòng chiếu */}
            <img
              src="/public/images/seat_room_1.png"
              alt="Theater Floorplan"
              style={{ width: "100%", height: "100%" }}
            />

            {/* Ghế */}
            {seatsData.map(({ id, x, y, status }) => (
              <div
                key={id}
                onClick={() => status === "available" && toggleSeat(id)}
                style={{
                  position: "absolute",
                  top: y,
                  left: x,
                  width: 30,
                  height: 30,
                  backgroundColor: selectedSeats.includes(id)
                    ? "green"
                    : status === "booked"
                    ? "red"
                    : "gray",
                  borderRadius: 4,
                  cursor: status === "available" ? "pointer" : "not-allowed",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  color: "white",
                  userSelect: "none",
                }}
              >
                {id}
              </div>
            ))}
          </div>
        </TransformComponent>
      </TransformWrapper>
    </div>
  );
};

export default SeatSelectionPage;
