import React, { useState } from "react";
import { Box, Typography, TextField, Button, Link } from "@mui/material";
import { motion } from "framer-motion";
import { fadeIn } from "../../animations/motionVariants";

const ResetPassword = () => {
  const [email, setEmail] = useState("");

  const handleChange = (event) => {
    setEmail(event.target.value);
  };

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
      {/* Centered Form */}
      <Box
        sx={{
          width: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          bgcolor: "#0B0B0F",
          px: { xs: 4, lg: 10 },
          zIndex: 2,
        }}
      >
        <motion.div
          variants={fadeIn}
          initial="hidden"
          animate="visible"
          custom={0.5}
          style={{
            width: "100%",
            maxWidth: 420,
            borderRadius: 8,
            border: "2px solid #9B41F7", // Border added around the form
            padding: "40px", // Padding added for spacing
          }}
        >
          {/* CineMax Header */}
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
            Reset Password
          </Typography>

          {/* Email Address Field */}
          <Typography
            variant="subtitle2"
            color="rgba(255,255,255,0.6)"
            mb={0.5}
          >
            Email Address
          </Typography>
          <TextField
            fullWidth
            placeholder="Enter your email address"
            variant="outlined"
            value={email}
            onChange={handleChange}
            InputProps={{
              sx: {
                color: "common.white",
                bgcolor: "#1A161F",
                borderRadius: 999,
                px: 2,
              },
            }}
            InputLabelProps={{ shrink: false }}
          />

          {/* Reset Password Button */}
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
              mt: 4,
              "&:hover": { bgcolor: "#A251FF" },
            }}
          >
            Reset Password
          </Button>

          {/* Login Link */}
          <Typography variant="body2" color="#fff" textAlign="center" mt={3}>
            Remember your password?{" "}
            <Link href="/auth/login" underline="none" sx={{ color: "#9B76FF" }}>
              Login
            </Link>
          </Typography>
        </motion.div>
      </Box>
    </Box>
  );
};

export default ResetPassword;
