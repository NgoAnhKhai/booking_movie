import React, { useState } from "react";
import { Tabs, Tab, Box } from "@mui/material";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import CurrentMovies from "./CurrentMovies";
import UpcomingMovies from "./UpconmingMovies";
import Locations from "./Location";

const StyledTabs = (props) => (
  <Tabs
    {...props}
    sx={{
      minHeight: 44,
      "& .MuiTabs-indicator": {
        height: 3,
        borderRadius: 2,
        width: "1px",
        marginLeft: "4px",
        backgroundColor: "#FF0000FF",
        transition: "all 0.3s",
      },
    }}
  />
);

const StyledTab = (props) => (
  <Tab
    disableRipple
    {...props}
    sx={{
      textTransform: "lowercase",
      fontWeight: 600,
      minHeight: 48,
      padding: "0 16px",
      color: "#666",
      "&.Mui-selected": {
        color: "#FF0000FF",
        fontWeight: 700,
      },
    }}
  />
);

const CustomTabs = () => {
  const [tabIndex, setTabIndex] = useState(0);

  const handleChange = (e, newValue) => {
    setTabIndex(newValue);
  };

  return (
    <Box>
      <Box
        display="flex"
        alignItems="center"
        sx={{
          borderBottom: 1,
          borderColor: "#ccc",
          maxWidth: "200vh",
          margin: "auto",
          paddingRight: 2,
          paddingLeft: 2,
        }}
      >
        {/* Gạch dọc bên trái chữ phim */}
        <Box
          sx={{
            borderLeft: "4px solid #FF0000FF",
            paddingLeft: 1,
            marginRight: 2,
            fontWeight: "bold",
            fontSize: 18,
            textTransform: "uppercase",
            color: "#333",
            userSelect: "none",
          }}
        >
          phim
        </Box>

        {/* Tabs */}
        <StyledTabs
          value={tabIndex}
          onChange={handleChange}
          aria-label="custom tabs"
        >
          <StyledTab label="đang chiếu" />
          <StyledTab label="sắp chiếu" />
          <StyledTab
            label={
              <Box display="flex" alignItems="center" gap={0.5}>
                <LocationOnIcon sx={{ fontSize: 18, color: "#FF0000FF" }} />
                toàn quốc
              </Box>
            }
          />
        </StyledTabs>
      </Box>

      {/* Nội dung tab */}
      <Box
        sx={{
          mt: 3,
          marginLeft: "auto",
          marginRight: "auto",
          maxWidth: "200vh",
        }}
      >
        {tabIndex === 0 && <CurrentMovies />}
        {tabIndex === 1 && <UpcomingMovies />}
        {tabIndex === 2 && <Locations />}
      </Box>
    </Box>
  );
};

export default CustomTabs;
