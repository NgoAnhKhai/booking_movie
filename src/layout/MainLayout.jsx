import { Box } from "@mui/material";
import React from "react";
import { Outlet } from "react-router-dom";
import MainHeader from "./MainHeader";
import Sidebar from "../components/SideBar";

const MainLayout = () => {
  return (
    <Box sx={{ display: "flex", flexDirection: "column", height: "100vh" }}>
      <Box
        sx={{
          top: 0,
          left: 0,
          right: 0,
          zIndex: 1100,
          width: "100%",
        }}
      >
        <MainHeader />
      </Box>

      <Box
        sx={{
          display: "flex",
          flexDirection: "row",
          position: "sticky",
          bgcolor: "#0D0C0F",
          height: "100vh",
          zIndex: 1000,
          minWidth: "270px",
        }}
      >
        <Sidebar />

        <Box
          sx={{
            ml: "250px",
            pt: "72px",
            width: "100%",
            overflowY: "auto",
          }}
        >
          <Outlet />
        </Box>
      </Box>
    </Box>
  );
};

export default MainLayout;
