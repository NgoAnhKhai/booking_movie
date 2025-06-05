import React, { useState } from "react";
import {
  Box,
  Typography,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
  Switch,
} from "@mui/material";

const Sidebar = () => {
  const [selectedItem, setSelectedItem] = useState(null);
  const [darkMode, setDarkMode] = useState(false);

  const handleItemClick = (index) => {
    setSelectedItem(index); // Cập nhật mục được chọn
  };

  const handleDarkModeToggle = () => {
    setDarkMode(!darkMode);
  };

  return (
    <Box
      sx={{
        width: 270,
        height: "100%",
        bgcolor: "#1A161F",
        color: "#78828A",
        display: "flex",
        flexDirection: "column",
        padding: "20px 10px",
      }}
    >
      {/* Menu Title */}
      <Typography
        sx={{ ml: 2 }}
        width={67}
        height={24}
        color="#9CA4AB"
        fontWeight={300}
      >
        MENU
      </Typography>

      {/* Menu Items */}
      <List>
        {/* Discovery */}
        <ListItem
          button
          onClick={() => handleItemClick(1)}
          sx={{
            borderLeft: selectedItem === 1 ? "4px solid #9B41F7" : "none",
            transition: "border-left 0.3s ease, background-color 0.3s ease",
            "&:hover": {
              backgroundColor: "#2E2A32",
              borderLeft: "4px solid #9B41F7",
            },
          }}
        >
          <ListItemIcon>
            <img
              src={
                selectedItem === 1
                  ? "/sidebar/discover-click.png"
                  : "/sidebar/discover.png"
              }
              alt="Discovery"
              style={{ width: "24px", height: "24px" }}
            />
          </ListItemIcon>
          <ListItemText
            primary="Discovery"
            sx={{
              fontWeight: selectedItem === 1 ? "bold" : "normal",
              color: selectedItem === 1 ? "white" : "#78828A",
              transition: "color 0.3s ease",
            }}
          />
        </ListItem>

        {/* Top Rated */}
        <ListItem
          button
          onClick={() => handleItemClick(2)}
          sx={{
            borderLeft: selectedItem === 2 ? "4px solid #9B41F7" : "none",
            transition: "border-left 0.3s ease, background-color 0.3s ease",
            "&:hover": {
              backgroundColor: "#2E2A32",
              borderLeft: "4px solid #9B41F7",
            },
          }}
        >
          <ListItemIcon>
            <img
              src={
                selectedItem === 2
                  ? "/sidebar/clock-click.png"
                  : "/sidebar/clock.png"
              }
              alt="Top Rated"
              style={{ width: "24px", height: "24px" }}
            />
          </ListItemIcon>
          <ListItemText
            primary="Top Rated"
            sx={{
              fontWeight: selectedItem === 2 ? "bold" : "normal",
              color: selectedItem === 2 ? "white" : "#78828A",
              transition: "color 0.3s ease",
            }}
          />
        </ListItem>

        {/* Coming Soon */}
        <ListItem
          button
          onClick={() => handleItemClick(3)}
          sx={{
            borderLeft: selectedItem === 3 ? "4px solid #9B41f7" : "none",
            transition: "border-left 0.3s ease, background-color 0.3s ease",
            "&:hover": {
              backgroundColor: "#2E2A32",
              borderLeft: "4px solid #9B41F7",
            },
          }}
        >
          <ListItemIcon>
            <img
              src={
                selectedItem === 3
                  ? "/sidebar/timer-click.png"
                  : "/sidebar/timer.png"
              }
              alt="Coming Soon"
              style={{ width: "24px", height: "24px" }}
            />
          </ListItemIcon>
          <ListItemText
            primary="Coming Soon"
            sx={{
              fontWeight: selectedItem === 3 ? "bold" : "normal",
              color: selectedItem === 3 ? "white" : "#78828A",
              transition: "color 0.3s ease",
            }}
          />
        </ListItem>
      </List>

      {/* LIBRARY Section */}
      <Box sx={{ mt: 3, ml: 2 }}>
        <Typography color="#9CA4AB" fontWeight={300} width={67} height={24}>
          LIBRARY
        </Typography>
      </Box>

      <List>
        {/* Recent Played */}
        <ListItem
          button
          onClick={() => handleItemClick(4)}
          sx={{
            borderLeft: selectedItem === 4 ? "4px solid #9B41f7" : "none",
            transition: "border-left 0.3s ease, background-color 0.3s ease",
            "&:hover": {
              backgroundColor: "#2E2A32",
              borderLeft: "4px solid #9B41F7",
            },
          }}
        >
          <ListItemIcon>
            <img
              src={
                selectedItem === 4
                  ? "/sidebar/clock-click.png"
                  : "/sidebar/clock.png"
              }
              alt="Recent Played"
              style={{ width: "24px", height: "24px" }}
            />
          </ListItemIcon>
          <ListItemText
            primary="Recent Played"
            sx={{
              fontWeight: selectedItem === 4 ? "bold" : "normal",
              color: selectedItem === 4 ? "white" : "#78828A",
              transition: "color 0.3s ease",
            }}
          />
        </ListItem>

        {/* Download */}
        <ListItem
          button
          onClick={() => handleItemClick(5)}
          sx={{
            borderLeft: selectedItem === 5 ? " 4px solid #9B41f7" : "none",
            transition: "border-left 0.3s ease, background-color 0.3s ease",
            "&:hover": {
              backgroundColor: "#2E2A32",
              borderLeft: "4px solid #9B41F7",
            },
          }}
        >
          <ListItemIcon>
            <img
              src={
                selectedItem === 5
                  ? "/sidebar/document-download-click.png"
                  : "/sidebar/document-download.png"
              }
              alt="Download"
              style={{ width: "24px", height: "24px" }}
            />
          </ListItemIcon>
          <ListItemText
            primary="Download"
            sx={{
              fontWeight: selectedItem === 5 ? "bold" : "normal",
              color: selectedItem === 5 ? "white" : "#78828A",
              transition: "color 0.3s ease",
            }}
          />
        </ListItem>

        {/* Settings */}
        <ListItem
          button
          onClick={() => handleItemClick(6)}
          sx={{
            borderLeft: selectedItem === 6 ? "4px solid #9B41f7" : "none",
            transition: "border-left 0.3s ease, background-color 0.3s ease",
            "&:hover": {
              backgroundColor: "#2E2A32",
              borderLeft: "4px solid #9B41F7",
            },
          }}
        >
          <ListItemIcon>
            <img
              src={
                selectedItem === 6
                  ? "/sidebar/setting-2-click.png"
                  : "/sidebar/setting-2.png"
              }
              alt="Settings"
              style={{ width: "24px", height: "24px" }}
            />
          </ListItemIcon>
          <ListItemText
            primary="Setting"
            sx={{
              fontWeight: selectedItem === 6 ? "bold" : "normal",
              color: selectedItem === 6 ? "white" : "#78828A",
              transition: "color 0.3s ease",
            }}
          />
        </ListItem>
      </List>

      {/* Dark Mode Toggle */}
      <Box sx={{ marginTop: "auto" }}>
        <List>
          <ListItem>
            <ListItemIcon>
              <img
                src="/sidebar/moon.png"
                alt="Dark Mode"
                style={{ width: "24px", height: "24px" }}
              />
            </ListItemIcon>
            <ListItemText primary="Dark Mode" sx={{ color: "#78828A" }} />
            <Switch
              checked={darkMode}
              onChange={handleDarkModeToggle}
              sx={{
                "& .MuiSwitch-switchBase.Mui-checked": {
                  color: "#9B41F7",
                },
                "& .MuiSwitch-track": {
                  backgroundColor: "#9B41F7",
                },
              }}
            />
          </ListItem>
        </List>
      </Box>
    </Box>
  );
};

export default Sidebar;
