import React, { useState } from "react";
import {
  Box,
  Typography,
  TextField,
  Button,
  IconButton,
  InputAdornment,
} from "@mui/material";
import { motion } from "framer-motion";
import { fadeIn } from "../../animations/motionVariants";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";

const CreateNewPassword = () => {
  const [password, setPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);

  const handlePasswordChange = (event) => setPassword(event.target.value);
  const handleNewPasswordChange = (event) => setNewPassword(event.target.value);

  const togglePasswordVisibility = () => setShowPassword((prev) => !prev);
  const toggleNewPasswordVisibility = () => setShowNewPassword((prev) => !prev);

  return (
    <Box
      component="main"
      sx={{
        position: "fixed",
        inset: 0,
        width: "100vw",
        height: "100vh",
        display: "flex",
        flexDirection: "column",
        justifyContent: "flex-start", // Adjust to make the content higher
        bgcolor: "#0B0B0F",
        paddingTop: "40px", // Increased space for header
      }}
    >
      {/* CineMax Header with Border */}
      <Box
        sx={{
          textAlign: "center",
          borderBottom: "1px solid rgba(255, 255, 255, 0.2)",
          paddingBottom: "20px",
          marginBottom: "20px", // Reduced margin to move content up
        }}
      >
        <Typography variant="h6" color="common.white" fontWeight={600}>
          CineMax
        </Typography>
      </Box>

      {/* Centered Form */}
      <Box
        sx={{
          width: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
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
            padding: "40px", // Padding for spacing
          }}
        >
          <Typography
            variant="h4"
            color="common.white"
            textAlign="center"
            fontWeight={700}
            mb={4}
          >
            Create New Password
          </Typography>

          {/* Password Field */}
          <Typography
            variant="subtitle2"
            color="rgba(255,255,255,0.6)"
            mb={0.5}
          >
            Password
          </Typography>
          <TextField
            fullWidth
            placeholder="Enter your password"
            variant="outlined"
            type={showPassword ? "text" : "password"}
            value={password}
            onChange={handlePasswordChange}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton onClick={togglePasswordVisibility}>
                    {showPassword ? <VisibilityOffIcon /> : <VisibilityIcon />}
                  </IconButton>
                </InputAdornment>
              ),
              sx: {
                color: "common.white",
                bgcolor: "#1A161F",
                borderRadius: 999,
                px: 2,
              },
            }}
          />

          {/* New Password Field */}
          <Typography
            variant="subtitle2"
            color="rgba(255,255,255,0.6)"
            mb={0.5}
            mt={3}
          >
            New Password
          </Typography>
          <TextField
            fullWidth
            placeholder="Enter your password"
            variant="outlined"
            type={showNewPassword ? "text" : "password"}
            value={newPassword}
            onChange={handleNewPasswordChange}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton onClick={toggleNewPasswordVisibility}>
                    {showNewPassword ? (
                      <VisibilityOffIcon />
                    ) : (
                      <VisibilityIcon />
                    )}
                  </IconButton>
                </InputAdornment>
              ),
              sx: {
                color: "common.white",
                bgcolor: "#1A161F",
                borderRadius: 999,
                px: 2,
              },
            }}
          />

          {/* Register Button */}
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
            Register
          </Button>
        </motion.div>
      </Box>
    </Box>
  );
};

export default CreateNewPassword;
