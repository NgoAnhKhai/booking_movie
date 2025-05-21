import { Box, Typography, CircularProgress } from "@mui/material";
import { useParams } from "react-router-dom";
import { useRegionCities } from "../../../hooks/useRegionCities";
import { useMovie } from "../../../hooks/useMovies";
import BreadcrumbSteps from "../../../components/BreadcrumbSteps";
import CitySelector from "../../../components/DropDown/CitySelector";
import CinemaSelector from "../../../components/DropDown/CinemaSelector";
import { useCinemas } from "../../../hooks/useCinema";
import ShowtimesList from "../../../components/ShowTimeList";

const DetailBookingSouth = () => {
  const { id } = useParams();
  const movie = useMovie(id);
  const { cities, selectedCity, setSelectedCity } = useRegionCities();
  const { cinemas, selectedCinema, setSelectedCinema } = useCinemas(
    cities,
    selectedCity
  );

  const handleCinemaChange = (e) => {
    setSelectedCinema(e.target.value);
  };

  if (!movie) {
    return <Typography variant="h6">Phim không tìm thấy</Typography>;
  }
  const currentStep = "booking";

  // Chuyển rate thang 10 thành % thang 100
  const ratePercent = (movie.rate / 10) * 100;

  // Chọn màu theo rate
  let rateColor = "#d32f2f"; // đỏ mặc định
  if (ratePercent >= 70) rateColor = "#4caf50";
  else if (ratePercent >= 40) rateColor = "#fbc02d";

  return (
    <Box
      sx={{
        position: "relative",
        minHeight: "100vh",
        padding: 7,
        maxWidth: "100%",
        margin: "0 auto",
      }}
    >
      <Box sx={{ mb: 1, marginLeft: 1 }}>
        <BreadcrumbSteps currentStep={currentStep} />
      </Box>

      {/* Background + Movie Info */}
      <Box
        sx={{
          position: "relative",
          borderRadius: 3,
          overflow: "hidden",
          color: "white",
          mb: 6,
          boxShadow: "0 8px 24px rgba(0,0,0,0.4)",
          height: "100%",
        }}
      >
        <Box
          component="img"
          src={movie.image}
          alt={movie.title}
          sx={{
            width: "100%",
            height: "100%",
            objectFit: "cover",
            filter: "blur(8px) brightness(0.5)",
            position: "absolute",
            top: 0,
            left: 0,
            zIndex: 0,
          }}
        />
        <Box
          sx={{
            position: "relative",
            display: "flex",
            gap: 5,
            alignItems: "center",
            padding: 4,
            zIndex: 1,
            height: "100%",
            boxSizing: "border-box",
          }}
        >
          <Box
            component="img"
            src={movie.image}
            alt={movie.title}
            sx={{
              width: 320,
              borderRadius: 6,
              boxShadow: "0 8px 24px rgba(0,0,0,0.7)",
              zIndex: 2,
            }}
          />

          <Box sx={{ flex: 1, color: "white", zIndex: 2 }}>
            <Typography variant="h3" fontWeight="bold" mb={3}>
              {movie.title}
            </Typography>

            <Box sx={{ display: "flex", alignItems: "center", gap: 3, mb: 4 }}>
              <Box sx={{ position: "relative", width: 60, height: 60 }}>
                <CircularProgress
                  variant="determinate"
                  value={ratePercent}
                  size={60}
                  thickness={5}
                  sx={{ color: rateColor }}
                />
                <Box
                  sx={{
                    position: "absolute",
                    top: 0,
                    left: 0,
                    width: "100%",
                    height: "100%",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontWeight: "bold",
                    fontSize: 16,
                    color: rateColor,
                  }}
                >
                  {movie.rate?.toFixed(1) || "0.0"}
                </Box>
              </Box>
              <Typography variant="subtitle1" fontWeight={600}>
                User Score
              </Typography>
              <Box
                sx={{
                  backgroundColor:
                    movie.rate_age >= 18
                      ? "#d50000"
                      : movie.rate_age >= 13
                      ? "#fbc02d"
                      : "#43a047",
                  color: "white",
                  fontWeight: "bold",
                  px: 1.5,
                  py: 0.5,
                  borderRadius: "6px",
                  fontSize: "14px",
                }}
              >
                T{movie.rate_age || "?"}
              </Box>
            </Box>

            <Box
              sx={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fit,minmax(150px,1fr))",
                gap: 2,
                color: "rgba(255,255,255,0.85)",
                fontSize: 16,
              }}
            >
              <Box>
                <Typography fontWeight={600}>Duration:</Typography>
                <Typography>{movie.duration}</Typography>
              </Box>
              <Box>
                <Typography fontWeight={600}>Director:</Typography>
                <Typography>{movie.director}</Typography>
              </Box>
              <Box>
                <Typography fontWeight={600}>Genre:</Typography>
                <Typography>{movie.genre}</Typography>
              </Box>
              <Box>
                <Typography fontWeight={600}>Release Date:</Typography>
                <Typography>{movie.release_date}</Typography>
              </Box>
            </Box>

            <Typography
              variant="body1"
              sx={{
                mt: 4,
                lineHeight: 1.6,
                color: "rgba(255,255,255,0.75)",
                fontSize: 15,
              }}
            >
              {movie.description}
            </Typography>
          </Box>
        </Box>
      </Box>

      {/* Dropdown chọn thành phố */}
      <Box sx={{ mt: 5, display: "flex", gap: 2 }}>
        <CitySelector
          cities={cities}
          selectedCity={selectedCity}
          onChange={(e) => setSelectedCity(e.target.value)}
        />
        <CinemaSelector
          cinemas={cinemas}
          selectedCinema={selectedCinema}
          onChange={handleCinemaChange}
        />
      </Box>
      {/* Showtimes */}
      <ShowtimesList
        cinemas={cinemas}
        selectedCinema={selectedCinema}
        movieId={id}
      />
    </Box>
  );
};

export default DetailBookingSouth;
