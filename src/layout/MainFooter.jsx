import React from "react";
import { Box, Typography, Button, Grid } from "@mui/material";
import { Facebook, Instagram, Twitter } from "@mui/icons-material";

const Footer = () => {
  return (
    <Box
      sx={{
        backgroundColor: "#121212", // nền tối hơn
        color: "white",
        padding: "40px 20px",
        marginTop: "30px",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Box
        mb={3}
        sx={{
          backgroundColor: "#FFD700", // Màu vàng
          borderRadius: "50%", // Hình tròn
          width: 120, // Kích thước vòng tròn
          height: 120,
          display: "flex", // Căn giữa logo
          alignItems: "center",
          justifyContent: "center",
          boxShadow: "0 0 10px rgba(255, 215, 0, 0.7)", // Tạo bóng nhẹ cho vòng tròn
        }}
      >
        <img
          src="/public/images/PandaLogo.png"
          alt="Logo"
          style={{ width: "80%", height: "80%", objectFit: "contain" }}
        />
      </Box>

      {/* Links */}
      <Grid container spacing={6} justifyContent="center" mb={3}>
        {["Giới thiệu", "Trợ giúp", "Phim", "Liên hệ"].map((item) => (
          <Grid item key={item}>
            <Button
              color="inherit"
              href="/#"
              sx={{
                fontWeight: "600",
                fontSize: "16px",
                "&:hover": { color: "#FFD700" }, // vàng khi hover
              }}
            >
              {item}
            </Button>
          </Grid>
        ))}
      </Grid>

      {/* Social Media Icons */}
      <Box mb={3} display="flex" flexDirection="column" alignItems="center">
        <Typography variant="body1" color="white" mb={1}>
          Theo dõi chúng tôi
        </Typography>
        <Box display="flex" gap={3}>
          {[Facebook, Instagram, Twitter].map((Icon, idx) => (
            <Icon
              key={idx}
              sx={{
                fontSize: 32,
                cursor: "pointer",
                transition: "color 0.3s ease",
                "&:hover": { color: "#FFD700" },
              }}
            />
          ))}
        </Box>
      </Box>

      {/* Copyright */}
      <Typography variant="body2" color="white" sx={{ fontSize: 12 }}>
        © 2025 Pandarama Cinema. Tất cả các quyền được bảo vệ.
      </Typography>
    </Box>
  );
};

export default Footer;
