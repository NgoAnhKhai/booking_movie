import React, { useContext, useState } from "react";
import {
  Box,
  Typography,
  IconButton,
  Button,
  TextField,
  InputAdornment,
  Menu,
  MenuItem,
  useTheme,
} from "@mui/material";
import NotificationsIcon from "@mui/icons-material/Notifications";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import "inter-ui";
import { ThemeContext } from "../context/UseTheme";
import { useNavigate } from "react-router-dom";
const Header = () => {
  const [anchorEl, setAnchorEl] = useState(null);
  const [isFocused, setIsFocused] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const theme = useTheme();
  const { isDark } = useContext(ThemeContext);
  const navigate = useNavigate();
  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value);
  };

  const handleMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };
  const handleLogout = () => {
    // Xử lý đăng xuất ở đây
    navigate("/auth/login");
  };

  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        bgcolor: isDark
          ? theme.palette.background.default
          : theme.palette.background.paper,
        padding: "10px 20px",
        width: "100%",
        height: "72px",
        fontFamily: "Inter, sans-serif",
      }}
    >
      {/* Logo */}
      <Typography variant="h6" color="text.primary" fontWeight={600}>
        CineMax
      </Typography>

      {/* Menu */}
      <Box sx={{ display: "flex", gap: 4 }}>
        {["Movies", "Series", "Animation", "Genres"].map((label) => (
          <Typography
            key={label}
            variant="body1"
            color="text.primary"
            sx={{
              cursor: "pointer",
              "&:hover": { color: theme.palette.primary.main },
            }}
          >
            {label}
          </Typography>
        ))}
      </Box>

      {/* Right Side (Search, Subscribe, Notifications, Account) */}
      <Box sx={{ display: "flex", alignItems: "center", gap: 3 }}>
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
                    width: 24,
                    height: 24,
                    cursor: "pointer",
                    // Light mode: invert để thành đen; Dark mode: giữ trắng
                    filter: isDark ? "none" : "invert(1)",
                  }}
                  onClick={() => console.log("Search icon clicked!")}
                />
              </InputAdornment>
            ),
          }}
          sx={{
            // nền khi blur = background.default (sáng nhạt/đen nhạt)
            // khi focus = background.paper (trắng/đen đậm hơn)
            backgroundColor: isFocused
              ? theme.palette.background.paper
              : theme.palette.background.default,
            borderRadius: "24px",
            width: isFocused ? 300 : 250,
            transition:
              "width 0.3s ease-in-out, background-color 0.3s ease-in-out",
            px: 1, // padding ngang cho input
            // text và con trỏ sẽ tự động tương phản
            "& .MuiInputBase-input": {
              color: theme.palette.text.primary,
            },
            // gỡ mọi viền của OutlinedInput
            "& .MuiOutlinedInput-root": {
              "& fieldset": { border: "none" },
              "&:hover fieldset": { border: "none" },
              "&.Mui-focused fieldset": { border: "none" },
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
          <NotificationsIcon sx={{ color: theme.palette.text.primary }} />
        </IconButton>

        {/* Account with dropdown */}
        <Box sx={{ display: "flex", alignItems: "center" }}>
          <IconButton onClick={handleMenuOpen} sx={{ p: 0 }}>
            <AccountCircleIcon
              sx={{
                color: theme.palette.text.primary,
                fontSize: 32,
              }}
            />
          </IconButton>
          <ArrowDropDownIcon sx={{ color: theme.palette.text.primary }} />
        </Box>

        {/* Dropdown menu */}
        <Menu
          anchorEl={anchorEl}
          open={Boolean(anchorEl)}
          onClose={handleMenuClose}
          sx={{ mt: 4 }}
          PaperProps={{
            sx: {
              // nền menu tự động trắng khi light, tối khi dark
              backgroundColor: theme.palette.background.paper,
              // text menu lấy màu chủ đạo
              color: theme.palette.text.primary,
            },
          }}
        >
          <MenuItem onClick={handleMenuClose}>Profile</MenuItem>
          <MenuItem onClick={handleMenuClose}>Settings</MenuItem>
          <MenuItem onClick={handleLogout}>Logout</MenuItem>
        </Menu>
      </Box>
    </Box>
  );
};

export default Header;
