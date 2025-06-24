import React, { useEffect, useState } from "react";
import {
  Box,
  Typography,
  Button,
  TextField,
  IconButton,
  InputAdornment,
  Link,
  Alert,
} from "@mui/material";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import VisibilityIcon from "@mui/icons-material/Visibility";
import { motion } from "framer-motion";
import { fadeIn, slideUp } from "../animations/motionVariants";
import MacBookPro from "/images/register/MacBook Pro 18.svg";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

const isValidPassword = (password) => {
  // Tối thiểu 8 ký tự, ít nhất 1 chữ cái, 1 số, 1 ký tự đặc biệt
  const regex =
    /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&^()\-_=+[\]{}|;:'",.<>/?~`]).{8,}$/;
  return regex.test(password);
};

const RegisterPage = () => {
  // --- State cho các field ---
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [passwordValid, setPasswordValid] = useState(true);

  // --- State hiển thị thông báo ---
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const navigate = useNavigate();
  const { signup } = useAuth();

  // Khi user nhập password:
  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
    setPasswordValid(
      isValidPassword(e.target.value) || e.target.value.length === 0
    );
  };
  // --- Banner ---
  const [activeIndex, setActiveIndex] = useState(0);
  const contents = [
    {
      title: "Offers ad-free viewing of high quality",
      subtitle: "Semper in cursus magna...",
    },
    {
      title: "Create your account and start watching instantly",
      subtitle: "Your favorite movies...",
    },
    {
      title: "Secure and fast signup for everyone",
      subtitle: "Your data is safe with us...",
    },
  ];

  useEffect(() => {
    const iv = setInterval(
      () => setActiveIndex((i) => (i + 1) % contents.length),
      4000
    );
    return () => clearInterval(iv);
  }, []);

  // --- Hàm submit form ---
  const handleRegister = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    // Check dữ liệu trống
    if (!fullName || !email || !password || !confirmPassword) {
      setError("Please fill in all fields.");
      return;
    }
    // Check password match
    if (password !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }
    // Validate password format
    if (!isValidPassword(password)) {
      setError(
        "Password must be at least 8 characters, include a letter, a number, and a special character."
      );
      return;
    }
    try {
      // Gọi API register (username là fullName)
      await signup(email, fullName, password);
      setSuccess("Registration successful! Please login.");
      // Chuyển hướng đến trang đăng nhập
      navigate("/auth/login");
      // Reset form
      setFullName("");
      setEmail("");
      setPassword("");
      setConfirmPassword("");
    } catch (err) {
      setError(err.message || "Registration failed!");
    }
  };

  return (
    <Box
      component="main"
      sx={{
        width: "100vw",
        height: "100vh",
        display: "flex",
        position: "relative",
        overflow: "visible",
      }}
    >
      {/* ——— Left Banner (50%) ——— */}
      <Box
        sx={{
          flex: 1,
          position: "relative",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          background: "linear-gradient(180deg, #C945F3 0%, #9B41F7 100%)",
          px: { xs: 4, lg: 10 },
          color: "common.white",
          overflow: "hidden",
        }}
      >
        <motion.img
          src={MacBookPro}
          alt="Preview"
          variants={slideUp}
          initial="hidden"
          animate="visible"
          transition={{ duration: 0.8 }}
          style={{
            position: "absolute",
            marginTop: 300,
            right: -140,
            width: "120%",
            maxWidth: 800,
            pointerEvents: "none",
            willChange: "transform, opacity",
            zIndex: 1,
            transform: "scale(1.5)",
          }}
        />
        <Box sx={{ position: "relative", zIndex: 2, mb: { xs: 8, lg: 50 } }}>
          <motion.div
            variants={fadeIn}
            initial="hidden"
            animate="visible"
            custom={0.2}
            transition={{ duration: 0.8 }}
          >
            <Typography
              variant="h4"
              fontWeight={800}
              gutterBottom
              sx={{ lineHeight: 1.4, maxWidth: 500 }}
            >
              {contents[activeIndex].title}
            </Typography>
            <Typography
              variant="body1"
              sx={{
                opacity: 0.85,
                fontSize: "1rem",
                lineHeight: 1.8,
                maxWidth: 480,
              }}
              mb={4}
            >
              {contents[activeIndex].subtitle}
            </Typography>
          </motion.div>
          <motion.div
            variants={fadeIn}
            initial="hidden"
            animate="visible"
            custom={0.4}
            transition={{ duration: 0.8 }}
          >
            <Box sx={{ display: "flex", gap: 1 }}>
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
          </motion.div>
        </Box>
      </Box>
      {/* ——— Right Form (50%) ——— */}
      <Box
        sx={{
          flex: 1,
          position: "relative",
          zIndex: 3,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          bgcolor: "#0B0B0F",
          px: { xs: 4, lg: 10 },
        }}
      >
        <motion.div
          variants={fadeIn}
          initial="hidden"
          animate="visible"
          custom={0.5}
          transition={{ duration: 0.8 }}
          style={{
            willChange: "transform, opacity",
            width: "100%",
            maxWidth: 420,
          }}
        >
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
            Register
          </Typography>
          {/* Hiển thị thông báo lỗi hoặc thành công */}
          {error && (
            <Alert severity="error" sx={{ mb: 2 }}>
              {error}
            </Alert>
          )}
          {success && (
            <Alert severity="success" sx={{ mb: 2 }}>
              {success}
            </Alert>
          )}

          <form onSubmit={handleRegister} autoComplete="off">
            {/* Full Name */}
            <Typography
              variant="subtitle2"
              color="rgba(255,255,255,0.6)"
              mb={0.5}
            >
              Full Name
            </Typography>
            <TextField
              fullWidth
              placeholder="Enter your name"
              variant="outlined"
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
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
            {/* Email */}
            <Typography
              variant="subtitle2"
              color="rgba(255,255,255,0.6)"
              mt={2}
              mb={0.5}
            >
              Email Address
            </Typography>
            <TextField
              fullWidth
              placeholder="Enter your email address"
              variant="outlined"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              InputProps={{
                sx: {
                  color: "common.white",
                  bgcolor: "#1A161F",
                  borderRadius: 999,
                  px: 2,
                },
              }}
              InputLabelProps={{ shrink: false }}
              type="email"
            />
            {/* Password */}
            <Typography
              variant="subtitle2"
              color="rgba(255,255,255,0.6)"
              mt={2}
              mb={0.5}
            >
              Password
            </Typography>
            <TextField
              fullWidth
              placeholder="Enter your password"
              variant="outlined"
              value={password}
              onChange={handlePasswordChange}
              type={showPassword ? "text" : "password"}
              InputProps={{
                sx: {
                  color: "common.white",
                  bgcolor: "#1A161F",
                  borderRadius: 999,
                  px: 2,
                },
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      onClick={() => setShowPassword((p) => !p)}
                      edge="end"
                    >
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
              InputLabelProps={{ shrink: false }}
            />
            {/* Gợi ý password */}
            {!passwordValid && password.length > 0 && (
              <Typography
                variant="caption"
                color="error"
                sx={{ display: "block", mt: 0.5, mb: 1.5 }}
              >
                Password must be at least 8 characters, include a letter, a
                number, and a special character (e.g. @, #, $).
              </Typography>
            )}
            {/* Confirm Password */}
            <Typography
              variant="subtitle2"
              color="rgba(255,255,255,0.6)"
              mt={2}
              mb={0.5}
            >
              Confirm Password
            </Typography>
            <TextField
              fullWidth
              placeholder="Enter your password"
              variant="outlined"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              type={showConfirmPassword ? "text" : "password"}
              InputProps={{
                sx: {
                  color: "common.white",
                  bgcolor: "#1A161F",
                  borderRadius: 999,
                  px: 2,
                },
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      onClick={() => setShowConfirmPassword((p) => !p)}
                      edge="end"
                    >
                      {showConfirmPassword ? (
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
              InputLabelProps={{ shrink: false }}
            />
            <Button
              fullWidth
              type="submit"
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
          </form>

          <Typography
            variant="body2"
            color="common.white"
            textAlign="center"
            mt={3}
          >
            Already have an account?{" "}
            <Link href="/auth/login" underline="none" sx={{ color: "#9B76FF" }}>
              Login
            </Link>
          </Typography>
        </motion.div>
      </Box>
    </Box>
  );
};

export default RegisterPage;
