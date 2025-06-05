import React, { useEffect, useState } from "react";
import {
  Box,
  Grid,
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
import {
  fadeIn,
  slideUp,
  staggerContainer,
} from "../animations/motionVariants";
import MacBookPro from "/images/register/MacBook Pro 16.svg";
const LoginPage = () => {
  const [showPassword, setShowPassword] = React.useState(false);
  const togglePassword = () => setShowPassword((prev) => !prev);
  const [activeDot, setActiveDot] = useState(0);
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

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % contents.length);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveDot((prev) => (prev + 1) % 3);
    }, 4000);

    return () => clearInterval(interval);
  }, []);

  return (
    <Box
      component="main"
      sx={{
        position: "fixed",
        inset: 0,
        width: "100vw",
        height: "100vh",
        display: "flex",
        overflow: "hidden",
      }}
    >
      <Grid container columns={12} sx={{ width: "100%", height: "100%" }}>
        {/* ——— Left Banner ——— */}
        <Grid
          item
          xs={12}
          lg={6}
          sx={{
            background: "linear-gradient(180deg, #C945F3 0%, #9B41F7 100%)",
            position: "relative",
            display: "flex",
            width: "100vh",
            flexDirection: "column",
            justifyContent: "center",
            px: { xs: 4, lg: 10 },
          }}
        >
          <Box
            maxWidth="100%"
            pr={{ xs: 5, md: 6 }}
            zIndex={1}
            mb={{ xs: 10, md: 70 }}
          >
            {/* Title */}
            <motion.div
              variants={fadeIn}
              initial="hidden"
              animate="visible"
              custom={0.2}
            >
              <Typography
                variant="h4"
                fontWeight={800}
                color="common.white"
                gutterBottom
                sx={{ lineHeight: 1.4 }}
              >
                {contents[activeIndex].title}
              </Typography>

              {/* Subtitle */}
              <Typography
                variant="body1"
                color="common.white"
                sx={{ opacity: 0.85, fontSize: "1rem", lineHeight: 1.8 }}
                mb={4}
              >
                {contents[activeIndex].subtitle}
              </Typography>
            </motion.div>

            {/* Dots */}
            <Box sx={{ display: "flex", gap: 1, mt: 1 }}>
              {[0, 1, 2].map((index) => (
                <Box
                  key={index}
                  sx={{
                    width: activeIndex === index ? 16 : 4,
                    height: 4,
                    borderRadius: activeIndex === index ? 2 : "50%",
                    transition: "all 0.3s ease",
                    bgcolor:
                      activeIndex === index
                        ? "common.white"
                        : "rgba(255,255,255,0.4)",
                  }}
                />
              ))}
            </Box>
          </Box>
          {/* Laptop mock‑up */}
          <Box
            component="img"
            src={MacBookPro}
            alt="CineMax preview on devices"
            sx={{
              position: "absolute",
              bottom: { xs: -120, lg: -200 },
              right: { xs: -40, lg: 0 },
              width: { xs: "120%", lg: "95%" },
              maxWidth: 820,
              transform: "none",
              pointerEvents: "none",
              transform: "scale(2)",
              zIndex: 0,
            }}
          />
        </Grid>

        {/* ——— Right Form ——— */}
        <Grid
          item
          xs={12}
          lg={6}
          sx={{
            backgroundColor: "#0B0B0F",
            display: "flex",
            width: "969px",
            alignItems: "center",
            justifyContent: "center",
            px: { xs: 4, lg: 10 },
            zIndex: 2,
          }}
        >
          <Box width="100%" maxWidth={420}>
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
                "&::before, &::after": {
                  borderColor: "rgba(255,255,255,0.1)",
                },
              }}
            >
              <Typography
                variant="caption"
                sx={{ color: "rgba(255,255,255,0.5)", fontSize: 13 }}
              >
                Or login with
              </Typography>
            </Divider>

            {/* Full name */}
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
                        <VisibilityIcon
                          sx={{ color: "rgba(255,255,255,0.6)" }}
                        />
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

            <Typography variant="body2" color="white" textAlign="center" mt={3}>
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
        </Grid>
      </Grid>
    </Box>
  );
};

export default LoginPage;
