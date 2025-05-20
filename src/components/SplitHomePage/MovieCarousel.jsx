import React, { useState, useEffect } from "react";
import { Box, Button } from "@mui/material";
import { ArrowForward, ArrowBack } from "@mui/icons-material";
import { mediaQueries } from "../../breakpoint";
import movieData from "../../../public/movies_data.json";
import { useNavigate } from "react-router-dom";
import {determineRegion} from "../utils"
const MovieCarousel = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [itemsPerPage, setItemsPerPage] = useState(3);
  const [selectedMovie, setSelectedMovie] = useState(null);
  const navigate = useNavigate();

  const getItemsPerPage = (width) => {
    if (width >= 992) return 3;
    if (width >= 768) return 2;
    return 1;
  };

  useEffect(() => {
    const handleResize = () => {
      const newItemsPerPage = getItemsPerPage(window.innerWidth);
      setItemsPerPage(newItemsPerPage);

      setCurrentIndex((current) =>
        current > movieData.length - newItemsPerPage
          ? Math.max(0, movieData.length - newItemsPerPage)
          : current
      );
    };

    handleResize();

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const prevSlide = () => {
    setCurrentIndex(currentIndex === 0 ? 0 : currentIndex - itemsPerPage);
  };

  const nextSlide = () => {
    if (currentIndex + itemsPerPage < movieData.length) {
      setCurrentIndex(currentIndex + itemsPerPage);
    }
  };


  const handleDetailMovie = (movie) => {
    navigate(`/movies/${movie.id}`);
    console.log("Movie details: ", movie);
  };

  // Hàm gọi lấy vị trí và chuyển route
  const handleBookTicket = (movie) => {
    setSelectedMovie(movie);
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const lat = position.coords.latitude;
          const region = determineRegion(lat);
          navigate(`/booking/${region}/${movie.id}`);
        },
        (error) => {
          console.error("Lỗi lấy vị trí: ", error);
          navigate(`/booking/south/${movie.id}`);
        }
      );
    } else {
      navigate(`/booking/south/${movie.id}`);
    }
  };

  const currentMovies = movieData.slice(
    currentIndex,
    currentIndex + itemsPerPage
  );

  return (
    <Box
      display="flex"
      justifyContent="center"
      alignItems="center"
      mb={4}
      sx={{ marginTop: "80px" }}
    >
      <Button
        onClick={prevSlide}
        sx={{
          color: "white",
          backgroundColor: "#e50914",
          padding: "10px 20px",
        }}
        disabled={currentIndex === 0}
      >
        <ArrowBack fontSize="large" />
      </Button>
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        width="100%"
        overflow="hidden"
      >
        <Box
          display="flex"
          width={`${currentMovies.length * 100}%`}
          sx={{ transition: "width 0.5s ease" }}
        >
          {currentMovies.map((movie, index) => (
            <Box
              key={index}
              sx={{
                width: `${100 / itemsPerPage}%`,
                padding: "0 10px",
                display: "flex",
                justifyContent: "center",
                position: "relative",
                overflow: "hidden",
                cursor: "pointer",
                height: "100%",
                [mediaQueries.md]: { height: "350px" },
                [mediaQueries.sm]: { height: "300px" },
                [mediaQueries.xs]: { height: "600px" },

                "&:hover .hoverChild": {
                  opacity: 1,
                  transform: "translateY(0)",
                },
                "&:hover .overlay": {
                  opacity: 1,
                },
              }}
            >
              <Box
                sx={{
                  width: "100%",
                  height: "100%",
                  overflow: "hidden",
                  borderRadius: "8px",
                  boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
                  position: "relative",
                  transition: "transform 0.3s ease",
                  "&:hover": {
                    transform: "scale(1.05)",
                  },
                }}
              >
                <Box
                  className="overlay"
                  onClick={() => handleDetailMovie(movie)}
                  sx={{
                    position: "absolute",
                    top: 0,
                    left: 0,
                    width: "100%",
                    height: "100%",
                    backgroundColor: "rgba(0, 0, 0, 0.5)",
                    opacity: 0,
                    transition: "opacity 0.3s ease",
                    zIndex: 5,
                  }}
                />
                <img
                  src={movie.image}
                  alt={movie.title}
                  style={{
                    width: "100%",
                    height: "100%",
                    objectFit: "cover",
                    transition: "opacity 0.3s ease",
                    position: "relative",
                    zIndex: 1,
                  }}
                />
                <Box
                  className="hoverChild"
                  sx={{
                    position: "absolute",
                    bottom: "10px",
                    left: "10px",
                    color: "white",
                    fontWeight: "bold",
                    fontSize: "18px",
                    opacity: 0,
                    transition: "opacity 0.3s ease, transform 0.3s ease",
                    transform: "translateY(20px)",
                    zIndex: 6,
                  }}
                >
                  {movie.title}
                </Box>
                <Box
                  className="hoverChild"
                  sx={{
                    position: "absolute",
                    bottom: "10px",
                    right: "10px",
                    backgroundColor: "#e50914",
                    color: "white",
                    padding: "5px 10px",
                    borderRadius: "5px",
                    opacity: 0,
                    transition: "opacity 0.3s ease, transform 0.3s ease",
                    transform: "translateY(20px)",
                    zIndex: 6,
                  }}
                  onClick={(e) => {
                    e.stopPropagation();
                    handleBookTicket(movie);
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
        sx={{
          color: "white",
          backgroundColor: "#e50914",
          padding: "10px 20px",
        }}
      >
        <ArrowForward fontSize="large" />
      </Button>
    </Box>
  );
};

export default MovieCarousel;
