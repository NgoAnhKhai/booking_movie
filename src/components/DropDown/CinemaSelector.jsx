import React from "react";
import { FormControl, InputLabel, Select, MenuItem } from "@mui/material";

const CinemaSelector = ({ cinemas, selectedCinema, onChange }) => {
  return (
    <FormControl
      sx={{
        width: 300,
        "& .MuiOutlinedInput-root": {
          borderRadius: 2,
          borderColor: "#ccc",
          "& fieldset": { borderColor: "#ccc" },
          "&:hover fieldset": { borderColor: "#b71c1c" },
          "&.Mui-focused fieldset": {
            borderColor: "#b71c1c",
            borderWidth: 1.5,
          },
          boxShadow: "0 2px 6px rgba(183,28,28,0.1)",
        },
      }}
    >
      <InputLabel>Chọn Rạp</InputLabel>
      <Select
        value={selectedCinema}
        onChange={onChange}
        label="Chọn Rạp"
        sx={{ borderRadius: 2, fontSize: 16, color: "#333" }}
        disabled={cinemas.length === 0}
      >
        {cinemas.length === 0 && (
          <MenuItem disabled>Không có dữ liệu rạp</MenuItem>
        )}
        {cinemas.map((cinema) => (
          <MenuItem key={cinema.id} value={cinema.id}>
            {cinema.name}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
};

export default CinemaSelector;
