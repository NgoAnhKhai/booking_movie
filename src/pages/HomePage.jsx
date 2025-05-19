import React, { useState } from 'react';
import movieData from '../../public/movies_data.json'; 
import { Box, Button, Typography, Grid } from '@mui/material';
import { ArrowForward, ArrowBack } from '@mui/icons-material';

const HomePage = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const itemsPerPage = 3;

  const prevSlide = () => {
    setCurrentIndex(currentIndex === 0 ? currentIndex : currentIndex - itemsPerPage);
  };

  const nextSlide = () => {
    if (currentIndex + itemsPerPage < movieData.length) {
      setCurrentIndex(currentIndex + itemsPerPage);
    }
  };

  const currentMovies = movieData.slice(currentIndex, currentIndex + itemsPerPage);

  return (
    <Box>
      {/* Tiêu đề Phim Nổi Bật */}
      <Typography variant="h4" fontWeight="bold" mb={3} sx={{ textAlign: 'center', color: '#e50914' }}>
        Phim Nổi Bật
      </Typography>

      {/* Carousel - Ảnh Phim Nổi Bật */}
      <Box display="flex" justifyContent="center" alignItems="center" mb={4} sx={{ marginTop: '80px' }}>
        <Button onClick={prevSlide} sx={{ color: 'white', backgroundColor: '#e50914', padding: '10px 20px' }}>
          <ArrowBack fontSize="large" />
        </Button>
        <Box display="flex" justifyContent="center" alignItems="center" width="100%" overflow="hidden">
          <Box display="flex" width={currentMovies.length * 100 + '%'}>
            {currentMovies.map((movie, index) => (
              <Box
                key={index}
                sx={{
                  width: `${100 / itemsPerPage}%`,
                  padding: '0 10px',
                  display: 'flex',
                  justifyContent: 'center',
                  position: 'relative',
                  overflow: 'hidden',
                  cursor: 'pointer', 
                }}
              >
                <Box
                  sx={{
                    width: '100%', 
                    height: '400px', 
                    overflow: 'hidden',
                    borderRadius: '8px',
                    boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
                    position: 'relative',
                    transition: 'transform 0.3s ease', 
                    '&:hover': {
                      transform: 'scale(1.05)', 
                    },
                  }}
                >
                  {/* Lớp phủ đen khi hover */}
                  <Box
                    sx={{
                      position: 'absolute',
                      top: '0',
                      left: '0',
                      width: '100%',
                      height: '100%',
                      backgroundColor: 'rgba(0, 0, 0, 0.5)', 
                      opacity: 0,
                      transition: 'opacity 0.3s ease', 
                      '&:hover': {
                        opacity: 1, 
                      },
                    }}
                  ></Box>
                  <img
                    src={movie.image}
                    alt={movie.title}
                    style={{
                      width: '100%',
                      height: '100%',
                      objectFit: 'cover', 
                      transition: 'opacity 0.3s ease', 
                    }}
                  />
                  {/* Text khi hover */}
                  <Box 
                    sx={{
                      position: 'absolute',
                      bottom: '10px',
                      left: '10px',
                      color: 'white',
                      fontWeight: 'bold',
                      fontSize: '18px',
                      opacity: 0, 
                      transition: 'opacity 0.3s ease, transform 0.3s ease', 
                      transform: 'translateY(20px)', 
                      '&:hover': {
                        opacity: 1, 
                        transform: 'translateY(0)', 
                      },
                    }}
                  >
                    {movie.title}
                  </Box>
                  {/* Nút Đặt Vé khi hover */}
                  <Box 
                    sx={{
                      position: 'absolute', 
                      bottom: '10px', 
                      right: '10px', 
                      backgroundColor: '#e50914', 
                      color: 'white',
                      padding: '5px 10px',
                      borderRadius: '5px',
                      opacity: 0, 
                      transition: 'opacity 0.3s ease, transform 0.3s ease', 
                      transform: 'translateY(20px)', 
                      '&:hover': {
                        opacity: 1, 
                        transform: 'translateY(0)', 
                      },
                    }}
                  >
                    Đặt Vé
                  </Box>
                </Box>
              </Box>
            ))}
          </Box>
        </Box>
        <Button 
          onClick={nextSlide}
          disabled={currentIndex + itemsPerPage >= movieData.length}
          sx={{ color: 'white', backgroundColor: '#e50914', padding: '10px 20px' }}
        >
          <ArrowForward fontSize="large" />
        </Button>
      </Box>

      {/* Phim Sắp Chiếu */}
      <Box mb={4}>
        <Typography variant="h6" fontWeight="bold" mb={2} sx={{ color: '#e50914' }}>Phim Sắp Chiếu</Typography>
        <Grid container spacing={3}>
          {movieData.slice(0, 3).map((movie, index) => (
            <Grid item xs={12} sm={4} key={index}>
              <Box sx={{ position: 'relative' }}>
                <img src={movie.image} alt={movie.title} style={{ width: '100%', borderRadius: '8px' }} />
                <Box 
                  sx={{
                    position: 'absolute', 
                    bottom: '10px', 
                    left: '10px', 
                    backgroundColor: '#e50914', 
                    color: 'white',
                    padding: '5px 10px',
                    borderRadius: '5px',
                  }}
                >
                  Đặt Vé
                </Box>
              </Box>
            </Grid>
          ))}
        </Grid>
      </Box>
    </Box>
  );
};

export default HomePage;
