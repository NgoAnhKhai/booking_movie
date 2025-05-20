import React, { useState, useEffect } from "react";
import { Box, Typography, Button, Stack, FormControl, InputLabel, Select, MenuItem } from "@mui/material";
import { useParams } from "react-router-dom";
import movieData from "../../../../public/movies_data.json";  // Dữ liệu movieData

const DetailBookingSouth = () => {
  const { id } = useParams();  // Lấy id từ params
  const [selectedCinema, setSelectedCinema] = useState("");
  const [movie, setMovie] = useState(null);  // Dữ liệu bộ phim sẽ được set vào đây
  
  useEffect(() => {
    // Tìm phim có id tương ứng từ movieData
    const selectedMovie = movieData.find(movie => movie.id === parseInt(id));
    console.log(selectedMovie);
    
    setMovie(selectedMovie);  // Cập nhật dữ liệu phim vào state
  }, [id]);  // Mỗi khi id thay đổi, useEffect sẽ chạy lại

  // Handle change trong bộ lọc cinema
  const handleCinemaChange = (event) => {
    setSelectedCinema(event.target.value);
  };

  if (!movie) {
    return <Typography variant="h6">Phim không tìm thấy</Typography>; // Hiển thị nếu phim không tồn tại
  }

  return (
    <Box sx={{ padding: 3 }}>
      {/* Bộ lọc Cinema */}
      <Box sx={{ marginBottom: 3 }}>
        <FormControl fullWidth>
          <InputLabel>Chọn Rạp</InputLabel>
          <Select
            value={selectedCinema}
            onChange={handleCinemaChange}
            label="Chọn Rạp"
          >
            <MenuItem value="">
              <em>Tất cả</em>
            </MenuItem>
            <MenuItem value="Cinema A">Cinema A</MenuItem>
            <MenuItem value="Cinema B">Cinema B</MenuItem>
            <MenuItem value="Cinema C">Cinema C</MenuItem>
          </Select>
        </FormControl>
      </Box>

      {/* Hiển thị thông tin bộ phim */}
      <Box sx={{ display: "flex", gap: 4 }}>
        {/* Poster */}
        <Box sx={{ flex: 1, minWidth: 300 }}>
          <Box
            component="img"
            src={movie.image}
            alt={movie.title}
            sx={{ width: "100%", borderRadius: 2, boxShadow: 4 }}
          />
        </Box>

        {/* Movie Info */}
        <Box sx={{ flex: 2, minWidth: 300 }}>
          <Typography variant="h3" fontWeight="bold" mb={1}>
            {movie.title}
          </Typography>
          <Box display="flex" alignItems="center" gap={2} mb={2}>
            <Typography variant="h6">Rating: {movie.rate}/10</Typography>
            <Typography variant="body1">{movie.duration}</Typography>
            <Typography variant="body1">Đạo diễn: {movie.director}</Typography>
            <Typography variant="body1">Thể loại: {movie.genre}</Typography>
            <Typography variant="body1">Ngày công chiếu: {movie.release_date}</Typography>
          </Box>
          <Typography variant="body2">{movie.description}</Typography>
        </Box>
      </Box>

      {/* Danh sách suất chiếu */}
      <Box sx={{ marginTop: 4 }}>
        <Typography variant="h5" fontWeight="bold" mb={2}>
          Suất Chiếu
        </Typography>
        {movie.showtimes && movie.showtimes.length > 0 ? (
          movie.showtimes
            .filter(showtime => !selectedCinema || showtime.cinema === selectedCinema) // Filter theo cinema chọn
            .map((showtime, idx) => (
              <Box key={idx} sx={{ marginBottom: 2 }}>
                <Typography variant="h6">{showtime.cinema}</Typography>
                <Typography variant="body1">{showtime.time}</Typography>
              </Box>
            ))
        ) : (
          <Typography variant="body1">Không có suất chiếu.</Typography>
        )}
      </Box>

      {/* Nút Đặt Vé */}
      <Stack direction="row" spacing={2} mt={3}>
        <Button
          variant="contained"
          sx={{
            backgroundColor: "#FFD700",
            color: "#d50032",
            fontWeight: 700,
            textTransform: "none",
            px: 3,
            py: 1,
            borderRadius: 2,
            position: "relative",
            overflow: "hidden",
            boxShadow: "0 6px 12px rgba(255, 215, 0, 0.7)",
            transition: "transform 0.3s ease, background-color 0.3s ease",
            "&:hover": {
              backgroundColor: "#ffec3d",
              transform: "scale(1.05)",
              boxShadow: "0 8px 16px rgba(255, 236, 61, 0.9)",
            },
          }}
        >
          Đặt Vé
        </Button>
      </Stack>
    </Box>
  );
};

export default DetailBookingSouth;
