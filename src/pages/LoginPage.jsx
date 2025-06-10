import React, { useEffect, useState } from "react";
import {
  Box,
  Typography,
  Button,
  TextField,
  Divider,
  IconButton,
  InputAdornment,
  Link,
} from "@mui/material";
import GoogleIcon from "@mui/icons-material/Google";
import FacebookIcon from "@mui/icons-material/Facebook";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import VisibilityIcon from "@mui/icons-material/Visibility";
import { motion } from "framer-motion";
import { fadeIn } from "../animations/motionVariants";
import MacBookPro from "/images/register/MacBook Pro 16.svg";

const LoginPage = () => {
  const [showPassword, setShowPassword] = useState(false);
  const togglePassword = () => setShowPassword((prev) => !prev);
  const [activeIndex, setActiveIndex] = useState(0);

  const contents = [
    {
      title: "The biggest international and local film streaming",
      subtitle:
        "Enjoy exclusive releases, trending hits, and timeless classics from around the world.",
    },
    {
      title: "Watch anytime, anywhere in full HD",
      subtitle:
        "Stream on your phone, tablet, or laptop – anytime you want, ad-free.",
    },
    {
      title: "Create your own watchlist and never miss a show",
      subtitle:
        "Save your favorites and pick up right where you left off, effortlessly.",
    },
  ];

  // Auto slide text
  useEffect(() => {
    const iv = setInterval(
      () => setActiveIndex((i) => (i + 1) % contents.length),
      4000
    );
    return () => clearInterval(iv);
  }, []);

  return (
    <Box
      component="main"
      sx={{
        width: "100%",
        height: "",
        display: "flex",
        position: "relative",
        overflow: "visible",
      }}
    >
      {/* ——— Left Banner ——— */}
      <Box
        sx={{
          flex: 1,
          position: "relative",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          background: "linear-gradient(180deg, #C945F3 0%, #9B41F7 100%)",
          px: { xs: 4, md: 10 },
          color: "common.white",
          overflow: "hidden",
        }}
      >
        {/* Laptop mock-up nằm phía sau, tràn sâu hơn */}
        <Box
          component="img"
          src={MacBookPro}
          alt="CineMax preview"
          sx={{
            position: "absolute",
            bottom: { xs: -40, md: -100 },
            transform: "Scale(1.5)",
            right: { xs: -20, md: -140 },
            width: { xs: "120%", md: "100%" },
            maxWidth: { md: 700 },
            pointerEvents: "none",
            zIndex: 1,
          }}
        />

        {/* Text & Dots luôn nằm trên laptop */}
        <Box sx={{ position: "relative", zIndex: 2, mb: { xs: 10, md: 50 } }}>
          <motion.div
            variants={fadeIn}
            initial="hidden"
            animate="visible"
            custom={0.2}
          >
            <Typography
              variant="h4"
              fontWeight={800}
              gutterBottom
              sx={{ lineHeight: 1.4 }}
            >
              {contents[activeIndex].title}
            </Typography>
            <Typography
              variant="body1"
              sx={{ opacity: 0.85, fontSize: "1rem", lineHeight: 1.8 }}
              mb={4}
            >
              {contents[activeIndex].subtitle}
            </Typography>
          </motion.div>

          <Box sx={{ display: "flex", gap: 1, mt: 1 }}>
            {contents.map((_, idx) => (
              <Box
                key={idx}
                sx={{
                  width: activeIndex === idx ? 16 : 4,
                  height: 4,
                  borderRadius: activeIndex === idx ? 2 : "50%",
                  bgcolor:
                    activeIndex === idx
                      ? "common.white"
                      : "rgba(255,255,255,0.4)",
                  transition: "all 0.3s ease",
                }}
              />
            ))}
          </Box>
        </Box>
      </Box>

      {/* ——— Right Form ——— */}
      <Box
        sx={{
          flex: 1,
          position: "relative",
          zIndex: 3, // cao nhất để đè lên laptop
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: "#0B0B0F",
          px: { xs: 4, md: 10 },
        }}
      >
        <Box sx={{ width: "100%", maxWidth: { xs: "100%", sm: 500 } }}>
          <Typography
            variant="h6"
            color="common.white"
            textAlign="center"
            mb={4}
            fontWeight={600}
          >
            CineMax
          </Typography>
          <Typography
            variant="h4"
            color="common.white"
            textAlign="center"
            fontWeight={700}
            mb={4}
          >
            Hey there, <br /> welcome back
          </Typography>

          {/* Social login */}
          <Button
            fullWidth
            startIcon={<GoogleIcon />}
            sx={{
              mb: 2,
              py: 1.4,
              textTransform: "none",
              borderRadius: 999,
              color: "common.white",
              bgcolor: "#1F1F25",
              "&:hover": { bgcolor: "#2A2A31" },
            }}
          >
            Login with Google
          </Button>
          <Button
            fullWidth
            startIcon={<FacebookIcon />}
            sx={{
              mb: 3,
              py: 1.4,
              textTransform: "none",
              borderRadius: 999,
              color: "common.white",
              bgcolor: "#1F1F25",
              "&:hover": { bgcolor: "#2A2A31" },
            }}
          >
            Login with Facebook
          </Button>

          <Divider
            sx={{
              mb: 3,
              color: "rgba(255,255,255,0.4)",
              "&::before, &::after": { borderColor: "rgba(255,255,255,0.1)" },
            }}
          >
            <Typography
              variant="caption"
              sx={{ color: "rgba(255,255,255,0.5)", fontSize: 13 }}
            >
              Or login with
            </Typography>
          </Divider>

          {/* Full Name */}
          <Typography
            variant="subtitle2"
            color="rgba(255,255,255,0.6)"
            fontWeight={500}
          >
            Full Name
          </Typography>
          <TextField
            fullWidth
            label="Enter your name"
            placeholder="Enter your name"
            variant="outlined"
            margin="normal"
            InputProps={{
              sx: {
                color: "common.white",
                bgcolor: "#1A161F",
                borderRadius: 999,
                px: 2,
              },
            }}
            InputLabelProps={{ sx: { color: "rgba(255,255,255,0.6)" } }}
          />

          {/* Password */}
          <Typography
            variant="subtitle2"
            color="rgba(255,255,255,0.6)"
            fontWeight={500}
            mt={2}
          >
            Password
          </Typography>
          <TextField
            fullWidth
            label="Enter your password"
            placeholder="Enter your password"
            variant="outlined"
            type={showPassword ? "text" : "password"}
            margin="normal"
            InputProps={{
              sx: {
                color: "common.white",
                bgcolor: "#1A161F",
                borderRadius: 999,
                px: 2,
              },
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton onClick={togglePassword} edge="end">
                    {showPassword ? (
                      <VisibilityIcon sx={{ color: "rgba(255,255,255,0.6)" }} />
                    ) : (
                      <VisibilityOffIcon
                        sx={{ color: "rgba(255,255,255,0.6)" }}
                      />
                    )}
                  </IconButton>
                </InputAdornment>
              ),
            }}
            InputLabelProps={{ sx: { color: "rgba(255,255,255,0.6)" } }}
          />

          <Box textAlign="right" mb={3}>
            <Link
              href="/auth/reset"
              underline="none"
              sx={{ color: "#B43FEB", fontSize: 14 }}
            >
              Forgot Password
            </Link>
          </Box>

          <Button
            fullWidth
            variant="contained"
            sx={{
              py: 1.6,
              textTransform: "none",
              fontWeight: 600,
              borderRadius: 999,
              fontSize: "1rem",
              bgcolor: "#9B41F7",
              "&:hover": { bgcolor: "#A251FF" },
            }}
          >
            Login
          </Button>

          <Typography
            variant="body2"
            color="common.white"
            textAlign="center"
            mt={3}
          >
            Don’t have an account?{" "}
            <Link
              href="/auth/register"
              underline="none"
              sx={{ color: "#B43FEB" }}
            >
              Register
            </Link>
          </Typography>
        </Box>
      </Box>
    </Box>
  );
};

export default LoginPage;
