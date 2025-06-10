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

const Sidebar = () => {
  const [selectedItem, setSelectedItem] = useState(null);
  const { isDark, toggleTheme } = useContext(ThemeContext);
  const theme = useTheme();

  /* ---------- helper cho màu ---------- */
  const inactiveText = theme.palette.text.secondary;
  const hoverBg = isDark ? "#2E2A32" : alpha(theme.palette.primary.main, 0.06);
  const selectedBg = isDark ? "#2E2A32" : alpha("#9B41F7", 0.1);
  const selectedText = theme.palette.text.primary;

  const handleItemClick = (index) => setSelectedItem(index);

  /* ---------- 1 hàm tiện làm style chung ---------- */
  const itemSx = (index) => ({
    borderLeft:
      selectedItem === index ? `4px solid #9B41F7` : "4px solid transparent",
    bgcolor: selectedItem === index ? selectedBg : "transparent",
    "&:hover": {
      bgcolor: hoverBg,
      borderLeft: `4px solid #9B41F7`,
    },
    transition: "all .24s ease",
    cursor: "pointer",
    pl: "10px",
  });

  const txtSx = (index) => ({
    fontWeight: selectedItem === index ? 600 : 400,
    color: selectedItem === index ? selectedText : inactiveText,
    transition: "color .24s ease",
  });

  return (
    <Box
      sx={{
        width: 270,
        height: "100%",
        bgcolor: theme.palette.background.paper,
        color: inactiveText,
        display: "flex",
        flexDirection: "column",
        p: "20px 10px",
        borderRight: `1px solid ${alpha(theme.palette.text.primary, 0.08)}`,
        transition: "background-color .3s ease",
      }}
    >
      {/* ---------- MENU title ---------- */}
      <Typography
        sx={{ ml: 2 }}
        fontSize={12}
        fontWeight={500}
        color={inactiveText}
      >
        MENU
      </Typography>

      {/* ---------- MENU Items ---------- */}
      <List dense disablePadding>
        {[
          { id: 1, label: "Discovery", icon: "discover" },
          { id: 2, label: "Top Rated", icon: "clock" },
          { id: 3, label: "Coming Soon", icon: "timer" },
        ].map(({ id, label, icon }) => (
          <ListItem
            key={id}
            onClick={() => handleItemClick(id)}
            sx={itemSx(id)}
          >
            <ListItemIcon>
              <img
                src={
                  selectedItem === id
                    ? `/sidebar/${icon}-click${""}.png`
                    : `/sidebar/${icon}.png`
                }
                width={24}
                height={24}
                alt={label}
              />
            </ListItemIcon>
            <ListItemText primary={label} sx={txtSx(id)} />
          </ListItem>
        ))}
      </List>

      {/* ---------- LIBRARY title ---------- */}
      <Box mt={3} ml={2}>
        <Typography fontSize={12} fontWeight={500} color={inactiveText}>
          LIBRARY
        </Typography>
      </Box>

      {/* ---------- LIBRARY Items ---------- */}
      <List dense disablePadding>
        {[
          { id: 4, label: "Recent Played", icon: "clock" },
          { id: 5, label: "Download", icon: "document-download" },
          { id: 6, label: "Setting", icon: "setting-2" },
        ].map(({ id, label, icon }) => (
          <ListItem
            key={id}
            onClick={() => handleItemClick(id)}
            sx={itemSx(id)}
          >
            <ListItemIcon>
              <img
                src={
                  selectedItem === id
                    ? `/sidebar/${icon}-click${""}.png`
                    : `/sidebar/${icon}.png`
                }
                width={24}
                height={24}
                alt={label}
              />
            </ListItemIcon>
            <ListItemText primary={label} sx={txtSx(id)} />
          </ListItem>
        ))}
      </List>

      {/* ---------- FOOTER: Toggle Dark Mode ---------- */}
      <Box mt="auto">
        <List dense disablePadding>
          <ListItem sx={{ pl: 0 }}>
            <ListItemIcon>
              <img
                src="/sidebar/moon.png"
                width={24}
                height={24}
                alt="Dark Mode"
              />
            </ListItemIcon>
            <ListItemText primary="Dark Mode" sx={{ color: inactiveText }} />
            <Switch
              checked={isDark}
              onChange={toggleTheme}
              sx={{
                "& .MuiSwitch-switchBase.Mui-checked": { color: "#9B41F7" },
                "& .MuiSwitch-track": { backgroundColor: "#9B41F7" },
              }}
            />
          </ListItem>
        </List>
      </Box>
    </Box>
  );
};

export default Sidebar;
