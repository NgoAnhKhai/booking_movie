import React, { useState } from "react";
import {
  Modal,
  Box,
  Typography,
  Avatar,
  Button,
  Stack,
  Divider,
  CircularProgress,
} from "@mui/material";
import { useParams } from "react-router-dom";
import movieData from "../../public/movies_data.json";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";

const DetailMoviePage = () => {
  const [openTrailer, setOpenTrailer] = useState(false);
  const [actorPage, setActorPage] = useState(0);
  const ITEMS_PER_PAGE = 3;
  const { id } = useParams();
  const movie = movieData.find((m) => m.id === parseInt(id));

  if (!movie) {
    return <Typography variant="h6">Không tìm thấy phim</Typography>;
  }
  const totalPages = Math.ceil(movie.actors_detail.length / ITEMS_PER_PAGE);

  const currentActors = movie.actors_detail.slice(
    actorPage * ITEMS_PER_PAGE,
    (actorPage + 1) * ITEMS_PER_PAGE
  );

  return (
    <Box
      sx={{
        position: "relative",
        overflow: "hidden",
        minHeight: "100vh",
        width: "100%",
        color: "white",
        marginTop: "30px",
      }}
    >
      {/* Background Blur */}
      <Box
        sx={{
          position: "fixed",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          backgroundImage: `url(${movie.image})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
          filter: "blur(10px) brightness(0.4)",
          zIndex: -1,
        }}
      />

      <Box sx={{ maxWidth: "1100px", margin: "auto", p: 4 }}>
        <Box sx={{ display: "flex", gap: 4, flexWrap: "wrap" }}>
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
            {/* Score & Age Limit */}
            <Box display="flex" alignItems="center" gap={2} mb={2}>
              {/* Score Circle */}
              <Box display="flex" alignItems="center" gap={1}>
                <Box
                  sx={{
                    position: "relative",
                    width: 48,
                    height: 48,
                  }}
                >
                  <CircularProgress
                    variant="determinate"
                    value={movie.rate || 0}
                    size={48}
                    thickness={5}
                    sx={{ color: "#21d07a" }}
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
                      fontSize: "14px",
                      color: "white",
                    }}
                  >
                    {movie.rate || 0}%
                  </Box>
                </Box>
                <Box>
                  <Typography fontSize="12px" color="white">
                    User
                  </Typography>
                  <Typography fontSize="12px" color="white">
                    Score
                  </Typography>
                </Box>
              </Box>

              {/* Age Limit Tag (e.g., T16) */}
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
            <Typography variant="body1">
              <strong>Thời lượng:</strong> {movie.duration}
            </Typography>
            <Typography variant="body1">
              <strong>Đạo diễn:</strong> {movie.director}
            </Typography>
            <Typography variant="body1">
              <strong>Thể loại:</strong> {movie.genre}
            </Typography>
            <Typography variant="body1">
              <strong>Ngày công chiếu:</strong> {movie.release_date}
            </Typography>

            {movie.description && (
              <Typography mt={2}>
                <strong>Mô tả:</strong> {movie.description}
              </Typography>
            )}

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
              {/* Nút play trailer */}
              <Button
                onClick={() => setOpenTrailer(true)}
                variant="outlined"
                startIcon={<PlayArrowIcon />}
                sx={{
                  color: "#fff",
                  borderColor: "#fff",
                  "&:hover": {
                    backgroundColor: "rgba(255,255,255,0.1)",
                    borderColor: "#fff",
                  },
                }}
              >
                Trailer
              </Button>
            </Stack>
          </Box>
        </Box>

        <Divider sx={{ my: 4, borderColor: "rgba(255,255,255,0.2)" }} />

        <Box>
          <Typography variant="h5" fontWeight="bold" mb={2}>
            Diễn viên
          </Typography>
          <Box display="flex" gap={3} mb={2}>
            {currentActors.map((actor, idx) => (
              <Box
                key={idx}
                sx={{
                  display: "flex",
                  alignItems: "center",
                  gap: 2,
                  backgroundColor: "rgba(255,255,255,0.05)",
                  p: 2,
                  borderRadius: 2,
                  flex: 1,
                }}
              >
                <Avatar
                  src={actor.image}
                  alt={actor.name}
                  sx={{ width: 56, height: 56 }}
                />
                <Box>
                  <Typography fontWeight="bold">{actor.name}</Typography>
                  <Typography variant="body2" color="gray">
                    Năm hoạt động: {actor.active_years}
                  </Typography>
                </Box>
              </Box>
            ))}
          </Box>

          <Stack direction="row" justifyContent="center" spacing={2}>
            <Button
              sx={{
                minWidth: "auto",
                color: "white",
                backgroundColor: "rgba(0,0,0,0.5)",
                "&:hover": { backgroundColor: "rgba(0,0,0,0.7)" },
                borderRadius: 2,
              }}
              variant="outlined"
              onClick={() => setActorPage((p) => Math.max(p - 1, 0))}
              disabled={actorPage === 0}
            >
              <ArrowBackIosIcon />
            </Button>
            <Button
              sx={{
                minWidth: "auto",
                color: "white",
                backgroundColor: "rgba(0,0,0,0.5)",
                "&:hover": { backgroundColor: "rgba(0,0,0,0.7)" },
                borderRadius: 2,
              }}
              variant="outlined"
              onClick={() =>
                setActorPage((p) => Math.min(p + 1, totalPages - 1))
              }
              disabled={actorPage === totalPages - 1}
            >
              <ArrowForwardIosIcon />
            </Button>
          </Stack>
        </Box>
        <Modal open={openTrailer} onClose={() => setOpenTrailer(false)}>
          <Box
            sx={{
              position: "fixed",
              top: "50%",
              left: "50%",
              transform: "translate(-50%, -50%)",
              width: "80vw",
              maxWidth: 800,
              bgcolor: "background.paper",
              boxShadow: 24,
              p: 0,
              borderRadius: 2,
              overflow: "hidden",
            }}
          >
            <Box
              component="iframe"
              width="100%"
              height="450px"
              src={movie.trailer.replace("watch?v=", "embed/")}
              title="Movie Trailer"
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            />
          </Box>
        </Modal>
      </Box>
    </Box>
  );
};

export default DetailMoviePage;
