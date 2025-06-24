import { Box, useTheme } from "@mui/material";
import React from "react";
import { Outlet } from "react-router-dom";
import MainHeader from "./MainHeader";
import Sidebar from "../components/SideBar";

const MainLayout = () => {
  const theme = useTheme();
  return (
    <Box sx={{ display: "flex", flexDirection: "column", height: "100vh" }}>
      <Box
        sx={{
          top: 0,
          left: 0,
          right: 0,
          zIndex: 1100,
          width: "100%",
          bgcolor: theme.palette.background.paper,
        }}
      >
        <MainHeader />
      </Box>

      <Box
        sx={{
          display: "flex",
          flexDirection: "row",
          position: "sticky",
          minHeight: "100vh",
          height: "100%",
          zIndex: 1000,
          minWidth: "270px",
        }}
      >
        <Sidebar />

        <Box
          sx={{
            bgcolor: theme.palette.background.default,
            width: "100%",
            overflowY: "auto",
            pl: { xs: 1, md: 4 },
            pr: 0,
            pt: 0,
            pb: 0,
            minHeight: "100vh",
          }}
        >
          <Outlet />
        </Box>
      </Box>
    </Box>
  );
};

export default MainLayout;
