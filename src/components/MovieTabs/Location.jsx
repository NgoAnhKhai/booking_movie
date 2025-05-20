import React from "react";
import { Box, Typography } from "@mui/material";

const Locations = () => {
  return (
    <Box>
      <Typography variant="h6" gutterBottom>
        Vị trí các rạp chiếu phim
      </Typography>
      {/* Bạn có thể thêm bản đồ, danh sách địa điểm ở đây */}
      <Typography variant="body1">
        Danh sách rạp chiếu phim đang cập nhật...
      </Typography>
    </Box>
  );
};

export default Locations;
