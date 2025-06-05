import React, { useState } from "react";
import {
  Box,
  Typography,
  IconButton,
  Button,
  TextField,
  InputAdornment,
  Menu,
  MenuItem,
} from "@mui/material";
import NotificationsIcon from "@mui/icons-material/Notifications";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import "inter-ui";
const Header = () => {
  const [darkMode, setDarkMode] = useState(true);
  const [anchorEl, setAnchorEl] = useState(null);
  const [isFocused, setIsFocused] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value);
  };

  const handleMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        bgcolor: "#0D0C0F",
        padding: "10px 20px",
        width: "100%",
        height: "72px",
        fontFamily: "Inter, sans-serif",
      }}
    >
      {/* Logo */}
      <Typography variant="h6" color="common.white" fontWeight={600}>
        CineMax
      </Typography>

      {/* Menu */}
      <Box sx={{ display: "flex", gap: "30px" }}>
        <Typography variant="body1" color="common.white">
          Movies
        </Typography>
        <Typography variant="body1" color="common.white">
          Series
        </Typography>
        <Typography variant="body1" color="common.white">
          Animation
        </Typography>
        <Typography variant="body1" color="common.white">
          Genres
        </Typography>
      </Box>

      {/* Right Side (Search, Subscribe, Notifications, Account) */}
      <Box sx={{ display: "flex", alignItems: "center", gap: "20px" }}>
        {/* Search */}
        <TextField
          variant="outlined"
          value={searchQuery}
          onChange={handleSearchChange}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <img
                  src="/images/search/Search.svg"
                  alt="search"
                  style={{
                    width: "24px",
                    height: "24px",
                    cursor: "pointer",
                  }}
                  onClick={() => console.log("Search icon clicked!")}
                />
              </InputAdornment>
            ),
          }}
          sx={{
            backgroundColor: isFocused ? "#1A161F" : "#0D0D0D",
            borderRadius: 24,
            width: isFocused ? "300px" : "250px",
            paddingRight: "10px",
            transition: "width 0.3s ease-in-out",
            "& .MuiInputBase-input": { color: "white" },
            "& .MuiOutlinedInput-root": {
              "& fieldset": {
                border: "none",
              },
            },
            "& .MuiOutlinedInput-notchedOutline": {
              border: "none",
            },
          }}
        />

        {/* Subscribe */}
        <Button
          sx={{
            bgcolor: "#B43FEB",
            color: "#fff",
            borderRadius: 24,
            padding: "6px 24px",
            textTransform: "none",
            height: "40px",
            width: "128px",
            fontWeight: "bold",
          }}
        >
          Subscribe
        </Button>
        {/* Notifications */}
        <IconButton>
          <NotificationsIcon sx={{ color: "#fff" }} />
        </IconButton>

        {/* Account with dropdown */}
        <Box sx={{ display: "flex", alignItems: "center" }}>
          <IconButton onClick={handleMenuOpen} sx={{ padding: 0 }}>
            <AccountCircleIcon sx={{ color: "#fff", fontSize: "32px" }} />
          </IconButton>
          <ArrowDropDownIcon sx={{ color: "#fff" }} />
        </Box>

        {/* Dropdown menu */}
        <Menu
          anchorEl={anchorEl}
          open={Boolean(anchorEl)}
          onClose={handleMenuClose}
          sx={{ marginTop: "35px" }}
        >
          <MenuItem onClick={handleMenuClose}>Profile</MenuItem>
          <MenuItem onClick={handleMenuClose}>Settings</MenuItem>
          <MenuItem onClick={handleMenuClose}>Logout</MenuItem>
        </Menu>
      </Box>
    </Box>
  );
};

export default Header;
