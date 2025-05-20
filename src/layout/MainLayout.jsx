import { Box } from "@mui/material";
import React from "react";
import { Outlet } from "react-router-dom";
import MainHeader from "./MainHeader";
import MainFooter from "./MainFooter";

const MainLayout = () => {
  return (
    <Box>
      {/* Header cố định trên đầu */}
      <Box
        sx={{
          position: "fixed",
          top: 0,
          left: 0,
          right: 0,
          zIndex: 1100,
        }}
      >
        <MainHeader />
      </Box>

      {/* Phần nội dung chính, có padding top để tránh bị header che khuất */}
      <Box sx={{ pt: "64px" }}>
        <Outlet />
      </Box>

      {/* Footer nằm dưới cùng, không cần cố định */}
      <MainFooter />
    </Box>
  );
};

export default MainLayout;
