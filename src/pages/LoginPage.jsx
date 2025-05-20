import { Box, Button, TextField, Typography } from "@mui/material";
import PandaLogo from "../../public/images/PandaLogo.png";
const LoginPage = ({ onSwitch, onClose }) => {
  return (
    <Box sx={{ position: "relative", textAlign: "center" }}>
      <Box
        component="img"
        src={PandaLogo}
        alt="Panda Logo"
        sx={{
          display: "block",
          mx: "auto",
          width: "120px",
          height: 120,
          userSelect: "none",
        }}
      />
      <Typography variant="h5" fontWeight="bold" mb={3} color="#d50032">
        Đăng nhập
      </Typography>
      <TextField label="Email" fullWidth margin="normal" />
      <TextField label="Mật khẩu" type="password" fullWidth margin="normal" />
      <Button
        variant="contained"
        fullWidth
        sx={{ mt: 3, bgcolor: "#d50032", "&:hover": { bgcolor: "#a30025" } }}
      >
        Đăng nhập
      </Button>
      <Typography sx={{ mt: 2 }}>
        Chưa có tài khoản?{" "}
        <Box
          component="span"
          sx={{ color: "#d50032", cursor: "pointer", fontWeight: "bold" }}
          onClick={onSwitch}
        >
          Đăng ký ngay
        </Box>
      </Typography>
      <Button
        onClick={onClose}
        sx={{ position: "absolute", top: 8, right: 8, minWidth: 0, p: 0 }}
      >
        ✕
      </Button>
    </Box>
  );
};

export default LoginPage;
