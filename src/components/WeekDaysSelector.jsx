import React, { useState, useEffect } from "react";
import { Box, Button } from "@mui/material";

const WeekDaysSelector = ({ selectedDate, onDateChange }) => {
  // Lấy 7 ngày bắt đầu từ Thứ Hai tuần hiện tại
  const [weekDays, setWeekDays] = useState([]);

  useEffect(() => {
    const getMondayOfWeek = (date) => {
      const d = new Date(date);
      const day = d.getDay();
      const diff = d.getDate() - day + (day === 0 ? -6 : 1);
      return new Date(d.setDate(diff));
    };

    const monday = getMondayOfWeek(new Date());
    const days = [];
    for (let i = 0; i < 7; i++) {
      const d = new Date(monday);
      d.setDate(monday.getDate() + i);
      days.push(d);
    }
    setWeekDays(days);
  }, []);

  const getVietnameseDayName = (date) => {
    const days = [
      "Chủ Nhật",
      "Thứ 2",
      "Thứ 3",
      "Thứ 4",
      "Thứ 5",
      "Thứ 6",
      "Thứ 7",
    ];
    return days[date.getDay()];
  };

  return (
    <Box sx={{ display: "flex", gap: 1, flexWrap: "wrap", mb: 3 }}>
      {weekDays.map((date) => {
        const dateStr = date.toISOString().slice(0, 10);
        const isSelected = selectedDate === dateStr;
        return (
          <Button
            key={dateStr}
            variant={isSelected ? "contained" : "outlined"}
            onClick={() => onDateChange(dateStr)}
            size="small"
          >
            {getVietnameseDayName(date)} ({dateStr})
          </Button>
        );
      })}
    </Box>
  );
};

export default WeekDaysSelector;
