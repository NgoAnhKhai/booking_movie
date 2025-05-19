import { Box } from "@mui/material";
import React from "react";
import { Outlet } from "react-router-dom";
import MainHeader from "./MainHeader";
import MainFooter from "./MainFooter";

const MainLayout = () => {
  return (
    <Box >
      <MainHeader/>
        <Outlet /> 
      <MainFooter/>
    </Box>
  );
};

export default MainLayout;
