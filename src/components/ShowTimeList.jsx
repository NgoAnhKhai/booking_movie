import React, { useState, useEffect } from "react";
import {
  Typography,
  Box,
  List,
  ListItem,
  ListItemText,
  Button,
} from "@mui/material";
import { useNavigate } from "react-router-dom";

const ShowtimesList = ({ cinemas, selectedCinema, movieId }) => {
  const [selectedDate, setSelectedDate] = useState("");
  const navigate = useNavigate();

  // Tạo mảng 7 ngày của tuần hiện tại từ Thứ 2 đến Chủ Nhật (yyyy-mm-dd)
  const getWeekDays = () => {
    const days = [];
    const today = new Date();
    const dayOfWeek = today.getDay(); // 0 (CN) - 6 (T7)
    const offset = dayOfWeek === 0 ? -6 : 1 - dayOfWeek; // Thứ 2
    const monday = new Date(today);
    monday.setDate(today.getDate() + offset);
    for (let i = 0; i < 7; i++) {
      const d = new Date(monday);
      d.setDate(monday.getDate() + i);
      days.push(d.toISOString().slice(0, 10));
    }
    return days;
  };

  // Hiển thị label ngày kèm thứ: T2 (2025-05-21)
  const getDayLabel = (dateStr) => {
    const daysOfWeek = ["CN", "T2", "T3", "T4", "T5", "T6", "T7"];
    const d = new Date(dateStr);
    const dayName = daysOfWeek[d.getDay()];
    return `${dayName} (${dateStr})`;
  };

  // Đặt ngày mặc định khi chọn rạp hoặc cinema thay đổi
  useEffect(() => {
    if (!cinemas || cinemas.length === 0) return;
    if (!selectedCinema) return;

    const cinema = cinemas.find((c) => c.id === selectedCinema);
    if (!cinema) return;

    const showDates = new Set();
    cinema.rooms?.forEach((room) => {
      room.showtimes.forEach((st) => {
        if (st.movie_id === Number(movieId)) showDates.add(st.date);
      });
    });
    const sortedDates = Array.from(showDates).sort();

    setSelectedDate(sortedDates.length > 0 ? sortedDates[0] : getWeekDays()[0]);
  }, [cinemas, selectedCinema, movieId]);

  if (!cinemas || cinemas.length === 0) {
    return <Typography>Không có rạp nào</Typography>;
  }

  const cinema = cinemas.find((c) => c.id === selectedCinema);
  if (!cinema) {
    return <Typography>Chọn rạp để xem suất chiếu</Typography>;
  }

  const days = getWeekDays();

  // Lọc suất chiếu theo ngày và phim
  const showtimesForDate = [];
  cinema.rooms?.forEach((room) => {
    room.showtimes.forEach((st) => {
      if (st.movie_id === Number(movieId) && st.date === selectedDate) {
        showtimesForDate.push({
          roomId: room.id,
          roomName: room.name,
          time: st.time,
          seats: room.seats,
        });
      }
    });
  });

  // Xử lý click vào suất chiếu
  const handleShowtimeClick = (roomId) => {
    navigate(`/seat-selector/${roomId}`);
  };

  return (
    <Box sx={{ mt: 4 }}>
      <Typography variant="h6" mb={2}>
        Suất chiếu tại {cinema.name}
      </Typography>

      {/* Thanh chọn ngày */}
      <Box sx={{ display: "flex", gap: 1, mb: 3, flexWrap: "wrap" }}>
        {days.map((day) => (
          <Button
            key={day}
            variant={day === selectedDate ? "contained" : "outlined"}
            onClick={() => setSelectedDate(day)}
            size="small"
          >
            {getDayLabel(day)}
          </Button>
        ))}
      </Box>

      {showtimesForDate.length === 0 ? (
        <Typography>Không có suất chiếu cho ngày này.</Typography>
      ) : (
        <List>
          {showtimesForDate.map(({ roomId, roomName, time, seats }) => (
            <ListItem
              key={`${roomId}-${time}`}
              divider
              button
              onClick={() => handleShowtimeClick(roomId)}
              sx={{
                cursor: "pointer",
                "&:hover": {
                  backgroundColor: "rgba(0,0,0,0.1)",
                },
              }}
            >
              <ListItemText
                primary={`Giờ: ${time} - Phòng: ${roomName} - Ghế còn: ${seats}`}
              />
            </ListItem>
          ))}
        </List>
      )}
    </Box>
  );
};

export default ShowtimesList;
