import logo from "../../public/images/PandaLogo.png";
import { Box, Button, Typography, Modal } from "@mui/material";
import React, { useState } from "react";
import RegisterPage from "../pages/RegisterPage";
import LoginPage from "../pages/LoginPage";
import { useLocation, useNavigate } from "react-router-dom";

const styleModal = {
  position: "fixed",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  bgcolor: "background.paper",
  borderRadius: 2,
  boxShadow: 24,
  p: 4,
  width: 360,
  outline: "none",
};

const MainHeader = () => {
  const [openLogin, setOpenLogin] = useState(false);
  const [openRegister, setOpenRegister] = useState(false);
  const location = useLocation();

  const navigate = useNavigate();
  const handleOpenLogin = () => {
    setOpenRegister(false);
    setOpenLogin(true);
  };
  const isDetailPage = location.pathname.startsWith("/movies/");
  const handleOpenRegister = () => {
    setOpenLogin(false);
    setOpenRegister(true);
  };

  const handleClose = () => {
    setOpenLogin(false);
    setOpenRegister(false);
  };

  return (
    <>
      <Box
        component="header"
        display="flex"
        justifyContent="space-between"
        alignItems="center"
        px={4}
        py={0.15}
        bgcolor={isDetailPage ? "transparent" : "#d50032"}
        boxShadow={isDetailPage ? "none" : "0 2px 6px rgb(0 0 0 / 0.2)"}
        position="sticky"
        top={0}
        zIndex={1100}
      >
        {/* Logo */}
        <Box
          onClick={() => navigate("/")}
          component="img"
          src={logo}
          alt="Panda Cinema Logo"
          sx={{ height: 90, cursor: "pointer", userSelect: "none" }}
        />

        {/* Menu */}
        <Box
          component="nav"
          display="flex"
          gap={4}
          sx={{ flexGrow: 1, justifyContent: "center" }}
        >
          {["Rạp chiếu", "Phim", "Giới thiệu", "Trợ giúp"].map((item) => (
            <Typography
              key={item}
              variant="subtitle1"
              component="a"
              href="#"
              sx={{
                color: "white",
                fontWeight: 600,
                textDecoration: "none",
                cursor: "pointer",
                px: 1,
                py: 0.5,
                borderRadius: 1,
                transition: "background-color 0.3s ease",
                "&:hover": { backgroundColor: "rgba(255, 255, 255, 0.2)" },
              }}
            >
              {item}
            </Typography>
          ))}
        </Box>

        {/* SignIn/SignUp */}
        <Box display="flex" gap={2} alignItems="center">
          <Button
            onClick={handleOpenLogin}
            variant="text"
            sx={{
              color: "white",
              fontWeight: 600,
              textTransform: "none",
              "&:hover": { backgroundColor: "rgba(255, 255, 255, 0.15)" },
            }}
          >
            Đăng nhập
          </Button>
          <Button
            onClick={handleOpenRegister}
            variant="contained"
            sx={{
              backgroundColor: "#FFD700",
              color: "#d50032",
              fontWeight: 700,
              textTransform: "none",
              px: 3,
              py: 1,
              borderRadius: 2,
              position: "relative",
              overflow: "hidden",
              boxShadow: "0 6px 12px rgba(255, 215, 0, 0.7)",
              transition: "transform 0.3s ease, background-color 0.3s ease",
              "&:hover": {
                backgroundColor: "#ffec3d",
                transform: "scale(1.05)",
                boxShadow: "0 8px 16px rgba(255, 236, 61, 0.9)",
              },
              "&::before": {
                content: '""',
                position: "absolute",
                top: 0,
                right: "-75%",
                width: "50%",
                height: "100%",
                background:
                  "linear-gradient(120deg, rgba(255,255,255,0.6) 0%, rgba(255,255,255,0.2) 60%, rgba(255,255,255,0.6) 100%)",
                transform: "skewX(-25deg)",
                transition: "right 0.7s ease",
                zIndex: 2,
              },
              "&:hover::before": {
                right: "125%",
              },
            }}
          >
            Đăng ký
          </Button>
        </Box>
      </Box>

      {/* Modal Đăng nhập */}
      <Modal
        open={openLogin}
        onClose={handleClose}
        sx={{ backdropFilter: "blur(3px)" }}
      >
        <Box sx={styleModal}>
          <LoginPage
            onClose={handleClose}
            onSwitch={() => {
              setOpenLogin(false);
              setOpenRegister(true);
            }}
          />
        </Box>
      </Modal>

      {/* Modal Đăng ký */}
      <Modal
        open={openRegister}
        onClose={handleClose}
        sx={{ backdropFilter: "blur(3px)" }}
      >
        <Box sx={styleModal}>
          <RegisterPage
            onClose={handleClose}
            onSwitch={() => {
              setOpenRegister(false);
              setOpenLogin(true);
            }}
          />
        </Box>
      </Modal>
    </>
  );
};

export default MainHeader;
