import React from "react";
import { FormControl, InputLabel, Select, MenuItem } from "@mui/material";

const CitySelector = ({ cities, selectedCity, onChange }) => {
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
      <InputLabel>Chọn Thành Phố</InputLabel>
      <Select
        value={selectedCity}
        onChange={onChange}
        label="Chọn Thành Phố"
        sx={{ borderRadius: 2, fontSize: 16, color: "#333" }}
      >
        {cities.length === 0 && (
          <MenuItem disabled>Không có dữ liệu thành phố</MenuItem>
        )}
        {cities.map((city, idx) => (
          <MenuItem key={idx} value={city.name}>
            {city.name}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
};

export default CitySelector;
