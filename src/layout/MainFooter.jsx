import React from 'react';
import { Box, Typography, Button, Grid } from '@mui/material';
import { Facebook, Instagram, Twitter } from '@mui/icons-material';  

const Footer = () => {
  return (
    <Box 
      sx={{
        backgroundColor: '#333', 
        color: 'white', 
        padding: '30px 20px', 
        marginTop: '50px',
        display: 'flex', 
        flexDirection: 'column', 
        justifyContent: 'center', 
        alignItems: 'center',
      }}
    >
      {/* Logo */}
      <Box mb={3}>
        <img 
          src="/public/images/PandaLogo.png" 
          alt="Logo" 
          style={{ width: '150px' }} 
        />
      </Box>

      {/* Links */}
      <Grid container spacing={4} justifyContent="center" mb={3}>
        <Grid item>
          <Button color="inherit" href="/#">Giới thiệu</Button>
        </Grid>
        <Grid item>
          <Button color="inherit" href="/#">Trợ giúp</Button>
        </Grid>
        <Grid item>
          <Button color="inherit" href="/#">Phim</Button>
        </Grid>
        <Grid item>
          <Button color="inherit" href="/#">Liên hệ</Button>
        </Grid>
      </Grid>

      {/* Social Media Icons */}
      <Box mb={3}>
        <Typography variant="body1" color="white" mb={2}>
          Theo dõi chúng tôi
        </Typography>
        <Box display="flex" gap="15px">
          <Facebook style={{ fontSize: '30px', cursor: 'pointer' }} />
          <Instagram style={{ fontSize: '30px', cursor: 'pointer' }} />
          <Twitter style={{ fontSize: '30px', cursor: 'pointer' }} />
        </Box>
      </Box>

      {/* Copyright */}
      <Typography variant="body2" color="white">
        © 2025 Pandarama Cinema. Tất cả các quyền được bảo vệ.
      </Typography>
    </Box>
  );
};

export default Footer;
