import { Box, Button, TextField, Typography } from "@mui/material";
import pandaLogo from "../../public/images/PandaLogo.png";

const RegisterPage = ({ onSwitch, onClose }) => {
  return (
    <Box sx={{ position: "relative", textAlign: "center" }}>
      {/* Logo Panda ở trên đầu */}
      <Box
        component="img"
        src={pandaLogo}
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
        Đăng ký
      </Typography>
      <TextField label="Email" fullWidth margin="normal" />
      <TextField label="Mật khẩu" type="password" fullWidth margin="normal" />
      <TextField
        label="Xác nhận mật khẩu"
        type="password"
        fullWidth
        margin="normal"
      />

      <Button
        variant="contained"
        fullWidth
        sx={{ mt: 3, bgcolor: "#d50032", "&:hover": { bgcolor: "#a30025" } }}
      >
        Đăng ký
      </Button>

      <Typography sx={{ mt: 2 }}>
        Đã có tài khoản?{" "}
        <Box
          component="span"
          sx={{ color: "#d50032", cursor: "pointer", fontWeight: "bold" }}
          onClick={onSwitch}
        >
          Đăng nhập
        </Box>
      </Typography>
      <Button
        onClick={onClose}
        sx={{
          position: "absolute",
          top: 8,
          right: 8,
          minWidth: 0,
          p: 0,
          fontSize: "20px",
          lineHeight: 1,
          color: "#999",
          "&:hover": { color: "#d50032", backgroundColor: "transparent" },
        }}
      >
        ✕
      </Button>
    </Box>
  );
};

export default RegisterPage;
