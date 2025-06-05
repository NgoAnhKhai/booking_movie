import React, { useState } from "react";
import { Box, Typography, TextField, Button, Link } from "@mui/material";
import { motion } from "framer-motion";
import { fadeIn } from "../../animations/motionVariants";

const VerifyAccount = () => {
  const [code, setCode] = useState(["", "", "", ""]);

  const handleChange = (event, index) => {
    const newCode = [...code];
    newCode[index] = event.target.value;
    setCode(newCode);
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
            Verifying Your Account
          </Typography>

          {/* Subtitle */}
          <Typography
            variant="body2"
            color="rgba(255,255,255,0.6)"
            textAlign="center"
            mb={4}
          >
            We have just sent you a 4-digit code via your email
          </Typography>

          {/* Verification Code Input */}
          <Box sx={{ display: "flex", justifyContent: "space-between" }}>
            {code.map((digit, index) => (
              <TextField
                key={index}
                value={digit}
                onChange={(event) => handleChange(event, index)}
                variant="outlined"
                sx={{
                  width: "60px",
                  bgcolor: "#1A161F",
                  borderRadius: "8px",
                  color: "common.white",
                  textAlign: "center",
                  "& .MuiOutlinedInput-root": {
                    "& fieldset": {
                      borderColor: "#9B41F7",
                    },
                    "&:hover fieldset": {
                      borderColor: "#9B76FF",
                    },
                  },
                }}
                inputProps={{ maxLength: 1 }}
              />
            ))}
          </Box>

          {/* Next Button */}
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
            Next
          </Button>

          {/* Resend Link */}
          <Typography variant="body2" color="#fff" textAlign="center" mt={3}>
            Didn’t receive the code?{" "}
            <Link href="#" underline="none" sx={{ color: "#9B76FF" }}>
              Resend
            </Link>
          </Typography>
        </motion.div>
      </Box>
    </Box>
  );
};

export default VerifyAccount;
