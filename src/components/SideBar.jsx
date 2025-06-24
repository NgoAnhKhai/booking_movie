import React, { useContext, useState } from "react";
import {
  Box,
  Typography,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
  Switch,
  useTheme,
  alpha,
} from "@mui/material";
import { ThemeContext } from "../context/UseTheme";
import { useNavigate } from "react-router-dom";

const Sidebar = () => {
  const [selectedItem, setSelectedItem] = useState(1);
  const { isDark, toggleTheme } = useContext(ThemeContext);
  const theme = useTheme();
  const navigate = useNavigate();

  const purple = "#9B41F7";
  const neonGlow = `0 0 8px ${alpha(purple, 0.9)}, 0 0 16px ${alpha(
    purple,
    0.3
  )}`;
  const hoverBg = isDark
    ? alpha(purple, 0.11)
    : alpha(theme.palette.primary.main, 0.06);
  const selectedBg = isDark
    ? `linear-gradient(90deg, ${alpha(purple, 0.09)} 60%, transparent)`
    : alpha("#9B41F7", 0.07);

  // Menu và Library items
  const menuItems = [
    { id: 1, label: "Discovery", icon: "discover", path: "/" },
    { id: 2, label: "Top Rated", icon: "clock", path: "/top-rated" },
    { id: 3, label: "Coming Soon", icon: "timer", path: "/coming-soon" },
  ];
  const libraryItems = [
    { id: 4, label: "Recent Played", icon: "clock", path: "/recent-played" },
    { id: 5, label: "Download", icon: "document-download", path: "/download" },
    { id: 6, label: "Setting", icon: "setting-2", path: "/setting" },
  ];

  // Xử lý click
  const handleItemClick = (item) => {
    setSelectedItem(item.id);
    navigate(item.path);
  };

  // Style cho item
  const itemSx = (id) => ({
    borderRadius: "14px",
    marginBottom: 2,
    boxShadow: selectedItem === id ? neonGlow : "0 0 0px transparent",
    bgcolor: selectedItem === id ? selectedBg : "transparent",
    "&:hover": {
      bgcolor: hoverBg,
      boxShadow: neonGlow,
      transition: "all .18s cubic-bezier(.6,.2,.2,1)",
    },
    borderLeft:
      selectedItem === id ? `4px solid ${purple}` : "4px solid transparent",
    transition: "all .23s cubic-bezier(.6,.2,.2,1)",
    cursor: "pointer",
    pl: "12px",
    py: "6px",
    alignItems: "center",
    minHeight: 52,
    display: "flex",
  });

  // Style cho text
  const txtSx = (id) => ({
    fontWeight: selectedItem === id ? 600 : 400,
    color: selectedItem === id ? "#fff" : theme.palette.text.secondary,
    letterSpacing: 0.2,
    textShadow: selectedItem === id ? `0 0 6px ${alpha(purple, 0.8)}` : "none",
    fontSize: 17,
    ml: 1,
    transition: "color .23s cubic-bezier(.6,.2,.2,1), text-shadow .23s",
  });

  // Style cho icon
  const iconSx = (id) => ({
    filter:
      selectedItem === id
        ? `drop-shadow(0 0 6px ${purple}) brightness(1.2)`
        : `drop-shadow(0 0 1px ${purple})`,
    transition: "filter .25s cubic-bezier(.6,.2,.2,1)",
    width: 28,
    height: 28,
  });

  return (
    <Box
      sx={{
        width: 270,
        borderRadius: "32px",
        height: "100%",
        bgcolor: isDark ? "rgba(18,17,27,0.97)" : "rgba(245,245,255,0.96)",
        color: theme.palette.text.secondary,
        display: "flex",
        flexDirection: "column",
        p: "28px 16px 16px 18px",
        boxShadow:
          "0 4px 24px 0 rgba(80,30,160,0.10), 0 1.5px 6px 0 rgba(140,0,255,0.07)",
        border: `1px solid ${alpha(theme.palette.text.primary, 0.05)}`,
        transition: "background-color .35s cubic-bezier(.6,.2,.2,1)",
        backdropFilter: "blur(2px)",
      }}
    >
      {/* MENU title */}
      <Typography
        sx={{ ml: 2, mb: 1, opacity: 0.86, letterSpacing: 1.5 }}
        fontSize={13}
        fontWeight={700}
      >
        MENU
      </Typography>

      {/* MENU Items */}
      <List dense disablePadding>
        {menuItems.map((item) => (
          <ListItem
            key={item.id}
            onClick={() => handleItemClick(item)}
            sx={itemSx(item.id)}
          >
            <ListItemIcon sx={{ minWidth: 38 }}>
              <img
                src={`/sidebar/${item.icon}.png`}
                alt={item.label}
                style={iconSx(item.id)}
              />
            </ListItemIcon>
            <ListItemText primary={item.label} sx={txtSx(item.id)} />
          </ListItem>
        ))}
      </List>

      {/* LIBRARY title */}
      <Box mt={5} ml={2} mb={1}>
        <Typography
          fontSize={13}
          fontWeight={700}
          opacity={0.8}
          letterSpacing={1.5}
        >
          LIBRARY
        </Typography>
      </Box>

      {/* LIBRARY Items */}
      <List dense disablePadding>
        {libraryItems.map((item) => (
          <ListItem
            key={item.id}
            onClick={() => handleItemClick(item)}
            sx={itemSx(item.id)}
          >
            <ListItemIcon sx={{ minWidth: 38 }}>
              <img
                src={`/sidebar/${item.icon}.png`}
                alt={item.label}
                style={iconSx(item.id)}
              />
            </ListItemIcon>
            <ListItemText primary={item.label} sx={txtSx(item.id)} />
          </ListItem>
        ))}
      </List>

      {/* Toggle Dark Mode */}
      <Box mt="auto" mb={1}>
        <List dense disablePadding>
          <ListItem sx={{ pl: 0 }}>
            <ListItemIcon sx={{ minWidth: 38 }}>
              <img
                src="/sidebar/moon.png"
                alt="Dark Mode"
                style={{
                  filter: isDark
                    ? `drop-shadow(0 0 8px ${purple}) brightness(1.4)`
                    : "none",
                  width: 26,
                  height: 26,
                }}
              />
            </ListItemIcon>
            <ListItemText
              primary="Dark Mode"
              sx={{
                color: isDark ? "#fff" : theme.palette.text.secondary,
                fontWeight: 500,
                fontSize: 15,
              }}
            />
            <Switch
              checked={isDark}
              onChange={toggleTheme}
              sx={{
                "& .MuiSwitch-switchBase.Mui-checked": { color: purple },
                "& .MuiSwitch-track": { backgroundColor: purple },
              }}
            />
          </ListItem>
        </List>
      </Box>
    </Box>
  );
};

export default Sidebar;
