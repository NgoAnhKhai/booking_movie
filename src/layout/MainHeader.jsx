import logo from '../../public/images/PandaLogo.png';
import { Box, Button, Typography } from '@mui/material';
import React from 'react';

const MainHeader = () => {
  return (
    <Box
      display="flex"
      justifyContent="space-between"
      alignItems="center"
      padding="10px 20px"
      bgcolor="#d50032" // Màu đỏ giống CGV
    >
      {/* Logo */}
      <Box
        component="img"
        src={logo}
        alt="Logo"
        maxHeight="60px" // Chỉ giới hạn chiều cao logo mà không thay đổi tổng thể
      />

      {/* Menu */}
      <Box display="flex" gap="20px">
        <Typography variant="body1" color="white">
          Rạp chiếu
        </Typography>
        <Typography variant="body1" color="white">
          Phim
        </Typography>
        <Typography variant="body1" color="white">
          Giới thiệu
        </Typography>
        <Typography variant="body1" color="white">
          Trợ giúp
        </Typography>
      </Box>

      {/* SignIn/SignUp */}
      <Box display="flex" gap="10px">
        <Button variant="text" color="white">
          Đăng nhập
        </Button>
        <Button variant="contained" color="secondary">
          Đăng ký
        </Button>
      </Box>
    </Box>
  );
};

export default MainHeader;
